#!/usr/bin/env bash
# Menschen APK emulator smoke test, run inside the Android emulator-runner
# step of .github/workflows/android-emulator-test.yml (working directory is
# the repo checkout; app.apk was built by the previous step).
# Everything is recorded under evidence/; misses are evidence too.
set -x
mkdir -p evidence
adb wait-for-device
adb shell input keyevent 82

# Tap the first node whose text or content-desc matches $1.
tap_node() {
  adb shell uiautomator dump /sdcard/uiw.xml >/dev/null 2>&1
  adb shell cat /sdcard/uiw.xml > evidence/ui-work.xml
  # The software-rendered emulator can show "Menschen isn't responding" while the
  # WebView loads; record it, press Wait and re-dump (an ANR is a finding too).
  if grep -q "isn't responding" evidence/ui-work.xml; then
    echo "ANR dialog seen; pressing Wait" | tee -a evidence/anr.txt
    adb exec-out screencap -p > evidence/anr-$(date +%s).png
    adb shell input tap 320 1360
    sleep 8
    adb shell uiautomator dump /sdcard/uiw.xml >/dev/null 2>&1
    adb shell cat /sdcard/uiw.xml > evidence/ui-work.xml
  fi
  B=$(grep -oE '(text|content-desc)="[^"]*'"$1"'[^"]*"[^>]*bounds="\[[0-9]+,[0-9]+\]\[[0-9]+,[0-9]+\]"' evidence/ui-work.xml | grep -oE '\[[0-9]+,[0-9]+\]\[[0-9]+,[0-9]+\]' | head -1)
  if [ -z "$B" ]; then return 1; fi
  X1=$(echo "$B" | sed -E 's/\[([0-9]+),([0-9]+)\]\[([0-9]+),([0-9]+)\]/\1/'); Y1=$(echo "$B" | sed -E 's/\[([0-9]+),([0-9]+)\]\[([0-9]+),([0-9]+)\]/\2/')
  X2=$(echo "$B" | sed -E 's/\[([0-9]+),([0-9]+)\]\[([0-9]+),([0-9]+)\]/\3/'); Y2=$(echo "$B" | sed -E 's/\[([0-9]+),([0-9]+)\]\[([0-9]+),([0-9]+)\]/\4/')
  adb shell input tap $(( (X1+X2)/2 )) $(( (Y1+Y2)/2 ))
  return 0
}
# Playback time text ("m:ss.s / m:ss.s") from a UI dump.
read_time() {
  grep -oE '[0-9]+:[0-9]{2}(\.[0-9])? / [0-9]+:[0-9]{2}(\.[0-9])?' "$1" | head -1
}
to_secs() {
  echo "$1" | awk -F'[:/ ]' '{m=$1; s=$2; print m*60+s}'
}

# Install the APK (over 1 GB, takes a few minutes)
adb install --no-incremental app.apk | tee evidence/install.txt
adb shell dumpsys package com.alhinawi.menschen | grep -iE "incremental|isLoading" | tee evidence/incremental-state.txt || true
sleep 10
adb shell dumpsys package com.alhinawi.menschen | grep -E 'versionName|versionCode|firstInstallTime' | tee evidence/package.txt

# Launch, let the WebView load the bundled site
adb shell monkey -p com.alhinawi.menschen -c android.intent.category.LAUNCHER 1
sleep 25
adb root >/dev/null 2>&1 || true
adb shell uiautomator dump /sdcard/uih.xml >/dev/null 2>&1
adb shell cat /sdcard/uih.xml > evidence/ui-first.xml
if grep -q 'Not found' evidence/ui-first.xml || ! grep -q 'Open book' evidence/ui-first.xml; then
  echo "FIRST LOAD NOT CLEAN (Not found or no cover); relaunching once" | tee -a evidence/first-load.txt
  adb exec-out screencap -p > evidence/01a-first-load-bad.png
  adb shell am force-stop com.alhinawi.menschen
  adb shell monkey -p com.alhinawi.menschen -c android.intent.category.LAUNCHER 1
  sleep 20
fi
adb exec-out screencap -p > evidence/01-home.png
adb shell uiautomator dump /sdcard/ui.xml
adb shell cat /sdcard/ui.xml > evidence/ui-home.xml

# Tap "Open book" via its accessibility bounds (best effort)
if tap_node 'Open book'; then
  sleep 8
  adb exec-out screencap -p > evidence/02-open-book.png
  adb shell uiautomator dump /sdcard/ui2.xml
  adb shell cat /sdcard/ui2.xml > evidence/ui-open-book.xml
else
  echo "Open book node not found in accessibility tree" | tee evidence/open-book-missing.txt
fi

# Best-effort audio playback/seek proof (audio is bundled in the APK, so this is local playback).
{
  echo "== offline audio test =="
  FOUND=""
  for n in 1 2 3 4 5 6 7 8 9 10 11 12; do
    adb shell uiautomator dump /sdcard/uip.xml >/dev/null 2>&1
    adb shell cat /sdcard/uip.xml > evidence/ui-pages.xml
    if grep -qE '(text|content-desc)="Play (CD|Aufgabe)' evidence/ui-pages.xml; then FOUND=1; echo "Play node found after $n page turns"; break; fi
    tap_node 'Next page' || echo "no Next page node"
    sleep 3
  done
  PAGE=$FOUND
  # The player panel's own nodes have empty bounds, so tap the printed listen
  # marker on the page instead (page 9 "Hallo! Ich bin Nicole": marker 102 at
  # about x=90,y=904 of a 719px-wide screenshot, 1.5x scale on the 1080px screen).
  seekval() { grep -oE 'text="[0-9.]+, Seek [^"]*"' "$1" | head -1 | sed -E 's/text="([0-9.]+),.*/\1/'; }
  playlabel() { grep -oE 'text="(Play|Pause) [^"]*"' "$1" | head -1; }
  if [ -z "$PAGE" ]; then
    echo "NOT EXERCISED: no lesson page with an audio player found"
  else
    adb shell input tap 135 1356
    sleep 6
    adb shell uiautomator dump /sdcard/uia1.xml >/dev/null 2>&1
    adb shell cat /sdcard/uia1.xml > evidence/ui-audio1.xml
    adb exec-out screencap -p > evidence/04-audio.png
    V1=$(seekval evidence/ui-audio1.xml); L1=$(playlabel evidence/ui-audio1.xml)
    sleep 6
    adb shell uiautomator dump /sdcard/uia2.xml >/dev/null 2>&1
    adb shell cat /sdcard/uia2.xml > evidence/ui-audio2.xml
    adb exec-out screencap -p > evidence/05-audio-later.png
    V2=$(seekval evidence/ui-audio2.xml); L2=$(playlabel evidence/ui-audio2.xml)
    echo "seek value: [$V1] -> [$V2]; button: [$L1] -> [$L2]"
    if [ -n "$V1" ] && [ -n "$V2" ] && [ "$(awk -v a="$V2" -v b="$V1" 'BEGIN{print (a>b+2)?1:0}')" = "1" ]; then
      echo "AUDIO PLAYBACK CONFIRMED (bundled assets): position advanced $V1 s to $V2 s"
    else
      echo "PLAYBACK NOT CONFIRMED from seek value"
    fi
    # Reveal the panel (scroll the page up) and try to seek via its slider.
    adb shell input swipe 540 2100 540 1200 300
    sleep 2
    adb shell uiautomator dump /sdcard/uia3.xml >/dev/null 2>&1
    adb shell cat /sdcard/uia3.xml > evidence/ui-audio3.xml
    adb exec-out screencap -p > evidence/06a-panel.png
    SB=$(grep -oE 'text="[0-9.]+, Seek [^"]*"[^>]*bounds="\[[0-9]+,[0-9]+\]\[[0-9]+,[0-9]+\]"' evidence/ui-audio3.xml | grep -oE '\[[0-9]+,[0-9]+\]\[[0-9]+,[0-9]+\]' | head -1)
    echo "seek bounds: [$SB]"
    if [ -n "$SB" ] && [ "$SB" != "[0,0][0,0]" ]; then
      X1=$(echo "$SB" | sed -E 's/\[([0-9]+),([0-9]+)\]\[([0-9]+),([0-9]+)\]/\1/'); Y1=$(echo "$SB" | sed -E 's/\[([0-9]+),([0-9]+)\]\[([0-9]+),([0-9]+)\]/\2/')
      X2=$(echo "$SB" | sed -E 's/\[([0-9]+),([0-9]+)\]\[([0-9]+),([0-9]+)\]/\3/'); Y2=$(echo "$SB" | sed -E 's/\[([0-9]+),([0-9]+)\]\[([0-9]+),([0-9]+)\]/\4/')
      V3=$(seekval evidence/ui-audio3.xml)
      adb shell input tap $(( X1 + (X2-X1)*65/100 )) $(( (Y1+Y2)/2 ))
      sleep 3
      adb shell uiautomator dump /sdcard/uia4.xml >/dev/null 2>&1
      adb shell cat /sdcard/uia4.xml > evidence/ui-audio4.xml
      adb exec-out screencap -p > evidence/05-audio-seek.png
      V4=$(seekval evidence/ui-audio4.xml)
      echo "seek: [$V3] -> [$V4]"
      if [ -n "$V3" ] && [ -n "$V4" ] && [ "$(awk -v a="$V4" -v b="$V3" 'BEGIN{print (a>b+10)?1:0}')" = "1" ]; then echo "AUDIO SEEK CONFIRMED"; else echo "SEEK NOT CONFIRMED"; fi
    else
      echo "SEEK NOT EXERCISED: slider has no on-screen bounds"
    fi
  fi
} 2>&1 | tee evidence/audio.txt

# Offline proof: radios off, force-stop, relaunch (retry once; the emulator can
# kill app processes when Google services die with the network)
adb root || true
adb shell svc wifi disable || true
adb shell svc data disable || true
for try in 1 2; do
  adb shell am force-stop com.alhinawi.menschen
  adb shell monkey -p com.alhinawi.menschen -c android.intent.category.LAUNCHER 1
  sleep 20
  adb shell dumpsys window | grep -E 'mCurrentFocus' | tee evidence/focus-offline-$try.txt
  if grep -q menschen evidence/focus-offline-$try.txt; then break; fi
done
adb exec-out screencap -p > evidence/07-offline-relaunch.png
adb shell uiautomator dump /sdcard/ui3.xml
adb shell cat /sdcard/ui3.xml > evidence/ui-offline.xml
adb shell ping -c1 -W2 8.8.8.8 | tee evidence/offline-ping.txt || true

# WebView / media errors
adb logcat -d > evidence/logcat.txt
grep -iE 'menschen|chromium|WebView|MediaPlayer|AudioTrack|AudioFlinger|cr_|FATAL' evidence/logcat.txt | tail -100 > evidence/logcat-filtered.txt || true
adb shell "ls /data/anr 2>/dev/null; cat /data/anr/anr_* 2>/dev/null | head -400" > evidence/anr-traces.txt 2>&1 || true
