#!/usr/bin/env python3
"""Draft generator: AB A1.2 pages 31-46 scan-data -> NativeAB12P31to46.tsx sections.

Emits positioned text/field/dot/check/art calls per page. Titles, word banks,
side labels, footers and artwork are finished in a manual review pass.
"""
import json
import re
from pathlib import Path

import numpy as np
from PIL import Image

R = Path(__file__).resolve().parents[1]
PAGES = list(range(31, 47))


def esc(t):
    return t.replace('\\', '\\\\').replace("'", "\\'")


def load(p):
    scan = json.load(open(R / f'src/scan-data/ab-a12/p{p}.json'))
    gen = json.load(open(R / f'src/native-ab12/pages/p{p}.json'))
    img = np.asarray(Image.open(R / scan['image']).convert('RGB')).astype(np.float32)
    return scan, gen, img


def line_color(img, x, y, w, h):
    sub = img[max(0, y - 1):y + h + 1, max(0, x - 1):x + w + 1].reshape(-1, 3)
    lum = sub @ np.array([0.299, 0.587, 0.114])
    ink = sub[lum < 200]
    if len(ink) < 8:
        return '#7a7a7a'
    med = np.median(ink, axis=0).astype(int)
    return '#%02x%02x%02x' % tuple(med)


def group_lines(words):
    if not words:
        return []
    pitch = max(16.0, sorted(w['h'] for w in words)[len(words) // 2] * 1.5)
    ws = sorted(words, key=lambda w: (w['y'] + w['h'] / 2, w['x']))
    lines = []
    for w in ws:
        cy = w['y'] + w['h'] / 2
        best = None
        for ln in lines:
            d = abs(cy - ln['cy'])
            if d <= 0.45 * pitch and (best is None or d < best[0]):
                best = (d, ln)
        if best is None:
            lines.append({'words': [w], 'y0': w['y'], 'y1': w['y'] + w['h'], 'h': w['h'], 'cy': cy})
        else:
            ln = best[1]
            ln['words'].append(w)
            ln['y0'] = min(ln['y0'], w['y'])
            ln['y1'] = max(ln['y1'], w['y'] + w['h'])
            ln['cy'] = sum(x['y'] + x['h'] / 2 for x in ln['words']) / len(ln['words'])
            ln['h'] = sorted([x['h'] for x in ln['words']])[len(ln['words']) // 2]
    for ln in lines:
        ln['words'].sort(key=lambda w: w['x'])
    lines.sort(key=lambda ln: ln['y0'])
    return lines


def size_class(ln):
    h = ln['h']
    span = ln['words'][-1]['x'] + ln['words'][-1]['w'] - ln['words'][0]['x']
    if h >= 20 and span >= 120 and ln['y0'] < 140:
        return 'naHeadline'
    if h >= 20:
        return 'naBold'
    if h >= 13:
        return ''
    if h >= 11:
        return 'naS20'
    return 'naSmall'


def segments(ln, cuts):
    """Split a line into x-ordered segments at big gaps and at field boxes."""
    out = []
    cur = []
    for w in ln['words']:
        if cur:
            gap = w['x'] - (cur[-1]['x'] + cur[-1]['w'])
            crossed = any(cur[-1]['x'] + cur[-1]['w'] < cx + 6 and w['x'] > cx - 6 and cur[-1]['x'] + cur[-1]['w'] <= cx + 40 for cx in cuts if cx > cur[-1]['x'] and cx < w['x'] + 1)
            if gap > 46 or any(cur[-1]['x'] + cur[-1]['w'] - 4 <= cx < w['x'] + 4 for cx in cuts):
                out.append(cur)
                cur = []
        cur.append(w)
    if cur:
        out.append(cur)
    return out


def gen_page(p):
    scan, gen, img = load(p)
    drop = set(gen.get('drop', []))
    styles = gen.get('wordStyle', {})
    words = [w for i, w in enumerate(scan['words']) if i not in drop]
    out = []
    # artwork crops: keep real pictures, skip number squares / text fragments
    for c in gen.get('crops', []):
        x, y, w, h = c['x'], c['y'], c['w'], c['h']
        name = c['src'].split(f'native-ab12-p{p}-')[1].replace('.png', '')
        is_tab = x > 880 and y < 150 and w > 50 and h > 50
        if not is_tab and (w * h < 12000 or (h < 46 and w / max(h, 1) > 2.2)):
            continue
        out.append(f"  {{art('{name}',{x},{y},{w},{h})}}")
    # flat color bands
    for r in gen.get('rects', []):
        out.append(f"  {{rect({r['x']},{r['y']},{r['w']},{r['h']},'{r['c']}')}}")
    # printed rules
    removed = gen.get('linesRemove', [])

    def line_removed(l):
        return any(abs(l['x'] - r['x']) < 12 and abs(l['y'] - r['y']) < 12 for r in removed)

    for l in gen.get('lines', []):
        if line_removed(l):
            continue
        c = line_color(img, l['x'], l['y'], l['w'], l['h'])
        out.append(f"  {{lin({l['x']},{l['y']},{l['w']},{l['h']},'{c}')}}")
    # text
    fields = scan['fields']
    for ln in group_lines(words):
        ws = ln['words']
        cls = size_class(ln)
        footer = ln['y0'] > 1340
        cuts = [f['x'] for f in fields if f['y'] - 6 <= ln['y1'] and f['y'] + f['h'] + 6 >= ln['y0']]
        for seg in segments(ln, cuts):
            t = ' '.join(w['text'] for w in seg)
            x = seg[0]['x']
            y = ln['y0']
            wdt = seg[-1]['x'] + seg[-1]['w'] - x
            c = cls
            if footer:
                c = 'naFooter'
            else:
                c = (cls + ' naNw').strip()
            yy = y if c == 'naFooter' else y - 7
            out.append(f"  {{text({x},{yy},{wdt},'{esc(t)}'{',' + repr(c) if c else ''})}}".replace('"', "'"))
    for wa in gen.get('wordsAdd', []):
        out.append(f"  {{text({wa['x']},{wa['y'] - 7},{wa['w']},'{esc(wa['text'])}')}}")
    # fields
    for f in scan['fields']:
        if f['kind'] == 'radio':
            out.append(f"  {{dot('{f.get('name', f['id'])}','{esc(f['value'])}',{f['x']},{f['y']},'{esc(f['label'])}')}}")
        elif f['kind'] == 'checkbox':
            out.append(f"  {{dot('{f['id']}','true',{f['x']},{f['y']},'{esc(f['label'])}',true)}}")
        else:
            out.append(f"  {{field('{f['id']}',{f['x']},{f['y'] - 9},{f['w']},'{esc(f['label'])}')}}")
    # audio
    for a in scan.get('audio', []):
        out.append(f"  {{audio('{a['src']}',{a['x']},{a['y']},'{esc(a['label'])}')}}")
    # checks
    gids = [g['id'] for g in scan['groups']]
    for n, (gid, box) in enumerate(gen.get('checks', {}).items(), 1):
        answers = {}
        for f in scan['fields']:
            if f['group'] != gid or f.get('answer') is None:
                continue
            if f['kind'] == 'radio':
                if f['answer'] == 'true':
                    answers[f.get('name', f['id'])] = f['value']
            else:
                answers[f['id']] = f['answer']
        ajs = ','.join(f"'{esc(k)}':'{esc(v)}'" for k, v in answers.items())
        out.append(f"  {{check('{p}-{gids.index(gid) + 1}',{box['x']},{box['y']},{{{ajs}}})}}")
    body = '\n'.join(out)
    return f" {{page==='{p}'&&<>\n{body}\n </>}}"


HEADER = """import {usePageReset} from '../exercises/usePageReset';
import {useLayoutEffect,useRef,useState} from 'react';
import '../components/native-ab12.css';

function Words({text}:{text:string}){return <>{text.split(/(\\s+)/).map((w,i)=>/\\p{L}/u.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-word={w.replace(/^[^\\p{L}]+|[^\\p{L}]+$/gu,'')} data-phrase={text}>{w}</span>:w)}</>}
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\\s+/g,' ');

export function NativeAB12P31to46({page}:{page:string}){
 const W=1072, H=1449;
 const root=useRef<HTMLDivElement>(null),player=useRef<HTMLAudioElement>(null);
 const [scale,ss]=useState(.6);const key='native-ab12-'+page;
 const [values,sv]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});
 const [results,sr]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=root.current!;const obs=new ResizeObserver(()=>ss(Math.min(el.clientWidth/W,(el.clientHeight-38)/H)));obs.observe(el);return ()=>obs.disconnect()},[]);
 usePageReset(page,key,()=>{sv({});sr({})});
 const set=(id:string,v:string)=>{const n={...values,[id]:v};sv(n);localStorage.setItem(key,JSON.stringify(n))};
 const text=(x:number,y:number,w:number,t:string,cls='')=><div className={'naText '+cls} style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const rect=(x:number,y:number,w:number,h:number,c:string)=><div style={{position:'absolute',left:x,top:y,width:w,height:h,background:c}}/>;
 const lin=(x:number,y:number,w:number,h:number,c:string)=><div style={{position:'absolute',left:x,top:y,width:w,height:h,background:c}}/>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><img className="naArt" src={`assets/book-crops/native-ab12-p${page}-${name}.png`} alt={'Originalillustration '+name} style={{left:x,top:y,width:w,height:h}}/>;
 const field=(id:string,x:number,y:number,w:number,label:string,cls='')=><input className={'naField '+cls} aria-label={label} data-native-field={id} style={{left:x,top:y,width:w}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>;
 const rule=(x:number,y:number,w:number)=><div className="naRule" style={{left:x,top:y,width:w}}/>;
 const dot=(id:string,value:string,x:number,y:number,label:string,checkbox=false)=><input className="naDot" type={checkbox?'checkbox':'radio'} aria-label={label} name={key+'-'+id} checked={checkbox?values[id]==='true':values[id]===value} onChange={e=>set(id,checkbox?String(e.target.checked):value)} style={{left:x,top:y}}/>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="naCheck" data-check={id} style={{left:x,top:y}}><button onClick={()=>sr({...results,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(v=>normalize(v)===normalize(values[k]||(a==='false'?'false':''))))})}>Prüfen ✓</button><output aria-live="polite">{id in results?(results[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const title=(n:string,x:number,y:number,w:number,t:string,cls='')=><div className={'naTitle '+cls} style={{left:x,top:y,width:w}}><b>{n}</b><Words text={t}/></div>;
 const kb=(x:number,y:number,t:string)=><div className="naKB" style={{left:x,top:y}}>{t}</div>;
 const audio=(src:string,x:number,y:number,label:string)=><button className="naAudio" style={{left:x,top:y}} aria-label={'Originalaudio '+label+' abspielen'} onClick={()=>{if(player.current){player.current.src=src;player.current.play().catch(()=>{})}}}>▶ {label}</button>;

 return <div className="nativeAB12" ref={root} data-native-ab12={page}><style>{"@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-400.woff2') format('woff2');font-weight:400}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-700.woff2') format('woff2');font-weight:700}"}</style><div className="naCanvas" style={{width:W,height:H,transform:`translate(-50%,-50%) scale(${scale})`}}>
"""

FOOTER = """ </div><audio ref={player} className="naPlayer"/></div>;
}
"""


def main():
    sections = [gen_page(p) for p in PAGES]
    out = HEADER + '\n'.join(sections) + '\n' + FOOTER
    target = R / 'src/native-ab12/NativeAB12P31to46.tsx'
    target.write_text(out)
    print('wrote', target, len(out), 'bytes')


if __name__ == '__main__':
    main()
