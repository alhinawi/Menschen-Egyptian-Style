"""Fetch the 24 Film-Stationen clips from the Blogger mirrors (YouTube blocks
datacenter IPs) and make 1920x1080 copies in desktop-cache/clips-1080.
Run from the repo root. Resumable: finished clips are skipped, and a clip only
counts as finished when its download and its 1080p copy pass clipcheck.py."""
import os, re, subprocess, sys, tempfile, threading, time, urllib.request, http.cookiejar
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from clipcheck import raw_ok, output_ok
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
import time

def fetch(opener, url):
    # The mirror answers 429 to datacenter IPs when hit fast: back off and retry.
    for wait in (0, 15, 45, 90, 180):
        time.sleep(wait)
        try:
            return opener.open(url, timeout=60).read().decode('utf-8', 'replace')
        except Exception as e:
            print('retry after', wait, url[:60], e, flush=True)
    return ''

cj = http.cookiejar.CookieJar()
op = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
op.addheaders = [('User-Agent', 'Mozilla/5.0')]
urls = {}
for page, first in PAGES:
    h = fetch(op, page)
    for i, tok in enumerate(re.findall(r'https://www\.blogger\.com/video\.g\?token=([^"&]+)', h)):
        v = fetch(op, 'https://www.blogger.com/video.g?token=' + tok)
        time.sleep(2)
        j = v.find('https://rr'); k = v.find('&quot;', j)
        if j >= 0 and k > j:
            urls[first + i] = v[j:k].replace('\\u0026', '&').replace('\\u003d', '=')
print('urls', len(urls), 'ids', len(ids), flush=True)
jar = os.path.join(tempfile.gettempdir(), 'menschen-cj.txt')
m = http.cookiejar.MozillaCookieJar(jar)
for c in cj:
    m.set_cookie(c)
m.save(ignore_discard=True, ignore_expires=True)

STOP = threading.Event()  # set on a throttle or challenge: no further requests are made
STOP_CODES = {401, 403, 407, 429, 451, 503}

def fetch(url, d):
    """One curl attempt. Returns the HTTP status (0 when curl produced none).
    -f keeps an error page out of the file, so -C - never resumes onto HTML."""
    r = subprocess.run(['curl', '-sL', '-f', '-b', jar, '-A', 'Mozilla/5.0', '-C', '-', '-o', d,
                        '-w', '%{http_code}', '--max-time', '1500', '--speed-limit', '1500',
                        '--speed-time', '90', url], capture_output=True, text=True)
    try:
        return int(r.stdout.strip()[-3:])
    except ValueError:
        return 0

def job(a):
    n, y = a
    d, o = os.path.join(OUT, y + '.mp4'), os.path.join(HD, y + '.mp4')
    if output_ok(o, d):
        return
    for attempt in range(5):
        if STOP.is_set() or raw_ok(d):
            break
        if n in urls:
            code = fetch(urls[n], d)
            if code in STOP_CODES:
                STOP.set()
                print('THROTTLED', n, y, code, '- stopping all requests', flush=True)
                break
            if not raw_ok(d):
                time.sleep(5 * (attempt + 1))  # slow down between retries of a cut transfer
    if not raw_ok(d):
        print('MISSING', n, y, flush=True)
        return
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', d, '-vf',
                    'scale=1920:1080:flags=lanczos,unsharp=5:5:0.4:5:5:0.0', '-c:v', 'libx264',
                    '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'copy',
                    '-movflags', '+faststart', o])
    if output_ok(o, d):
        print('ok', n, y, flush=True)
    else:
        print('BAD-OUTPUT', n, y, flush=True)

with ThreadPoolExecutor(4) as ex:
    list(ex.map(job, enumerate(ids, 1)))
done = sum(1 for y in ids if output_ok(os.path.join(HD, y + '.mp4'), os.path.join(OUT, y + '.mp4')))
print('CLIPS-DONE', done, flush=True)
sys.exit(0 if done == len(ids) else 1)
