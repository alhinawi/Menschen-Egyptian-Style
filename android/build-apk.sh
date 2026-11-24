#!/usr/bin/env bash
# Build the Menschen Android APK (no Gradle, no Android Studio).
#
#   android/build-apk.sh <site-dir> <out.apk>
#
# <site-dir> is the built site (vite build with MENSCHEN_DESKTOP=1, clips in
# assets/clips). It is stored uncompressed inside the APK under assets/site/
# so audio and video can be range-read straight from the APK.
#
# Env: BT = Android build-tools dir (aapt2, d8, zipalign, apksigner)
#      PLATFORM = Android platform dir containing android.jar (API 34)
#      KEYSTORE / KS_PASS = signing key (a throwaway one is made if missing)
set -euo pipefail
SITE=$(readlink -f "${1:?site dir}")
OUT=$(readlink -f -m "${2:?output apk}")
HERE=$(cd "$(dirname "$0")" && pwd)
BT=${BT:?set BT to the build-tools directory}
JAR=${PLATFORM:?set PLATFORM to the platform directory}/android.jar
KEYSTORE=${KEYSTORE:-$HERE/../build/menschen-android.keystore}
KS_PASS=${KS_PASS:-menschen-offline}
W=$(mktemp -d "${TMPDIR:-/tmp}/apk.XXXXXX")
trap 'rm -rf "$W"' EXIT

mkdir -p "$W/res" "$W/classes" "$W/stage/assets"
"$BT/aapt2" compile --dir "$HERE/res" -o "$W/res.zip"
"$BT/aapt2" link -I "$JAR" --manifest "$HERE/AndroidManifest.xml" \
  --min-sdk-version 24 --target-sdk-version 34 -o "$W/base.apk" "$W/res.zip"
javac --release 8 -classpath "$JAR" -d "$W/classes" "$HERE"/src/com/alhinawi/menschen/*.java
"$BT/d8" --release --min-api 24 --lib "$JAR" --output "$W" "$W"/classes/com/alhinawi/menschen/*.class
(cd "$W" && zip -q -0 base.apk classes.dex)
ln -s "$SITE" "$W/stage/assets/site"
(cd "$W/stage" && zip -q -0 -r "$W/base.apk" assets)
"$BT/zipalign" -f -p 4 "$W/base.apk" "$W/aligned.apk"
if [ ! -f "$KEYSTORE" ]; then
  mkdir -p "$(dirname "$KEYSTORE")"
  keytool -genkeypair -keystore "$KEYSTORE" -storepass "$KS_PASS" -keypass "$KS_PASS" \
    -alias menschen -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Menschen offline"
fi
"$BT/apksigner" sign --ks "$KEYSTORE" --ks-pass "pass:$KS_PASS" --ks-key-alias menschen \
  --out "$OUT" "$W/aligned.apk"
"$BT/apksigner" verify "$OUT"
ls -l "$OUT"
