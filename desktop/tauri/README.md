# Menschen offline app, Tauri build

A Rust (Tauri 2) shell for the offline Windows app. It uses the WebView2 that
ships with Windows 10/11 instead of bundling Chromium, so the program itself is
a few MB. The book content (about 3 GB) is not embedded in the exe: it sits in a
`site` folder next to `Menschen.exe` and is streamed from disk by a small local
server on `127.0.0.1:47314` (Range support for audio and video). Nothing is
read until a page needs it.

The Electron build in `desktop/` stays as the fallback.

## Build

The Windows build runs in GitHub Actions (`.github/workflows/tauri-windows.yml`,
manual run or on changes to this folder). It builds the site with
`MENSCHEN_DESKTOP=1`, fetches the 24 clips, builds the exe, assembles
`Menschen-tauri/`, records startup time, memory and a screenshot, and uploads
`menschen-tauri-portable.zip` as an artifact.

## No WebView2? (portable, nothing installed)

The folder ships Microsoft's WebView2 Fixed Version runtime in `webview2/`
(from https://developer.microsoft.com/microsoft-edge/webview2/, "Fixed Version",
x64). At start the app uses the WebView2 already on the PC if there is one;
otherwise it points WebView2 at `webview2/` through the documented
`WEBVIEW2_BROWSER_EXECUTABLE_FOLDER` variable. Nothing is installed or
downloaded. Saved answers live in `data/` next to the exe, so progress travels
with the folder.

Windows 10 note (Microsoft): a Fixed Version runtime 120+ in an unpackaged app
needs read access for ALL APPLICATION PACKAGES on its folder. The app grants it
with `icacls` on first run. That works for a folder you own on NTFS, but cannot
work on exFAT/FAT USB sticks. Windows 11 needs nothing. The runtime is not part
of the repo or the workflow; the zip is assembled from the CI exe plus the
runtime, the site and the clips.
