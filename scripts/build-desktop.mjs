// Build the portable offline Windows app from the current checkout.
//
//   node scripts/build-desktop.mjs [--skip-clips] [--skip-zip]
//
// Steps:
//   1. vite build with MENSCHEN_DESKTOP=1 (full audio set, local clip playback)
//   2. scripts/fetch-clips.py -> desktop-cache/clips/<youtube-id>.mp4 (24 clips)
//   3. clips copied into dist/assets/clips/
//   4. Electron for win32 x64 downloaded once into desktop-cache/electron/
//   5. desktop/ + dist/ packed into resources/app.asar, electron.exe renamed
//      to Menschen.exe
//   6. build/Menschen-windows/ zipped to build/menschen-windows-portable.zip
//
// Re-running reuses both caches, so a site update only needs steps 1, 3, 5, 6.
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const CACHE = path.join(ROOT, 'desktop-cache');
const CLIPS = path.join(CACHE, 'clips');
const OUT = path.join(ROOT, 'build');
const APPDIR = path.join(OUT, 'Menschen-windows');
const args = new Set(process.argv.slice(2));

function run(cmd, cmdArgs, opts = {}) {
  console.log('>', cmd, ...cmdArgs);
  const r = spawnSync(cmd, cmdArgs, {cwd: ROOT, stdio: 'inherit', shell: false, ...opts});
  if (r.status !== 0) throw new Error(`${cmd} failed with ${r.status}`);
}

// 1. site build (desktop flag: local clips, full audio)
run('npm', ['run', 'build'], {env: {...process.env, MENSCHEN_DESKTOP: '1', CF_PAGES: ''}});

// 2 + 3. clips
if (!args.has('--skip-clips')) {
  run('python3', [path.join('scripts', 'fetch-clips.py')]);
}
const clipIds = [...fs.readFileSync(path.join(ROOT, 'src', 'components', 'ClipMarkers.tsx'), 'utf8')
  .match(/const videos=\[([^\]]+)\]/)?.[1].matchAll(/'([A-Za-z0-9_-]{11})'/g) ?? []].map(m => m[1]);
const clipsOut = path.join(ROOT, 'dist', 'assets', 'clips');
fs.mkdirSync(clipsOut, {recursive: true});
let missing = [];
// Full HD versions (lanczos upscales produced by fetch-clips.py) ship when
// all 24 are present; otherwise the raw downloads are used as-is.
const HD = path.join(CACHE, 'clips-1080');
const hdComplete = clipIds.every(id => {
  try { return fs.statSync(path.join(HD, id + '.mp4')).size > 100000; } catch { return false; }
});
const clipSrcDir = hdComplete ? HD : CLIPS;
console.log('clip source:', clipSrcDir, hdComplete ? '(Full HD 1080p)' : '(raw)');
for (const id of clipIds) {
  const src = path.join(clipSrcDir, id + '.mp4');
  if (fs.existsSync(src) && fs.statSync(src).size > 100000) fs.copyFileSync(src, path.join(clipsOut, id + '.mp4'));
  else missing.push(id);
}
if (missing.length && !args.has('--skip-clips')) throw new Error('missing clips: ' + missing.join(' '));
if (missing.length) console.warn('WARNING: missing clips (allowed by --skip-clips):', missing.join(' '));

// 4. electron for windows
const electronVersion = JSON.parse(fs.readFileSync(require.resolve('electron/package.json'))).version;
const zipName = `electron-v${electronVersion}-win32-x64.zip`;
const zipPath = path.join(CACHE, 'electron', zipName);
fs.mkdirSync(path.dirname(zipPath), {recursive: true});
if (!fs.existsSync(zipPath)) {
  run('curl', ['-sL', '--retry', '3', '-o', zipPath,
    `https://github.com/electron/electron/releases/download/v${electronVersion}/${zipName}`]);
}
console.log('electron', electronVersion, 'cached at', zipPath);

// 5. assemble app folder
fs.rmSync(APPDIR, {recursive: true, force: true});
fs.mkdirSync(APPDIR, {recursive: true});
run('python3', ['-c', `import zipfile;zipfile.ZipFile(${JSON.stringify(zipPath)}).extractall(${JSON.stringify(APPDIR)})`]);
const appSrc = path.join(OUT, 'app-src');
fs.rmSync(appSrc, {recursive: true, force: true});
fs.mkdirSync(appSrc, {recursive: true});
fs.cpSync(path.join(ROOT, 'desktop'), appSrc, {recursive: true});
fs.cpSync(path.join(ROOT, 'dist'), path.join(appSrc, 'dist'), {recursive: true});
const asar = require('@electron/asar');
await asar.createPackage(appSrc, path.join(APPDIR, 'resources', 'app.asar'));
fs.rmSync(appSrc, {recursive: true, force: true});
fs.rmSync(path.join(APPDIR, 'resources', 'default_app.asar'), {force: true});
fs.renameSync(path.join(APPDIR, 'electron.exe'), path.join(APPDIR, 'Menschen.exe'));
fs.copyFileSync(path.join(ROOT, 'desktop', 'START-HERE.txt'), path.join(APPDIR, 'START-HERE.txt'));

// 6. zip
if (!args.has('--skip-zip')) {
  const zipOut = path.join(OUT, 'menschen-windows-portable.zip');
  fs.rmSync(zipOut, {force: true});
  run('zip', ['-q', '-r', '-1', zipOut, path.basename(APPDIR)], {cwd: OUT});
  const mb = (fs.statSync(zipOut).size / 1024 / 1024).toFixed(0);
  console.log(`DONE: ${zipOut} (${mb} MB)`);
} else {
  console.log('DONE (zip skipped):', APPDIR);
}
