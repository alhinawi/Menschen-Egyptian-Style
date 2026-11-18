"""Fetch the 24 Film-Stationen clips from the Blogger mirrors (YouTube blocks
datacenter IPs) and make 1920x1080 copies in desktop-cache/clips-1080.
Run from the repo root. Resumable: finished clips are skipped."""
import os, re, subprocess, sys, tempfile, urllib.request, http.cookiejar
from concurrent.futures import ThreadPoolExecutor

ROOT = os.getcwd()
OUT = os.path.join(ROOT, 'desktop-cache', 'clips')
HD = os.path.join(ROOT, 'desktop-cache', 'clips-1080')
os.makedirs(OUT, exist_ok=True)
os.makedirs(HD, exist_ok=True)
src = open(os.path.join(ROOT, 'src', 'components', 'ClipMarkers.tsx'), encoding='utf-8').read()
ids = re.findall(r"'([A-Za-z0-9_-]{11})'", re.search(r"const videos=\[([^\]]+)\]", src).group(1))
PAGES = [('http://matifmarin.blogspot.com/p/menschen-film-stationen-clips.html', 1),
         ('http://matifmarin.blogspot.com/p/menschen-film-stationen-clips-ii.html', 13)]
cj = http.cookiejar.CookieJar()
op = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
op.addheaders = [('User-Agent', 'Mozilla/5.0')]
urls = {}
for page, first in PAGES:
    h = op.open(page, timeout=60).read().decode('utf-8', 'replace')
    for i, tok in enumerate(re.findall(r'https://www\.blogger\.com/video\.g\?token=([^"&]+)', h)):
        v = op.open('https://www.blogger.com/video.g?token=' + tok, timeout=60).read().decode('utf-8', 'replace')
        j = v.find('https://rr'); k = v.find('&quot;', j)
        if j >= 0 and k > j:
            urls[first + i] = v[j:k].replace('\\u0026', '&').replace('\\u003d', '=')
print('urls', len(urls), 'ids', len(ids), flush=True)
jar = os.path.join(tempfile.gettempdir(), 'menschen-cj.txt')
m = http.cookiejar.MozillaCookieJar(jar)
for c in cj:
    m.set_cookie(c)
m.save(ignore_discard=True, ignore_expires=True)

def big(p):
    return os.path.exists(p) and os.path.getsize(p) > 100000

def job(a):
    n, y = a
    d, o = os.path.join(OUT, y + '.mp4'), os.path.join(HD, y + '.mp4')
    if big(o):
        return
    for _ in range(4):
        if big(d):
            break
        if n in urls:
            subprocess.run(['curl', '-sL', '-b', jar, '-A', 'Mozilla/5.0', '--retry', '3', '-o', d,
                            '--max-time', '240', '--speed-limit', '50000', '--speed-time', '20', urls[n]])
    if not big(d):
        print('MISSING', n, y, flush=True)
        return
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', d, '-vf',
                    'scale=1920:1080:flags=lanczos,unsharp=5:5:0.4:5:5:0.0', '-c:v', 'libx264',
                    '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'copy',
                    '-movflags', '+faststart', o])
    print('ok', n, y, flush=True)

with ThreadPoolExecutor(4) as ex:
    list(ex.map(job, enumerate(ids, 1)))
done = sum(1 for y in ids if big(os.path.join(HD, y + '.mp4')))
print('CLIPS-DONE', done, flush=True)
sys.exit(0 if done == len(ids) else 1)
