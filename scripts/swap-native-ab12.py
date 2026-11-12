#!/usr/bin/env python3
"""Swap HybridScan nodes for NativeAB12 in the AB A1.2 lesson JSONs."""
import json
from pathlib import Path
R = Path(__file__).resolve().parents[1]
for slug in ['ab-a12-l13-16', 'ab-a12-l17-20', 'ab-a12-l21-24']:
    f = R / 'src/lessons' / f'{slug}.json'
    d = json.load(open(f))
    n = 0
    def walk(node):
        global n
        if isinstance(node, list):
            if len(node) == 3 and node[0] == 'HybridScan' and node[1].get('book') == 'ab-a12':
                node[0] = 'NativeAB12'
                node[1] = {'page': node[1]['page']}
                n += 1
                return
            for c in node:
                walk(c)
    walk(d)
    def fix(node):
        if isinstance(node, list):
            if len(node) == 3 and node[0] == 'section' and 'fidelityScan' in node[1].get('class', ''):
                node[1]['class'] = node[1]['class'].replace('fidelityScan', 'nativeAB12Page')
            for c in node:
                fix(c)
    fix(d)
    json.dump(d, open(f, 'w'), ensure_ascii=False, separators=(',', ':'))
    print(slug, n, 'pages swapped')
