"""Generate native AB A1.2 page 54: spec JSON + erased bg."""
import sys, json
sys.path.insert(0, '/home/sandbox/Menschen-Egyptian-Style/scripts/n56')
from nativeutil import *

P = 54
scan = load_scan(P)
W, H = scan['width'], scan['height']
WORDS = scan['words']
F = {f['id']: f for f in scan['fields']}

items = []
def t(x, y, text, s=None, c='', col=None, b=False, target=None, path=DROID):
    if s is None:
        s = best_size(text, path, target, lo=13, hi=24) if target else 20
    it = {'k': 't', 'x': x, 'y': y, 't': text, 's': round(s,1)}
    if c: it['c'] = c
    if col: it['col'] = col
    if b: it['b'] = 1
    items.append(it)
    return it

def field(fid, g, ans):
    f = F[fid]
    items.append({'k':'f','id':fid,'x':f['x'],'y':f['y']+f['h']-1,'w':f['w'],'l':f['label'],'a':ans,'g':g})

RINGPOS = {'p54-3b-traurig':(422,979),'p54-3b-langweilig':(542,979),
 'p54-3c-interessant':(652,1006),'p54-3c-glücklich':(807,1005),
 'p54-3d-unfreundlich':(734,1032),'p54-3d-fröhlich':(195,1056),
 'p54-3e-glatt':(371,1106),'p54-3e-schlank':(473,1108),
 'p54-3f-seltsam':(435,1134),'p54-3f-dick':(557,1134)}   # detected scan ring centers
def radio(fid, name, correct):
    f = F[fid]
    cx, cy = RINGPOS.get(fid, (f['x']+12, f['y']+12))
    items.append({'k':'d','id':fid,'v':'1','name':name,'a':correct,'x':cx-9,'y':cy-9,'s':18,'l':f['label'],'g':'g3'})

def emit_line(y, breaks=(), tol=10, label=True, s=None, **kw):
    """Emit runs for one printed line; breaks = (x0,x1) zones (fields/radios/handwriting)
    that split runs. Row label a-f emitted grey when label=True.
    s='auto': one uniform size for the whole line, fitted so word runs + break
    widths span the printed line width (no per-run size jitter)."""
    words = [w for w in ln_words(y, tol)]
    for w in words:
        tx = w['text']
        if label and w['x'] < 180 and tx.rstrip('.').lower() in ('a','b','c','d','e','f','c'):
            t(w['x'], word_baseline(w), {'C':'c'}.get(tx,tx), s=15, col='#828185')
            continue
        w['_skip'] = False
    groups, cur = [], []
    for w in words:
        if w.get('_skip') or (label and w['x'] < 180 and w['text'].rstrip('.').lower() in ('a','b','c','d','e','f')):
            continue
        if cur:
            g0, g1 = cur[-1]['x']+cur[-1]['w'], w['x']
            if any(b0 >= g0-6 and b1 <= g1+6 for b0, b1 in breaks):
                groups.append(cur); cur = []
        cur.append(w)
    if cur: groups.append(cur)
    us = s
    if s == 'auto':
        allws = [w for g in groups for w in g]
        if allws:
            x0 = groups[0][0]['x']; x1 = max(w['x']+w['w'] for w in allws)
            bw = sum(min(b1,x1)-max(b0,x0) for b0,b1 in breaks if b1 > x0 and b0 < x1)
            txt = ' '.join(w['text'] for w in allws)
            us = best_size(txt, DROID, max(20, x1-x0-bw), lo=13, hi=24)
    allws = [w for g in groups for w in g]
    rb = line_baseline(allws) if allws else 0   # ONE baseline for the whole row
    for g in groups:
        x0 = g[0]['x']; x1 = max(w['x']+w['w'] for w in g)
        txt = ' '.join(w['text'] for w in g).replace('Haare,','Haare.').replace('Brille,','Brille.')
        t(x0, rb, txt, s=us, target=None if us else x1-x0, **kw)

def ln_words(y, tol=10):
    return [w for w in sorted([w for w in WORDS if abs(w['y']-y)<=tol], key=lambda w:w['x']) if w['x']>=160]

# ---------- erase ----------
R = []
for w in WORDS:
    if w['x'] < 160 or w['y'] < 150 or w['y'] > 1340: continue
    R.append((w['x']-2, w['y']-2, w['x']+w['w']+2, w['y']+w['h']+3))
for f in scan['fields']:
    R.append((f['x']-2, f['y']-2, f['x']+f['w']+2, f['y']+f['h']+3))
make_bg(P, R, f'{REPO}/assets/book-crops/native-ab12-p54-bg.png')
items.append({'k':'a','n':'bg','x':0,'y':0,'w':W,'h':H,'alt':'Seite 54 Hintergrund'})

DARK='#1d1d1b'
# ---------- ex 1 ----------
t(166,196,'Das war Herbert früher. Das ist er heute. Ordnen Sie zu.',c='naFiraM',col=DARK,target=552,path=FIRA)
_bank='hatte | hat | hatten | war | hat | ist | hatte | hat | haben | waren | hatte'
SBANK = round(best_size(_bank,FIRA400,552,lo=13,hi=24)*0.97,1)   # stroke removed: refit (render ends at scan 722)
items.append({'k':'t','x':169,'y':236,'t':'','s':SBANK,'c':'naBank54','col':'#696c97',
 'segs':[{'t':'hatte','c':'naStrike54'},{'t':' | '},{'t':'hat','c':'naStrike54'},{'t':' | hatten | war | hat | ist | hatte | hat | haben | waren | hatte'}]})
t(193,390,'Früher …',c='naDB',col='#353331',s=19.5)
t(551,390,'Heute …',c='naDB',col='#353331',s=19.5)
# rows hand-placed word-per-word at scan ink x, one size (scan body ~18.3 PIL -> 17.7 browser)
S1 = 17.7
for x,ly,lab in [(165,415,'a'),(164,468,'b'),(164,493,'c'),(165,518,'d'),(164,544,'e')]:
    t(x,ly,lab,s=18.5,col='#434240')   # scan letters: core ink ~#40, ascender ~14-16px
for ly,pairs in [(415,[(233,'Herbert'),(308,'Locken'),(375,'und'),(415,'seine')]),
                 (441,[(189,'Haare'),(355,'lang.')]),
                 (468,[(297,'er'),(320,'sehr'),(363,'dünn.')]),
                 (493,[(297,'er'),(320,'eine'),(364,'Brille.')]),
                 (518,[(297,'er'),(320,'einen'),(376,'Bart.')]),
                 (544,[(297,'er'),(320,'und'),(360,'seine'),(412,'Freundin')]),
                 (569,[(227,'nur Fahrräder.')]),
                 (415,[(579,'er'),(602,'kurze'),(658,'Haare.')]),
                 (468,[(660,'er'),(683,'ein'),(716,'bisschen'),(797,'dick.')]),
                 (493,[(660,'er'),(682,'keine'),(737,'Brille.')]),
                 (518,[(660,'er'),(683,'keinen'),(750,'Bart.')]),
                 (544,[(660,'er'),(683,'und'),(723,'seine'),(774,'Frau'),(820,'ein'),(853,'Auto.')])]:
    for x,txt in pairs: t(x,ly,txt,s=S1)
# field rules measured from scan ink (y = printed rule, x/w = rule extent)
RULES1 = {'p54-1f0':(246,444,101,'waren'),'p54-1f1':(188,470,101,'war'),'p54-1h0':(551,471,101,'ist'),
 'p54-1f2':(188,496,102,'hatte'),'p54-1h1':(551,497,101,'hat'),
 'p54-1f3':(187,522,102,'hatte'),'p54-1h2':(550,522,101,'hat'),
 'p54-1f4':(188,548,101,'hatten'),'p54-1h3':(550,548,102,'haben')}
for fid,(x,ry,w,ans) in RULES1.items():
    items.append({'k':'f','id':fid,'x':x,'y':ry,'w':w,'l':F[fid]['label'],'a':ans,'g':'g1'})
items.append({'k':'chk','g':'g1','x':950,'y':552})

# ---------- ex 2 ----------
items.append({'k':'t','x':166,'y':641,'t':'','s':21.0,'c':'naFiraM','col':DARK,
  'segs':[{'t':'Ergänzen Sie '},{'t':'haben oder sein','i':1,'w':400},{'t':' im Präteritum.'}]})
t(164,678,'Schau mal, hier sind Fotos von früher:',s=17.9)
emit_line(687, breaks=[(195,247)], s=18.0)    # Das [hw waren] (a) mein Bruder...
RULES2 = {'p54-2b':(164,729,122,'war'),'p54-2c':(405,729,129,'war'),'p54-2d':(814,730,129,'war'),
 'p54-2e':(335,755,129,'hatte'),'p54-2f':(705,756,129,'war'),'p54-2g':(599,781,128,'waren'),
 'p54-2h':(244,806,130,'hatten'),'p54-2i':(822,808,129,'war'),'p54-2j':(619,833,90,'waren')}   # all re-measured from scan rule ink
for fid,(x,ry,w,ans) in RULES2.items():
    items.append({'k':'f','id':fid,'x':x,'y':ry,'w':w,'l':F[fid]['label'],'a':ans,'g':'g2'})
for ly, fids in [(711,['p54-2b','p54-2c','p54-2d']),
                 (738,['p54-2e','p54-2f']),
                 (764,['p54-2g']),
                 (790,['p54-2h','p54-2i']),
                 (821,['p54-2j'])]:
    br=[(RULES2[x][0]-4,RULES2[x][0]+RULES2[x][2]+4) for x in fids]
    emit_line(ly, breaks=br, label=False, s=18.0)
emit_line(847, label=False, s=18.0)           # und haben nie mit uns gespielt.
items.append({'k':'chk','g':'g2','x':950,'y':836})

# ---------- ex 3 ----------
t(162,923,'Was passt? Kreuzen Sie an.',c='naFiraM',col=DARK,target=266,path=FIRA)
emit_line(944, breaks=[(562,610),(751,800)], s=18.0)  # row a (printed circles stay in bg)
for ly, lab, pair, extra in [(969,'b',[('p54-3b-traurig',True),('p54-3b-langweilig',False)],[(685,695)]),
                      (996,'c',[('p54-3c-interessant',False),('p54-3c-glücklich',True)],[]),
                      (1022,'d',[('p54-3d-unfreundlich',True)],[]),
                      (1048,None,[('p54-3d-fröhlich',False)],[]),
                      (1074,'e',[],[]),
                      (1098,None,[('p54-3e-glatt',False),('p54-3e-schlank',True)],[]),
                      (1124,'f',[('p54-3f-seltsam',True),('p54-3f-dick',False)],[(632,644)])]:
    br=[(F[r]['x']-4,F[r]['x']+28) for r,_ in pair]+extra
    emit_line(ly, breaks=br, label=lab is not None, s=18.0)
    for r,c in pair: radio(r,'p54-'+r.split('-')[1],c)
items.append({'k':'chk','g':'g3','x':955,'y':1115})

# ---------- ex 4 ----------
t(163,1206,'Suchen Sie in einer Zeitschrift oder im Internet Fotos von drei Frauen',c='naFiraM',col=DARK,target=696,path=FIRA)
t(163,1232,'oder drei Männern.',c='naFiraM',col=DARK,target=190,path=FIRA)
t(164,1273,'Beschreiben Sie die Frauen/Männer auf drei Kärtchen.',target=474)
t(164,1299,'Ihre Partnerin / Ihr Partner rät: Welche Beschreibung',target=467)
t(164,1325,'passt zu welchem Foto?',target=204)

write_spec(P, {'w':W,'h':H,'items':items})
print('p54 written:', len(items), 'items')
