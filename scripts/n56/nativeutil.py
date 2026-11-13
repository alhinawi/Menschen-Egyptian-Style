"""Shared helpers for native AB A1.2 p56-58: clean erase + font measurement."""
import json, re
import numpy as np
from PIL import Image, ImageFont

REPO = '/home/sandbox/Menschen-Egyptian-Style'
DROID = REPO + '/assets/fonts/droid-serif-400.ttf'
FIRA  = REPO + '/assets/fonts/firasans-latin-500.ttf'
_fc = {}
def font(path, size):
    key = (path, size)
    if key not in _fc:
        _fc[key] = ImageFont.truetype(path, int(round(size*4)))  # 4x for sub-pixel
    return _fc[key]

def textw(text, path, size):
    return font(path, size).getlength(text) / 4.0

def best_size(text, path, target_w, lo=13.0, hi=26.0, step=0.5):
    """Pick the size whose natural width best matches target_w (prefer not exceeding)."""
    best, bestd = None, 1e9
    s = lo
    while s <= hi:
        w = textw(text, path, s)
        d = abs(w - target_w) + (w - target_w if w > target_w else 0) * 2
        if d < bestd:
            best, bestd = s, d
        s += step
    return best

DESC = re.compile(r'[gjpqy,;]')
def word_baseline(w):
    """Estimate text baseline from a scan word box."""
    y, h, t = w['y'], w['h'], w['text']
    if DESC.search(t):
        return y + h - round(h*0.24)
    return y + h - 2

def line_baseline(ws):
    bs = sorted(word_baseline(w) for w in ws)
    return bs[len(bs)//2]

def load_scan(p):
    return json.load(open(f'{REPO}/src/scan-data/ab-a12/p{p}.json'))

def erase(img_arr, rects):
    """Erase rects in-place on an RGB float array using nearest clean paper pixel per column.
    Walk is limited; a ref still dirty after WALK steps counts as missing. Rects may be
    ('fill',(x0,y0,x1,y1),(r,g,b)) to flood with a sampled paper color instead."""
    a = img_arr
    H, W, _ = a.shape
    WALK = 48
    PAPER = np.array([254.0, 253.0, 248.0])
    def dirty(px):
        r, g, b = px
        mx, mn = max(r, g, b), min(r, g, b)
        return mx < 215 or (mx - mn) > 26
    for rect in rects:
        if rect[0] == 'fill':
            _, (x0, y0, x1, y1), col = rect
            a[y0:y1, x0:x1] = np.array(col, dtype=float)
            continue
        (x0, y0, x1, y1) = rect
        x0, y0 = max(0, x0), max(0, y0)
        x1, y1 = min(W, x1), min(H, y1)
        if x1 <= x0 or y1 <= y0:
            continue
        for x in range(x0, x1):
            # reference above
            yt = y0 - 1
            steps = 0
            while yt >= 0 and steps < WALK and dirty(a[yt, x]):
                yt -= 1; steps += 1
            top_ok = yt >= 0 and not dirty(a[yt, x])
            # reference below
            yb = y1
            steps = 0
            while yb < H and steps < WALK and dirty(a[yb, x]):
                yb += 1; steps += 1
            bot_ok = yb < H and not dirty(a[yb, x])
            def cleanmean(rows, fallback):
                keep = [r for r in rows if not dirty(r)]
                return np.mean(keep, axis=0) if keep else fallback
            if not top_ok and not bot_ok:
                ct = cb = PAPER
            elif not top_ok:
                ct = cb = cleanmean(a[yb:min(H, yb+3), x].astype(float), PAPER)
            elif not bot_ok:
                ct = cb = cleanmean(a[max(0, yt-2):yt+1, x].astype(float), PAPER)
            else:
                ct = cleanmean(a[max(0, yt-2):yt+1, x].astype(float), PAPER)
                cb = cleanmean(a[yb:min(H, yb+3), x].astype(float), PAPER)
            n = y1 - y0
            t = np.linspace(0, 1, n)[:, None]
            a[y0:y1, x] = ct[None, :] * (1 - t) + cb[None, :] * t
    return a

def make_bg(page, rects, out):
    im = Image.open(f'{REPO}/assets/ab-a12-p{page}.png').convert('RGB')
    a = np.asarray(im).astype(float)
    erase(a, rects)
    Image.fromarray(np.clip(a, 0, 255).astype('uint8')).save(out)
    return out

def crop(page, box, name):
    im = Image.open(f'{REPO}/assets/ab-a12-p{page}.png').convert('RGB')
    im.crop(box).save(f'{REPO}/assets/book-crops/native-ab12-p{page}-{name}.png')

def write_spec(page, spec):
    p = f'{REPO}/src/native-ab12/range/p{page}.json'
    with open(p, 'w') as f:
        json.dump(spec, f, ensure_ascii=False, indent=1)
    return p
