// Menschen offline desktop app (Tauri, Rust shell, system WebView2).
//
// The 3 GB of book content is NOT embedded in the exe. It sits in a `site`
// folder next to Menschen.exe and is streamed from disk by a tiny local HTTP
// server on 127.0.0.1 (with Range support for audio and video). Only the files
// the reader actually opens are ever read, so startup and memory stay small.
// No installer, no admin rights, no internet.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::File;
use std::io::{Read, Seek, SeekFrom};
use std::path::{Path, PathBuf};
use std::sync::Arc;
use std::thread;

use tauri::{Manager, WebviewUrl, WebviewWindowBuilder};
use tiny_http::{Header, Method, Response, Server, StatusCode};

const PORT: u16 = 47314;

fn site_dir() -> PathBuf {
    if let Ok(p) = std::env::var("MENSCHEN_SITE") {
        return PathBuf::from(p);
    }
    let exe = std::env::current_exe().unwrap_or_default();
    exe.parent().unwrap_or(Path::new(".")).join("site")
}

fn mime(path: &Path) -> &'static str {
    match path
        .extension()
        .and_then(|e| e.to_str())
        .map(|e| e.to_ascii_lowercase())
        .as_deref()
    {
        Some("html") => "text/html; charset=utf-8",
        Some("js") | Some("mjs") => "text/javascript; charset=utf-8",
        Some("css") => "text/css; charset=utf-8",
        Some("json") | Some("webmanifest") => "application/json; charset=utf-8",
        Some("png") => "image/png",
        Some("jpg") | Some("jpeg") => "image/jpeg",
        Some("webp") => "image/webp",
        Some("gif") => "image/gif",
        Some("svg") => "image/svg+xml",
        Some("ico") => "image/x-icon",
        Some("mp3") => "audio/mpeg",
        Some("wav") => "audio/wav",
        Some("ogg") => "audio/ogg",
        Some("m4a") => "audio/mp4",
        Some("mp4") => "video/mp4",
        Some("webm") => "video/webm",
        Some("woff") => "font/woff",
        Some("woff2") => "font/woff2",
        Some("ttf") => "font/ttf",
        Some("txt") => "text/plain; charset=utf-8",
        _ => "application/octet-stream",
    }
}

fn percent_decode(s: &str) -> Option<String> {
    let b = s.as_bytes();
    let mut out = Vec::with_capacity(b.len());
    let mut i = 0;
    while i < b.len() {
        if b[i] == b'%' {
            let hex = s.get(i + 1..i + 3)?;
            out.push(u8::from_str_radix(hex, 16).ok()?);
            i += 3;
        } else {
            out.push(b[i]);
            i += 1;
        }
    }
    String::from_utf8(out).ok()
}

fn header(name: &str, value: &str) -> Header {
    Header::from_bytes(name.as_bytes(), value.as_bytes()).unwrap()
}

fn cache_for(rel: &str) -> &'static str {
    if rel.ends_with(".html") || rel == "/" {
        "no-cache"
    } else if rel.starts_with("/assets/") && (rel.ends_with(".js") || rel.ends_with(".css")) {
        "public, max-age=31536000, immutable"
    } else {
        "public, max-age=3600"
    }
}

fn parse_range(h: &str, size: u64) -> Option<(u64, u64)> {
    let spec = h.strip_prefix("bytes=")?;
    let (a, b) = spec.split_once('-')?;
    if size == 0 {
        return None;
    }
    let (start, end) = if a.is_empty() {
        let n: u64 = b.parse().ok()?;
        (size.saturating_sub(n), size - 1)
    } else {
        let s: u64 = a.parse().ok()?;
        let e: u64 = if b.is_empty() { size - 1 } else { b.parse::<u64>().ok()?.min(size - 1) };
        (s, e)
    };
    if start > end || start >= size {
        None
    } else {
        Some((start, end))
    }
}

fn handle(root: &Path, req: tiny_http::Request) {
    let url = req.url().to_string();
    let raw = url.split(['?', '#']).next().unwrap_or("/");
    let rel = match percent_decode(raw) {
        Some(r) => r,
        None => {
            let _ = req.respond(Response::from_string("Bad request").with_status_code(400));
            return;
        }
    };
    let rel = if rel == "/" { "/index.html".to_string() } else { rel };
    let mut file = root.join(rel.trim_start_matches('/'));
    // Unknown extensionless routes fall back to the SPA entry, like the host.
    if !file.is_file() && file.extension().is_none() {
        file = root.join("index.html");
    }
    let ok = match (file.canonicalize(), root.canonicalize()) {
        (Ok(f), Ok(r)) => f.starts_with(&r) && f.is_file(),
        _ => false,
    };
    if !ok {
        let _ = req.respond(Response::from_string("Not found").with_status_code(404));
        return;
    }
    let mut f = match File::open(&file) {
        Ok(f) => f,
        Err(_) => {
            let _ = req.respond(Response::from_string("Not found").with_status_code(404));
            return;
        }
    };
    let size = f.metadata().map(|m| m.len()).unwrap_or(0);
    let range = req
        .headers()
        .iter()
        .find(|h| h.field.equiv("Range"))
        .map(|h| h.value.as_str().to_string());
    let head = *req.method() == Method::Head;
    let base = |r: &mut Vec<Header>| {
        r.push(header("Content-Type", mime(&file)));
        r.push(header("Accept-Ranges", "bytes"));
        r.push(header("Cache-Control", cache_for(&rel)));
        r.push(header("Access-Control-Allow-Origin", "*"));
    };
    let mut hs = Vec::new();
    base(&mut hs);
    if let Some(rg) = range {
        match parse_range(&rg, size) {
            Some((s, e)) => {
                hs.push(header("Content-Range", &format!("bytes {s}-{e}/{size}")));
                let len = e - s + 1;
                if f.seek(SeekFrom::Start(s)).is_err() {
                    return;
                }
                let body: Box<dyn Read + Send> =
                    if head { Box::new(std::io::empty()) } else { Box::new(f.take(len)) };
                let _ = req.respond(Response::new(StatusCode(206), hs, body, Some(len as usize), None));
            }
            None => {
                hs.push(header("Content-Range", &format!("bytes */{size}")));
                let _ = req.respond(Response::new(StatusCode(416), hs, std::io::empty(), Some(0), None));
            }
        }
        return;
    }
    let body: Box<dyn Read + Send> = if head { Box::new(std::io::empty()) } else { Box::new(f) };
    let _ = req.respond(Response::new(StatusCode(200), hs, body, Some(size as usize), None));
}

fn start_server(root: PathBuf) -> bool {
    let server = match Server::http(("127.0.0.1", PORT)) {
        Ok(s) => Arc::new(s),
        Err(_) => return false,
    };
    for _ in 0..4 {
        let s = Arc::clone(&server);
        let r = root.clone();
        thread::spawn(move || {
            while let Ok(req) = s.recv() {
                handle(&r, req);
            }
        });
    }
    true
}

fn exe_dir() -> PathBuf {
    std::env::current_exe()
        .ok()
        .and_then(|p| p.parent().map(|d| d.to_path_buf()))
        .unwrap_or_else(|| PathBuf::from("."))
}

// WebView2 runtime choice. Nothing is installed and nothing is downloaded.
//  1. If the PC already has the WebView2 runtime (Windows 11 and updated
//     Windows 10 do), use it.
//  2. Otherwise use the Fixed Version runtime shipped in the `webview2` folder
//     next to Menschen.exe, by setting WEBVIEW2_BROWSER_EXECUTABLE_FOLDER before
//     the window is created (the documented way to point WebView2 at a fixed
//     runtime). On Windows 10 a fixed runtime of version 120 or newer also needs
//     read access for ALL APPLICATION PACKAGES on its folder, so we grant it on
//     first run (works for a folder you own on NTFS, no admin needed; it cannot
//     work on exFAT/FAT USB sticks, which have no permissions).
#[cfg(windows)]
fn setup_webview2() {
    use std::os::windows::process::CommandExt;
    const NO_WINDOW: u32 = 0x0800_0000;
    let guid = "{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}";
    let system_has_it = [
        format!(r"HKLM\SOFTWARE\WOW6432Node\Microsoft\EdgeUpdate\Clients\{guid}"),
        format!(r"HKLM\SOFTWARE\Microsoft\EdgeUpdate\Clients\{guid}"),
        format!(r"HKCU\Software\Microsoft\EdgeUpdate\Clients\{guid}"),
    ]
    .iter()
    .any(|k| {
        std::process::Command::new("reg")
            .args(["query", k, "/v", "pv"])
            .creation_flags(NO_WINDOW)
            .output()
            .map(|o| o.status.success())
            .unwrap_or(false)
    });
    if system_has_it {
        return;
    }
    let base = exe_dir().join("webview2");
    let fixed = if base.join("msedgewebview2.exe").is_file() {
        Some(base.clone())
    } else {
        std::fs::read_dir(&base).ok().and_then(|rd| {
            rd.flatten()
                .map(|e| e.path())
                .find(|p| p.join("msedgewebview2.exe").is_file())
        })
    };
    match fixed {
        Some(dir) => {
            let marker = dir.join(".menschen-acl-ok");
            if !marker.exists() {
                let ok = ["*S-1-15-2-2", "*S-1-15-2-1"].iter().all(|sid| {
                    std::process::Command::new("icacls")
                        .arg(&dir)
                        .args(["/grant", &format!("{sid}:(OI)(CI)(RX)")])
                        .creation_flags(NO_WINDOW)
                        .output()
                        .map(|o| o.status.success())
                        .unwrap_or(false)
                });
                if ok {
                    let _ = std::fs::write(&marker, b"ok");
                }
            }
            std::env::set_var("WEBVIEW2_BROWSER_EXECUTABLE_FOLDER", &dir);
        }
        None => {
            let _ = std::process::Command::new("powershell")
                .args([
                    "-NoProfile",
                    "-Command",
                    "Add-Type -AssemblyName PresentationFramework; [System.Windows.MessageBox]::Show('The webview2 folder next to Menschen.exe is missing. Extract the whole Menschen zip and keep the webview2 and site folders next to Menschen.exe.','Menschen')",
                ])
                .creation_flags(NO_WINDOW)
                .status();
            std::process::exit(1);
        }
    }
}
#[cfg(not(windows))]
fn setup_webview2() {}

// Keep the browser profile (saved answers) in a `data` folder next to the exe so
// the progress travels with the folder or USB stick. Falls back to the default
// per-user location if that folder is not writable.
fn data_dir() -> Option<PathBuf> {
    let d = exe_dir().join("data");
    std::fs::create_dir_all(&d).ok()?;
    let probe = d.join(".w");
    std::fs::write(&probe, b"1").ok()?;
    let _ = std::fs::remove_file(probe);
    Some(d)
}

fn is_local(url: &str) -> bool {
    url.starts_with(&format!("http://127.0.0.1:{PORT}/")) || url.starts_with("about:") || url.starts_with("blob:")
}

fn main() {
    setup_webview2();
    let root = site_dir();
    start_server(root);
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            if let Some(w) = app.get_webview_window("main") {
                let _ = w.unminimize();
                let _ = w.set_focus();
            }
        }))
        .setup(|app| {
            let url: tauri::Url = format!("http://127.0.0.1:{PORT}/index.html").parse().unwrap();
            let mut wb = WebviewWindowBuilder::new(app, "main", WebviewUrl::External(url));
            if let Some(d) = data_dir() {
                wb = wb.data_directory(d);
            }
            wb.title("Menschen. - The Interactive German Coursebook")
                .inner_size(1366.0, 900.0)
                .min_inner_size(900.0, 600.0)
                .on_navigation(|u| {
                    if is_local(u.as_str()) {
                        true
                    } else {
                        if u.scheme() == "http" || u.scheme() == "https" {
                            let _ = open::that(u.as_str());
                        }
                        false
                    }
                })
                .build()?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running Menschen");
}
