#!/usr/bin/env python3
"""Revert NativeAB12 nodes back to HybridScan except verified pages (argv)."""
import json, sys
from pathlib import Path
R = Path(__file__).resolve().parents[1]
keep = set(sys.argv[1:])
for slug in ['ab-a12-l13-16', 'ab-a12-l17-20', 'ab-a12-l21-24']:
    f = R / 'src/lessons' / f'{slug}.json'
    d = json.load(open(f))
    n = 0
    def walk(node):
        global n
        if isinstance(node, list):
            if len(node) == 3 and node[0] == 'NativeAB12' and str(node[1].get('page')) not in keep:
                node[0] = 'HybridScan'
                node[1] = {'book': 'ab-a12', 'page': node[1]['page']}
                n += 1
                return
            for c in node:
                walk(c)
    walk(d)
    def fix(node):
        if isinstance(node, list):
            if len(node) == 3 and node[0] == 'section':
                cl = node[1].get('class', '')
                pg = node[1].get('data-page', '')
                if 'nativeAB12Page' in cl and str(pg) not in keep:
                    node[1]['class'] = cl.replace('nativeAB12Page', 'fidelityScan')
            for c in node:
                fix(c)
    fix(d)
    json.dump(d, open(f, 'w'), ensure_ascii=False, separators=(',', ':'))
    print(slug, n, 'pages reverted')
