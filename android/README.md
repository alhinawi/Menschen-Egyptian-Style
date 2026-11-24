# Menschen Android APK (Java WebView, offline)

A tiny native Android app (about 250 lines of Java, no Gradle, no libraries) that
shows the built site from inside the APK. The site is stored uncompressed in
`assets/site/`; requests to `https://appassets.androidplatform.net/...` are
answered from there, including HTTP Range requests for audio and video. Nothing
needs the internet. Progress is kept in the WebView's local storage.

Build (needs JDK 17 and the Android build-tools and platform 34 zips from
dl.google.com, no Android Studio):

    MENSCHEN_DESKTOP=1 CF_PAGES= npm run build      # site with local clips + full audio
    # put the 24 clips (720p recommended) into dist/assets/clips/
    BT=<build-tools dir> PLATFORM=<platform-34 dir> android/build-apk.sh dist Menschen-Android-APK.apk

The APK is signed with a throwaway key (created on first build). Keep the same
key for updates, otherwise Android asks to uninstall first.

## Install on the phone (Egyptian Arabic)

1. انقل الملف Menschen-Android-APK.apk للموبايل أو التابلت (كابل أو فلاشة OTG). حجمه حوالي 1.6 جيجا.
2. لازم يبقى فاضل على الجهاز 4 جيجا على الأقل وقت التثبيت.
3. افتح الملف من تطبيق الملفات. لو ظهرت رسالة "التثبيت من مصدر غير معروف" اضغط الإعدادات وفعّل "السماح من هذا المصدر".
4. لو ظهرت رسالة Play Protect اضغط "تثبيت على أي حال".
5. افتح تطبيق Menschen. مش محتاج نت خالص.

Needs Android 7.0 or newer with the system WebView (Chrome) up to date.
