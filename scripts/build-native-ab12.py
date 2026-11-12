#!/usr/bin/env python3
"""Build native-interactive page data for AB A1.2 (arbeitsbuch A1.2).

Reads src/scan-data/ab-a12/pN.json + the printed page PNG and emits:
- assets/book-crops/native-ab12-pN-K.png  (illustration/photo crops at exact framing)
- src/native-ab12/pages/pN.json           (crops, rects, rules, word styles, dropped words, check boxes)

Manual adjustments live in scripts/native-ab12-overrides.json and are merged last.
"""
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

R = Path(__file__).resolve().parents[1]
BOOK = 'ab-a12'
OUT_DIR = R / 'src/native-ab12/pages'
CROP_DIR = R / 'assets/book-crops'
OVERRIDES = R / 'scripts/native-ab12-overrides.json'


def load(p):
    d = json.load(open(R / f'src/scan-data/{BOOK}/p{p}.json'))
    im = Image.open(R / d['image']).convert('RGB')
    return d, np.asarray(im).astype(np.float32)


def cell_mask(mask, cs=24):
    """Downsample a boolean mask to a cell grid by mean > threshold."""
    H, W = mask.shape
    ny, nx = H // cs, W // cs
    m = mask[: ny * cs, : nx * cs].astype(np.float32)
    m = m.reshape(ny, cs, nx, cs).mean(axis=(1, 3))
    return m


def find_crops(d, A, words):
    """Detect photo/illustration regions and printed rules.
    Returns (crops, rects, lines, drop_word_idx). Flat colored bands that carry
    text become background rects with the words kept selectable on top."""
    W, H = d['width'], d['height']
    r, g, b = A[..., 0], A[..., 1], A[..., 2]
    mx = np.maximum(np.maximum(r, g), b)
    mn = np.minimum(np.minimum(r, g), b)
    sat = mx - mn
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    dark = lum < 110
    mid = lum < 180
    colorful = (sat > 25) & (lum < 250)
    nonwhite = lum < 225

    cs = 24
    col_cells = cell_mask(colorful, cs) > 0.18
    ink_cells = cell_mask(dark, cs) > 0.30
    nw_cells = cell_mask(nonwhite, cs) > 0.55

    photo = (col_cells | (nw_cells & ink_cells)).astype(bool)
    # carve text out: cells carrying a word center (plus one ring) are never
    # photo, so columns of dialogue cannot merge into picture regions
    word_cells = np.zeros_like(photo)
    ny, nx = photo.shape
    for w in words:
        # white-on-color text (no dark ink under the box) must not carve:
        # its cells belong to the band, and the band check keeps the words live
        sub = A[w['y']:w['y'] + w['h'], w['x']:w['x'] + w['w']]
        if sub.size:
            sl = 0.299 * sub[..., 0] + 0.587 * sub[..., 1] + 0.114 * sub[..., 2]
            if float((sl < 120).mean()) < 0.02:
                continue
        cy, cx = int((w['y'] + w['h'] / 2) // cs), int((w['x'] + w['w'] / 2) // cs)
        if 0 <= cy < ny and 0 <= cx < nx:
            word_cells[cy, cx] = True
    photo &= ~ndimage.binary_dilation(word_cells, iterations=1)
    photo = ndimage.binary_closing(photo, iterations=2)
    lab, n = ndimage.label(photo)

    def region_words(x0, y0, x1, y1):
        out = []
        for idx, w in enumerate(words):
            cx, cy = w['x'] + w['w'] / 2, w['y'] + w['h'] / 2
            if x0 <= cx <= x1 and y0 <= cy <= y1:
                out.append(idx)
        return out

    crops = []   # (x,y,w,h)
    rects = []   # (x,y,w,h,'#rrggbb')
    for i in range(1, n + 1):
        ys, xs = np.where(lab == i)
        if len(ys) < 1:
            continue
        y0, y1 = ys.min() * cs, (ys.max() + 1) * cs
        x0, x1 = xs.min() * cs, (xs.max() + 1) * cs
        sub_nw = nonwhite[max(0, y0 - 2):y1 + 2, max(0, x0 - 2):x1 + 2]
        yy, xx = np.where(sub_nw)
        if len(yy) == 0:
            continue
        bx0, by0 = max(0, x0 - 2) + xx.min(), max(0, y0 - 2) + yy.min()
        bx1, by1 = max(0, x0 - 2) + xx.max() + 1, max(0, y0 - 2) + yy.max() + 1
        area = (bx1 - bx0) * (by1 - by0)
        if area < 3200:
            # small saturated icons with no live text inside (number squares,
            # pencil icons) are worth keeping as exact bitmaps
            if area < 400 or (bx1 - bx0) > 90 or (by1 - by0) > 90:
                continue
            subsat = sat[by0:by1, bx0:bx1]
            if float((subsat > 40).mean()) < 0.25:
                continue
            if region_words(bx0, by0, bx1, by1):
                continue
        inside = region_words(bx0, by0, bx1, by1)
        sub = A[by0:by1, bx0:bx1]
        sublum = 0.299 * sub[..., 0] + 0.587 * sub[..., 1] + 0.114 * sub[..., 2]
        bgpix = sub[sublum > 110]
        flat = float(bgpix[..., 0].std() + bgpix[..., 1].std() + bgpix[..., 2].std()) if len(bgpix) else 999.0
        wa = sum(words[i]['w'] * words[i]['h'] for i in inside)
        if inside and flat < 55 and wa / area > 0.04:
            # flat colored band carrying text: background rect, words stay text
            bg = sub.reshape(-1, 3)
            lumf = 0.299 * bg[:, 0] + 0.587 * bg[:, 1] + 0.114 * bg[:, 2]
            band = bg[lumf > 110]  # ignore the glyphs themselves
            med = np.median(band if len(band) else bg, axis=0).astype(int)
            rects.append((int(bx0), int(by0), int(bx1 - bx0), int(by1 - by0),
                          '#%02x%02x%02x' % tuple(med)))
            continue
        if wa / area > 0.55:
            continue  # dense text on a tint, not a picture
        crops.append([int(bx0), int(by0), int(bx1 - bx0), int(by1 - by0)])

    # residual ink: dark pixels not inside any word box or crop
    ink = mid.copy()
    for w in words:
        ink[w['y']:w['y'] + w['h'], w['x']:w['x'] + w['w']] = False
    ink = ndimage.binary_closing(ink, structure=np.ones((3, 9)))
    ink = ndimage.binary_closing(ink, structure=np.ones((9, 3)))  # also merge vertical labels
    lab, n = ndimage.label(ink)
    frags = []
    for i in range(1, n + 1):
        ys, xs = np.where(lab == i)
        if len(ys) < 6:
            continue
        x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
        w, h = x1 - x0, y1 - y0
        if w * h >= 700 and (w >= 26 or h >= 26):
            frags.append([int(x0), int(y0), int(w), int(h)])

    # swallow ink fragments that touch or nearly touch a photo crop (line art
    # outlines around a colored fill) and merge fragments near each other
    def grow(c, f):
        return not (f[0] > c[0] + c[2] + 24 or c[0] > f[0] + f[2] + 24 or
                    f[1] > c[1] + c[3] + 24 or c[1] > f[1] + f[3] + 24)

    changed = True
    while changed:
        changed = False
        keep = []
        for f in frags:
            hit = None
            for c in crops:
                if grow(c, f):
                    x0 = min(c[0], f[0]); y0 = min(c[1], f[1])
                    x1 = max(c[0] + c[2], f[0] + f[2]); y1 = max(c[1] + c[3], f[1] + f[3])
                    uarea = (x1 - x0) * (y1 - y0)
                    inside = region_words(x0, y0, x1, y1)
                    wa = sum(words[i]['w'] * words[i]['h'] for i in inside)
                    # refuse to grow a picture over live text
                    if len(inside) <= 6 and wa / max(uarea, 1) <= 0.15:
                        hit = c
                    break
            if hit is not None:
                x0 = min(hit[0], f[0]); y0 = min(hit[1], f[1])
                x1 = max(hit[0] + hit[2], f[0] + f[2]); y1 = max(hit[1] + hit[3], f[1] + f[3])
                hit[0], hit[1], hit[2], hit[3] = x0, y0, x1 - x0, y1 - y0
                changed = True
            else:
                keep.append(f)
        frags = keep
        # merge fragments that now overlap/touch each other
        merged = True
        while merged:
            merged = False
            for i in range(len(frags)):
                for j in range(i + 1, len(frags)):
                    if grow(frags[i], frags[j]):
                        a, b2 = frags[i], frags[j]
                        x0 = min(a[0], b2[0]); y0 = min(a[1], b2[1])
                        x1 = max(a[0] + a[2], b2[0] + b2[2]); y1 = max(a[1] + a[3], b2[1] + b2[3])
                        frags[i] = [x0, y0, x1 - x0, y1 - y0]
                        del frags[j]
                        merged = True
                        break
                if merged:
                    break
    # only swallow fragments into a crop when the union stays picture-like;
    # a fragment chain bigger than half the page is layout, not an illustration
    crops = [c for c in crops if c[2] * c[3] < 0.55 * W * H]
    crops += [tuple(f) for f in frags]

    # final guards: a crop that is mostly live text is not a picture, and
    # near-duplicate overlapping regions collapse to the larger box
    def texty(c):
        inside = region_words(c[0], c[1], c[0] + c[2], c[1] + c[3])
        if len(inside) > 12:
            return True
        if len(inside) <= 6:
            return False
        wa = sum(words[i]['w'] * words[i]['h'] for i in inside)
        return wa / (c[2] * c[3]) > 0.12

    # a flat word-carrying band is a background rect with live text, not a bitmap
    banded = []
    for c in crops:
        x, y, w, h = c
        if w >= 14 and h >= 14:
            sub = A[y:y + h, x:x + w]
            sl = 0.299 * sub[..., 0] + 0.587 * sub[..., 1] + 0.114 * sub[..., 2]
            bgpix = sub[sl > 110]
            flat = float(bgpix[..., 0].std() + bgpix[..., 1].std() + bgpix[..., 2].std()) if len(bgpix) else 999.0
            inside = region_words(x, y, x + w, y + h)
            wa = sum(words[i]['w'] * words[i]['h'] for i in inside)
            if inside and flat < 55 and wa / (w * h) > 0.04:
                med = np.median(bgpix, axis=0).astype(int)
                rects.append((x, y, w, h, '#%02x%02x%02x' % tuple(med)))
                continue
        banded.append(c)
    crops = [c for c in banded if c[2] >= 14 and c[3] >= 14 and not texty(c)]
    crops.sort(key=lambda c: c[2] * c[3], reverse=True)
    kept = []
    for c in crops:
        dup = False
        for k in kept:
            ix = max(0, min(c[0] + c[2], k[0] + k[2]) - max(c[0], k[0]))
            iy = max(0, min(c[1] + c[3], k[1] + k[3]) - max(c[1], k[1]))
            if ix * iy > 0.6 * c[2] * c[3]:
                dup = True
                break
        if not dup:
            kept.append(c)
    crops = kept

    # printed rules: long thin runs of light ink outside words/crops
    lines = []
    mask = (lum < 215)
    for w in words:
        mask[w['y']:w['y'] + w['h'], w['x']:w['x'] + w['w']] = False
    for (x, y, w, h) in crops:
        mask[y:y + h, x:x + w] = False
    lab, n = ndimage.label(mask)
    for i in range(1, n + 1):
        ys, xs = np.where(lab == i)
        if len(ys) < 30:
            continue
        x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
        w, h = x1 - x0, y1 - y0
        if w >= 90 and h <= 8:
            lines.append((int(x0), int(y0), int(w), int(max(h, 2))))
        elif h >= 90 and w <= 8:
            lines.append((int(x0), int(y0), int(max(w, 2)), int(h)))

    # white-ink words (digits in colored squares, tab labels) need their
    # colored backing: sample the ring around each such word
    for w in words:
        x0, y0, x1, y1 = w['x'], w['y'], w['x'] + w['w'], w['y'] + w['h']
        sub = A[y0:y1, x0:x1]
        if sub.size == 0:
            continue
        sl = 0.299 * sub[..., 0] + 0.587 * sub[..., 1] + 0.114 * sub[..., 2]
        if float((sl < 120).mean()) >= 0.02:
            continue
        py0, py1 = max(0, y0 - 8), min(A.shape[0], y1 + 8)
        px0, px1 = max(0, x0 - 8), min(A.shape[1], x1 + 8)
        ring = A[py0:py1, px0:px1].reshape(-1, 3)
        rl = 0.299 * ring[:, 0] + 0.587 * ring[:, 1] + 0.114 * ring[:, 2]
        ring = ring[rl < 235]
        if len(ring) < 30:
            continue
        med = np.median(ring, axis=0).astype(int)
        sat = int(med.max()) - int(med.min())
        if sat > 30:
            rects.append((px0, py0, px1 - px0, py1 - py0, '#%02x%02x%02x' % tuple(med)))

    crops.sort(key=lambda c: (c[1], c[0]))
    drop = set()
    for idx, w in enumerate(words):
        cx, cy = w['x'] + w['w'] / 2, w['y'] + w['h'] / 2
        for (x, y, cw, ch) in crops:
            if x <= cx <= x + cw and y <= cy <= y + ch:
                drop.add(idx)
                break
    return crops, rects, lines, sorted(drop)


def word_styles(d, A, words, drop):
    """Sample printed color, weight and handwriting per word."""
    fracs = {}
    meds = {}
    for idx, w in enumerate(words):
        if idx in drop:
            continue
        x0, y0, x1, y1 = w['x'], w['y'], w['x'] + w['w'], w['y'] + w['h']
        sub = A[y0:y1, x0:x1]
        if sub.size == 0:
            continue
        lum = 0.299 * sub[..., 0] + 0.587 * sub[..., 1] + 0.114 * sub[..., 2]
        ink = lum < 120
        fracs[idx] = float(ink.mean())
        px = sub[ink]
        meds[idx] = np.median(px, axis=0).astype(int) if len(px) else None
    base = float(np.median([f for f in fracs.values()])) if fracs else 0.15
    styles = {}
    for idx, frac in fracs.items():
        med = meds[idx]
        w = words[idx]
        st = {}
        if frac < 0.02:
            st['c'] = '#ffffff'  # white text on a colored band
        elif med is not None:
            r, g, b = (int(v) for v in med)
            sat = max(r, g, b) - min(r, g, b)
            if sat >= 60 and max(r, g, b) > 60:
                st['c'] = '#%02x%02x%02x' % (r, g, b)
                if b > r + 20 and b > g + 10:
                    st['h'] = 1  # blue handwritten printed answer
            # bold: ink fraction far above the page norm (skip tiny tokens)
            if len(w.get('text', '')) > 2 and frac > max(0.28, base * 2.2):
                st['b'] = 1
        if st:
            styles[idx] = st
    return styles


def check_boxes(d):
    """One Prüfen per group that has at least one answered field, placed under
    the group's lowest field, aligned to its left edge."""
    out = {}
    W = d['width']
    for g in d['groups']:
        flds = [f for f in d['fields'] if f['group'] == g['id'] and f.get('answer') is not None]
        if not flds:
            continue
        x = min(f['x'] for f in flds)
        y = max(f['y'] + f['h'] for f in flds) + 10
        out[g['id']] = {'x': int(x), 'y': int(y), 'w': 150, 'h': 40}
    return out


def build(p):
    d, A = load(p)
    words = d['words']
    crops, rects, lines, drop = find_crops(d, A, words)
    styles = word_styles(d, A, words, set(drop))
    checks = check_boxes(d)

    crop_entries = []
    for k, (x, y, w, h) in enumerate(crops):
        name = f'native-ab12-p{p}-{k}.png'
        Image.open(R / d['image']).convert('RGB').crop((x, y, x + w, y + h)).save(CROP_DIR / name)
        crop_entries.append({'x': x, 'y': y, 'w': w, 'h': h, 'src': f'assets/book-crops/{name}',
                             'alt': f'Originalabbildung Seite {p}'})

    data = {
        'page': p,
        'crops': crop_entries,
        'rects': [{'x': x, 'y': y, 'w': w, 'h': h, 'c': c} for (x, y, w, h, c) in rects],
        'lines': [{'x': x, 'y': y, 'w': w, 'h': h} for (x, y, w, h) in lines],
        'wordStyle': {str(i): s for i, s in styles.items()},
        'drop': drop,
        'checks': checks,
    }

    ov = json.load(open(OVERRIDES)) if OVERRIDES.exists() else {}
    po = ov.get(str(p), {})
    if po.get('cropsReplace'):
        for k, c in enumerate(po['cropsReplace']):
            name = f'native-ab12-p{p}-m{k}.png'
            Image.open(R / d['image']).convert('RGB').crop((c['x'], c['y'], c['x'] + c['w'], c['y'] + c['h'])).save(CROP_DIR / name)
            c.setdefault('src', f'assets/book-crops/{name}')
            c.setdefault('alt', f'Originalabbildung Seite {p}')
        data['crops'] = po['cropsReplace']
    data['crops'] += po.get('cropsAdd', [])
    for c in po.get('cropsAdd', []):
        if 'src' not in c:
            name = f"native-ab12-p{p}-a{len(data['crops'])}.png"
            Image.open(R / d['image']).convert('RGB').crop((c['x'], c['y'], c['x'] + c['w'], c['y'] + c['h'])).save(CROP_DIR / name)
            c['src'] = f'assets/book-crops/{name}'
            c.setdefault('alt', f'Originalabbildung Seite {p}')
    if po.get('dropAdd'):
        data['drop'] = sorted(set(data['drop']) | set(po['dropAdd']))
    if po.get('dropRemove'):
        data['drop'] = sorted(set(data['drop']) - set(po['dropRemove']))
    if po.get('wordStyle'):
        data['wordStyle'].update(po['wordStyle'])
    if po.get('checks'):
        data['checks'].update(po['checks'])
    if po.get('rectsAdd'):
        data['rects'] += po['rectsAdd']
    if po.get('wordsAdd'):
        data['wordsAdd'] = po['wordsAdd']
    if po.get('audioAdd'):
        data['audioAdd'] = po['audioAdd']
    if po.get('linesAdd'):
        data['lines'] += po['linesAdd']
    if po.get('linesRemove'):
        data['linesRemove'] = po['linesRemove']

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    json.dump(data, open(OUT_DIR / f'p{p}.json', 'w'), ensure_ascii=False, separators=(',', ':'))
    return data


if __name__ == '__main__':
    pages = [int(x) for x in sys.argv[1:]] or [p for p in range(6, 106)
             if (R / f'src/scan-data/{BOOK}/p{p}.json').exists()]
    for p in pages:
        data = build(p)
        print(p, 'crops', len(data['crops']), 'lines', len(data['lines']), 'drop', len(data['drop']), 'checks', len(data['checks']))
