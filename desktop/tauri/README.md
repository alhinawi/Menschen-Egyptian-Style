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

## No WebView2?

Most up-to-date Windows 10/11 PCs have it. For one that does not, the workflow
also publishes `WebView2-Offline-Installer.exe` (Microsoft's offline runtime
installer, about 180 MB) as a separate download. Put it next to `Menschen.exe`:
the app installs it silently on first run, with no internet.
