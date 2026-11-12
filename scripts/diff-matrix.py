#!/usr/bin/env python3
"""Pixel-diff two screenshot matrices. Usage: diff-matrix.py <dirA> <dirB> [--threshold N]
Prints per-pair stats and exits 1 if any pair differs beyond threshold (default 0 pixels)."""
import sys, os
from PIL import Image, ImageChops

a_dir, b_dir = sys.argv[1], sys.argv[2]
threshold = 0
if '--threshold' in sys.argv:
    threshold = int(sys.argv[sys.argv.index('--threshold') + 1])

names = sorted(f for f in os.listdir(a_dir) if f.endswith('.png'))
missing = [f for f in names if not os.path.exists(os.path.join(b_dir, f))]
if missing:
    print('MISSING in B:', missing)
    sys.exit(1)

worst = []
failures = []
for f in names:
    a = Image.open(os.path.join(a_dir, f)).convert('RGB')
    b = Image.open(os.path.join(b_dir, f)).convert('RGB')
    if a.size != b.size:
        failures.append((f, -1, 'size %s vs %s' % (a.size, b.size)))
        continue
    diff = ImageChops.difference(a, b)
    bbox = diff.getbbox()
    if not bbox:
        worst.append((f, 0, 0.0))
        continue
    px = list(diff.getdata())
    changed = sum(1 for p in px if p != (0, 0, 0))
    pct = 100.0 * changed / len(px)
    worst.append((f, changed, pct))
    if changed > threshold:
        failures.append((f, changed, '%.2f%%' % pct))

worst.sort(key=lambda x: -x[1])
print('pairs:', len(names), 'identical:', sum(1 for _, c, _ in worst if c == 0))
for f, c, p in worst[:10]:
    print('  worst:', f, c, '%.2f%%' % p)
if failures:
    print('FAILURES:', len(failures))
    for f in failures[:15]:
        print('  ', f)
    sys.exit(1)
print('ALL CLEAN')
