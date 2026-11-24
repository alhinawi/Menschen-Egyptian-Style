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
adb install app.apk | tee evidence/install.txt
adb shell dumpsys package com.alhinawi.menschen | grep -E 'versionName|versionCode|firstInstallTime' | tee evidence/package.txt

# Launch, let the WebView load the bundled site
adb shell monkey -p com.alhinawi.menschen -c android.intent.category.LAUNCHER 1
sleep 25
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
  if [ -z "$PAGE" ]; then
    echo "NOT EXERCISED: no candidate page node found (see ui-pages.xml)"
  else
    sleep 8
    if tap_node 'Play (CD|Aufgabe)'; then
      sleep 5
      adb shell uiautomator dump /sdcard/uia1.xml >/dev/null 2>&1
      adb shell cat /sdcard/uia1.xml > evidence/ui-audio1.xml
      adb exec-out screencap -p > evidence/04-audio.png
      T1=$(read_time evidence/ui-audio1.xml)
      sleep 5
      adb shell uiautomator dump /sdcard/uia2.xml >/dev/null 2>&1
      adb shell cat /sdcard/uia2.xml > evidence/ui-audio2.xml
      T2=$(read_time evidence/ui-audio2.xml)
      echo "playback time: [$T1] -> [$T2]"
      S1=$(to_secs "${T1%% /*}"); S2=$(to_secs "${T2%% /*}")
      if [ -n "$S1" ] && [ -n "$S2" ] && [ "$(echo "$S2 > $S1 + 2" | bc)" = "1" ]; then
        echo "AUDIO PLAYBACK CONFIRMED (bundled assets) ($S1 s to $S2 s)"
      else
        echo "PLAYBACK NOT CONFIRMED from time texts"
      fi
      SB=$(grep -oE 'content-desc="Seek [^"]*"[^>]*bounds="\[[0-9]+,[0-9]+\]\[[0-9]+,[0-9]+\]"' evidence/ui-audio2.xml | grep -oE '\[[0-9]+,[0-9]+\]\[[0-9]+,[0-9]+\]' | head -1)
      if [ -n "$SB" ]; then
        X1=$(echo "$SB" | sed -E 's/\[([0-9]+),([0-9]+)\]\[([0-9]+),([0-9]+)\]/\1/'); Y1=$(echo "$SB" | sed -E 's/\[([0-9]+),([0-9]+)\]\[([0-9]+),([0-9]+)\]/\2/')
        X2=$(echo "$SB" | sed -E 's/\[([0-9]+),([0-9]+)\]\[([0-9]+),([0-9]+)\]/\3/'); Y2=$(echo "$SB" | sed -E 's/\[([0-9]+),([0-9]+)\]\[([0-9]+),([0-9]+)\]/\4/')
        adb shell input tap $(( X1 + (X2-X1)*65/100 )) $(( (Y1+Y2)/2 ))
        sleep 3
        adb shell uiautomator dump /sdcard/uia3.xml >/dev/null 2>&1
        adb shell cat /sdcard/uia3.xml > evidence/ui-audio3.xml
        adb exec-out screencap -p > evidence/05-audio-seek.png
        T3=$(read_time evidence/ui-audio3.xml)
        S3=$(to_secs "${T3%% /*}")
        echo "seek tap at 65%: time now [$T3]"
        if [ -n "$S3" ] && [ -n "$S2" ] && [ "$(echo "$S3 > $S2 + 15" | bc)" = "1" ]; then
          echo "AUDIO SEEK CONFIRMED ($S2 s to $S3 s)"
        else
          echo "SEEK NOT CONFIRMED from time texts"
        fi
      else
        echo "SEEK NOT EXERCISED: no seek slider node"
      fi
    else
      echo "NOT EXERCISED: no Play node on page $PAGE"
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
adb exec-out screencap -p > evidence/06-offline-relaunch.png
adb shell uiautomator dump /sdcard/ui3.xml
adb shell cat /sdcard/ui3.xml > evidence/ui-offline.xml
adb shell ping -c1 -W2 8.8.8.8 | tee evidence/offline-ping.txt || true

# WebView / media errors
adb logcat -d > evidence/logcat.txt
grep -iE 'menschen|chromium|WebView|MediaPlayer|AudioTrack|AudioFlinger|cr_|FATAL' evidence/logcat.txt | tail -100 > evidence/logcat-filtered.txt || true
