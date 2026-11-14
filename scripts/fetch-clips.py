#!/usr/bin/env python3
"""Download the 24 Film-Stationen clips for the offline desktop build.

Writes desktop-cache/clips/<youtube-id>.mp4 for every clip id listed in
src/components/ClipMarkers.tsx (the single source of truth for which clips the
site embeds, in the site's order).

Two sources, tried in order per clip:
  1. YouTube via yt-dlp (best quality; works on normal home connections)
  2. Blogger mirrors of the same clips (fallback for networks where YouTube
     answers yt-dlp with a bot check)

The cache is keyed by file name, so re-running only fetches what is missing.
"""
import os, re, subprocess, sys, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'desktop-cache', 'clips')
os.makedirs(OUT, exist_ok=True)

BLOGGER_PAGES = [
    ('http://matifmarin.blogspot.com/p/menschen-film-stationen-clips.html', 1),
    ('http://matifmarin.blogspot.com/p/menschen-film-stationen-clips-ii.html', 13),
]

def clip_ids():
    src = open(os.path.join(ROOT, 'src', 'components', 'ClipMarkers.tsx')).read()
    m = re.search(r"const videos=\[([^\]]+)\]", src)
    return re.findall(r"'([A-Za-z0-9_-]{11})'", m.group(1))

def have(path):
    return os.path.exists(path) and os.path.getsize(path) > 100000

def from_youtube(ytid, dest):
    if subprocess.run(['which', 'yt-dlp'], capture_output=True).returncode != 0:
        return False
    r = subprocess.run([
        'yt-dlp', '-f', 'bv*[height<=480][ext=mp4]+ba[ext=m4a]/bv*[height<=480]+ba/b[height<=480]/b',
        '--merge-output-format', 'mp4', '--no-playlist', '--retries', '3',
        '-o', dest + '.%(ext)s', 'https://www.youtube.com/watch?v=' + ytid,
    ], capture_output=True, timeout=900)
    made = dest + '.mp4'
    ok = r.returncode == 0 and have(made)
    if ok and made != dest:
        os.replace(made, dest)
    return ok and have(dest)

_blogger_urls = None
def blogger_urls():
    """clip number (1-24) -> downloadable mp4 url from the Blogger mirrors."""
    global _blogger_urls
    if _blogger_urls is not None:
        return _blogger_urls
    _blogger_urls = {}
    for page, first in BLOGGER_PAGES:
        req = urllib.request.Request(page, headers={'User-Agent': 'Mozilla/5.0'})
        h = urllib.request.urlopen(req, timeout=60).read().decode('utf-8', 'replace')
        tokens = re.findall(r'https://www\.blogger\.com/video\.g\?token=([^"&]+)', h)
        for i, tok in enumerate(tokens):
            try:
                v = urllib.request.urlopen(urllib.request.Request(
                    'https://www.blogger.com/video.g?token=' + tok,
                    headers={'User-Agent': 'Mozilla/5.0'}), timeout=60).read().decode('utf-8', 'replace')
                j = v.find('https://rr')
                k = v.find('&quot;', j)
                if j >= 0 and k > j:
                    _blogger_urls[first + i] = v[j:k].replace('\\u0026', '&').replace('\\u003d', '=')
            except Exception as e:
                print('blogger: clip', first + i, 'failed:', e, flush=True)
    return _blogger_urls

def from_blogger(n, dest):
    url = blogger_urls().get(n)
    if not url:
        return False
    r = subprocess.run(['curl', '-sL', '--retry', '3', '-o', dest, url], timeout=900)
    return r.returncode == 0 and have(dest)

def main():
    ids = clip_ids()
    print('clips needed:', len(ids), flush=True)
    missing = []
    for n, ytid in enumerate(ids, 1):
        dest = os.path.join(OUT, ytid + '.mp4')
        if have(dest):
            print('skip', n, ytid, flush=True)
            continue
        ok = from_youtube(ytid, dest)
        if not ok:
            print('youtube failed for', n, ytid, '- trying blogger mirror', flush=True)
            ok = from_blogger(n, dest)
        print('got' if ok else 'MISSING', n, ytid, flush=True)
        if not ok:
            missing.append(ytid)
    if missing:
        print('MISSING CLIPS:', ' '.join(missing), flush=True)
        sys.exit(1)
    print('all clips present', flush=True)
    upscale(ids)

UP_OUT = os.path.join(ROOT, 'desktop-cache', 'clips-1080')

def upscale(ids):
    """Produce Full HD (1920x1080) versions for the desktop build.

    The Menschen film only exists in standard definition (the uploads top out
    at 480p), so these are lanczos upscales, not true HD masters - they are
    what the app ships because the owner asked for Full HD files. Original
    audio is copied unchanged. Cached: only missing outputs are encoded.
    """
    if subprocess.run(['which', 'ffmpeg'], capture_output=True).returncode != 0:
        print('ffmpeg not found - skipping the 1080p upscale step', flush=True)
        return
    os.makedirs(UP_OUT, exist_ok=True)
    for ytid in ids:
        src = os.path.join(OUT, ytid + '.mp4')
        dst = os.path.join(UP_OUT, ytid + '.mp4')
        if have(dst) or not have(src):
            continue
        print('upscaling to 1080p:', ytid, flush=True)
        r = subprocess.run([
            'ffmpeg', '-v', 'error', '-y', '-i', src,
            '-vf', 'scale=1920:1080:flags=lanczos,unsharp=5:5:0.4:5:5:0.0',
            '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20',
            '-pix_fmt', 'yuv420p', '-c:a', 'copy', '-movflags', '+faststart', dst,
        ], timeout=1800)
        if r.returncode != 0 or not have(dst):
            print('UPSCALE FAILED:', ytid, flush=True)
            sys.exit(1)
    print('1080p clips ready in', UP_OUT, flush=True)

if __name__ == '__main__':
    main()
