// Menschen offline desktop shell.
// Serves the built site (dist/, next to this file inside resources/app.asar)
// over http://127.0.0.1 so every absolute path, fetch() and Range probe in the
// app behaves exactly as on the hosted site, then opens it in one window.
// No installer, no admin rights, no internet: everything runs from the folder.
//
// Test hooks (never set in the shipped app):
//   MENSCHEN_OFFLINE_TEST=1  route all traffic through a dead proxy to prove
//                            the app works with no internet (localhost is not
//                            proxied by Chromium, so the book keeps working)
//   MENSCHEN_SHOTS="url::file.png,url::file.png"  capture screenshots, then quit
//   MENSCHEN_NO_SINGLE=1     allow several windows (testing only)
const {app, BrowserWindow, shell} = require('electron');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 47313;
const DIST = path.join(__dirname, 'dist');
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.ogg': 'audio/ogg',
  '.m4a': 'audio/mp4', '.flac': 'audio/flac',
  '.mp4': 'video/mp4', '.webm': 'video/webm',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  '.webmanifest': 'application/manifest+json', '.txt': 'text/plain; charset=utf-8',
};

if (process.env.MENSCHEN_OFFLINE_TEST === '1') {
  // Send every request through a dead proxy. Chromium never proxies localhost,
  // so only real internet calls fail - exactly what an offline PC looks like.
  app.commandLine.appendSwitch('proxy-server', 'http://127.0.0.1:9');
}

function resolveFile(rawUrl) {
  let clean;
  try {
    clean = decodeURIComponent((rawUrl || '/').split('?')[0].split('#')[0]);
  } catch {
    return null;
  }
  if (clean === '/') clean = '/index.html';
  const p = path.normalize(path.join(DIST, clean));
  if (p !== DIST && !p.startsWith(DIST + path.sep)) return null; // traversal guard
  return p;
}

function send(res, status, headers, body) {
  res.writeHead(status, headers);
  res.end(body);
}

const server = http.createServer((req, res) => {
  const file = resolveFile(req.url);
  if (!file) return send(res, 403, {'Content-Type': 'text/plain'}, 'Forbidden');
  let stat;
  try {
    stat = fs.statSync(file);
  } catch {
    stat = null;
  }
  // Unknown extensionless paths fall back to the SPA entry, like the host does.
  if ((!stat || !stat.isFile()) && !path.extname(file)) {
    const spa = path.join(DIST, 'index.html');
    try { stat = fs.statSync(spa); } catch { stat = null; }
    if (stat) return streamFile(spa, stat, 'text/html; charset=utf-8');
  }
  if (!stat || !stat.isFile()) return send(res, 404, {'Content-Type': 'text/plain'}, 'Not found');
  streamFile(file, stat, MIME[path.extname(file).toLowerCase()] || 'application/octet-stream');

  function streamFile(f, st, type) {
    const range = req.headers.range;
    const common = {
      'Content-Type': type,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    };
    if (range) {
      const m = /^bytes=(\d*)-(\d*)$/.exec(range);
      if (m && (m[1] !== '' || m[2] !== '')) {
        let start = m[1] === '' ? Math.max(0, st.size - Number(m[2])) : Number(m[1]);
        let end = m[2] === '' || m[1] === '' ? st.size - 1 : Math.min(Number(m[2]), st.size - 1);
        if (start > end || start >= st.size) {
          return send(res, 416, {...common, 'Content-Range': `bytes */${st.size}`});
        }
        res.writeHead(206, {...common, 'Content-Range': `bytes ${start}-${end}/${st.size}`, 'Content-Length': end - start + 1});
        if (req.method === 'HEAD') return res.end();
        return fs.createReadStream(f, {start, end}).pipe(res);
      }
    }
    res.writeHead(200, {...common, 'Content-Length': st.size});
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(f).pipe(res);
  }
});

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    autoHideMenuBar: true,
    backgroundColor: '#e8e8e4',
    title: 'Menschen. - The Interactive German Coursebook',
    webPreferences: {contextIsolation: true, nodeIntegration: false},
  });
  mainWindow.webContents.setWindowOpenHandler(({url}) => {
    if (/^https?:\/\//.test(url)) void shell.openExternal(url);
    return {action: 'deny'};
  });
  const startUrl = process.env.MENSCHEN_START_URL || `http://127.0.0.1:${PORT}/index.html`;
  void mainWindow.loadURL(startUrl);

  const shots = process.env.MENSCHEN_SHOTS;
  if (shots) {
    void (async () => {
      for (const spec of shots.split(',')) {
        const sep = spec.indexOf('::');
        const url = spec.slice(0, sep);
        const out = spec.slice(sep + 2);
        await mainWindow.loadURL(url).catch(() => {});
        await new Promise(r => setTimeout(r, Number(process.env.MENSCHEN_SHOT_WAIT || 6000)));
        const img = await mainWindow.webContents.capturePage();
        fs.writeFileSync(out, img.toPNG());
        console.log('SHOT', out);
      }
      app.quit();
    })();
  }
}

const singleInstance = process.env.MENSCHEN_NO_SINGLE !== '1';
if (singleInstance && !app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
  app.whenReady().then(() => {
    server.listen(PORT, '127.0.0.1', createWindow);
    server.on('error', err => {
      console.error('Server error:', err);
      app.quit();
    });
  });
  app.on('window-all-closed', () => {
    server.close();
    app.quit();
  });
}
