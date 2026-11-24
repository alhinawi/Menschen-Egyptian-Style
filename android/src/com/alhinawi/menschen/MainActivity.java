package com.alhinawi.menschen;

import android.app.Activity;
import android.content.Intent;
import android.content.res.AssetFileDescriptor;
import android.content.res.AssetManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.os.Message;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.MimeTypeMap;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;

import java.io.FileInputStream;
import java.io.FilterInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

/**
 * Menschen offline app for Android.
 * The built site lives in assets/site/ inside the APK. WebView requests for
 * https://appassets.androidplatform.net/... are answered from those assets
 * (with HTTP Range support for audio and video), so every absolute path in the
 * site behaves exactly as on the hosted site. Requests to other hosts (the
 * leaderboard API, online translation) go to the network and simply fail when
 * the device is offline, as in the desktop build.
 */
public class MainActivity extends Activity {
    private static final String HOST = "appassets.androidplatform.net";
    private static final String START = "https://" + HOST + "/index.html";
    private static final String ROOT = "site";

    private WebView web;
    private FrameLayout container;
    private View customView;
    private WebChromeClient.CustomViewCallback customCallback;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        container = new FrameLayout(this);
        container.setBackgroundColor(Color.parseColor("#e8e8e4"));
        web = new WebView(this);
        web.setBackgroundColor(Color.parseColor("#e8e8e4"));
        container.addView(web, new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        setContentView(container);

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(false);
        s.setSupportMultipleWindows(true);
        s.setJavaScriptCanOpenWindowsAutomatically(true);
        s.setMixedContentMode(WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE);

        web.setWebViewClient(new AppClient());
        web.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onShowCustomView(View view, CustomViewCallback cb) {
                if (customView != null) { cb.onCustomViewHidden(); return; }
                customView = view;
                customCallback = cb;
                container.addView(view, new FrameLayout.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
                web.setVisibility(View.GONE);
            }

            @Override
            public void onHideCustomView() {
                if (customView == null) return;
                container.removeView(customView);
                customView = null;
                web.setVisibility(View.VISIBLE);
                if (customCallback != null) customCallback.onCustomViewHidden();
            }

            @Override
            public boolean onCreateWindow(WebView v, boolean dialog, boolean gesture, Message resultMsg) {
                // window.open / target=_blank: hand the URL to the system browser.
                WebView tmp = new WebView(MainActivity.this);
                tmp.setWebViewClient(new WebViewClient() {
                    @Override
                    public boolean shouldOverrideUrlLoading(WebView w, WebResourceRequest r) {
                        openExternal(r.getUrl());
                        return true;
                    }
                });
                ((WebView.WebViewTransport) resultMsg.obj).setWebView(tmp);
                resultMsg.sendToTarget();
                return true;
            }
        });

        if (savedInstanceState != null) {
            web.restoreState(savedInstanceState);
        } else {
            web.loadUrl(START);
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle out) {
        super.onSaveInstanceState(out);
        web.saveState(out);
    }

    @Override
    protected void onPause() { super.onPause(); web.onPause(); }

    @Override
    protected void onResume() { super.onResume(); web.onResume(); }

    @Override
    public void onBackPressed() {
        if (customView != null) {
            container.removeView(customView);
            customView = null;
            web.setVisibility(View.VISIBLE);
            if (customCallback != null) customCallback.onCustomViewHidden();
        } else if (web.canGoBack()) {
            web.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onDestroy() {
        web.destroy();
        super.onDestroy();
    }

    private void openExternal(Uri u) {
        try {
            startActivity(new Intent(Intent.ACTION_VIEW, u));
        } catch (Exception ignored) { }
    }

    private class AppClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest r) {
            Uri u = r.getUrl();
            if (HOST.equals(u.getHost())) return false;
            openExternal(u);
            return true;
        }

        @Override
        public WebResourceResponse shouldInterceptRequest(WebView v, WebResourceRequest r) {
            Uri u = r.getUrl();
            if (!HOST.equals(u.getHost())) return null; // real network
            try {
                return serve(r);
            } catch (Exception e) {
                return text(500, "Internal error");
            }
        }
    }

    // ---- local asset server -------------------------------------------------

    private static WebResourceResponse text(int code, String msg) {
        Map<String, String> h = new HashMap<>();
        h.put("Access-Control-Allow-Origin", "*");
        return new WebResourceResponse("text/plain", "utf-8", code, msg, h, new java.io.ByteArrayInputStream(msg.getBytes()));
    }

    private static String mime(String path) {
        String ext = MimeTypeMap.getFileExtensionFromUrl(path).toLowerCase();
        switch (ext) {
            case "html": return "text/html";
            case "js": case "mjs": return "text/javascript";
            case "css": return "text/css";
            case "json": return "application/json";
            case "webmanifest": return "application/manifest+json";
            case "svg": return "image/svg+xml";
            case "webp": return "image/webp";
            case "mp3": return "audio/mpeg";
            case "mp4": return "video/mp4";
            case "woff2": return "font/woff2";
            case "woff": return "font/woff";
            case "ttf": return "font/ttf";
            case "txt": return "text/plain";
        }
        String m = MimeTypeMap.getSingleton().getMimeTypeFromExtension(ext);
        return m != null ? m : "application/octet-stream";
    }

    private boolean exists(AssetManager am, String p) {
        try (InputStream in = am.open(p, AssetManager.ACCESS_STREAMING)) {
            return true;
        } catch (IOException e) {
            return false;
        }
    }

    private WebResourceResponse serve(WebResourceRequest r) throws IOException {
        String path = r.getUrl().getPath();
        if (path == null || path.equals("/") || path.isEmpty()) path = "/index.html";
        try { path = URLDecoder.decode(path.replace("+", "%2B"), "UTF-8"); } catch (Exception ignored) { }
        if (path.contains("..")) return text(403, "Forbidden");
        AssetManager am = getAssets();
        String asset = ROOT + path;
        if (!exists(am, asset)) {
            int slash = path.lastIndexOf('/');
            if (path.indexOf('.', slash + 1) >= 0) return text(404, "Not found");
            asset = ROOT + "/index.html"; // SPA fallback, same as the hosted site
        }
        String type = mime(asset);
        Map<String, String> h = new HashMap<>();
        h.put("Access-Control-Allow-Origin", "*");
        h.put("Accept-Ranges", "bytes");
        h.put("Cache-Control", "no-cache");

        boolean head = "HEAD".equalsIgnoreCase(r.getMethod());
        String range = r.getRequestHeaders().get("Range");
        if (range == null) range = r.getRequestHeaders().get("range");

        AssetFileDescriptor afd = null;
        try {
            afd = am.openFd(asset); // works for stored (uncompressed) entries
        } catch (IOException notStored) { }

        if (afd == null) { // small compressed entries: plain stream
            InputStream in = head ? new java.io.ByteArrayInputStream(new byte[0]) : am.open(asset, AssetManager.ACCESS_STREAMING);
            return new WebResourceResponse(type, type.startsWith("text/") ? "utf-8" : null, 200, "OK", h, in);
        }

        long size = afd.getLength();
        long start = 0, end = size - 1;
        boolean partial = false;
        if (range != null && range.startsWith("bytes=")) {
            String[] p = range.substring(6).split("-", -1);
            try {
                if (p[0].isEmpty()) {
                    long n = Long.parseLong(p[1]);
                    start = Math.max(0, size - n);
                } else {
                    start = Long.parseLong(p[0]);
                    if (p.length > 1 && !p[1].isEmpty()) end = Math.min(Long.parseLong(p[1]), size - 1);
                }
                if (start > end || start >= size) {
                    afd.close();
                    h.put("Content-Range", "bytes */" + size);
                    return new WebResourceResponse(type, null, 416, "Range Not Satisfiable", h, new java.io.ByteArrayInputStream(new byte[0]));
                }
                partial = true;
            } catch (NumberFormatException e) {
                start = 0; end = size - 1;
            }
        }
        long len = end - start + 1;
        h.put("Content-Length", String.valueOf(len));
        if (partial) h.put("Content-Range", "bytes " + start + "-" + end + "/" + size);
        if (head) {
            afd.close();
            return new WebResourceResponse(type, null, partial ? 206 : 200, partial ? "Partial Content" : "OK", h, new java.io.ByteArrayInputStream(new byte[0]));
        }
        FileInputStream fis = new FileInputStream(afd.getFileDescriptor());
        fis.getChannel().position(afd.getStartOffset() + start);
        InputStream bounded = new Bounded(fis, afd, len);
        return new WebResourceResponse(type, type.startsWith("text/") ? "utf-8" : null,
                partial ? 206 : 200, partial ? "Partial Content" : "OK", h, bounded);
    }

    private static final class Bounded extends FilterInputStream {
        private long left;
        private final AssetFileDescriptor afd;

        Bounded(InputStream in, AssetFileDescriptor afd, long len) {
            super(in);
            this.afd = afd;
            this.left = len;
        }

        @Override public int read() throws IOException {
            if (left <= 0) return -1;
            int b = super.read();
            if (b >= 0) left--;
            return b;
        }

        @Override public int read(byte[] buf, int off, int n) throws IOException {
            if (left <= 0) return -1;
            int got = super.read(buf, off, (int) Math.min(n, left));
            if (got > 0) left -= got;
            return got;
        }

        @Override public long skip(long n) throws IOException {
            long s = super.skip(Math.min(n, left));
            if (s > 0) left -= s;
            return s;
        }

        @Override public int available() { return (int) Math.min(left, Integer.MAX_VALUE); }

        @Override public void close() throws IOException {
            try { super.close(); } finally { afd.close(); }
        }
    }
}
