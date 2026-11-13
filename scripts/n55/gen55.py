"""Generate native AB A1.2 page 55: spec JSON + erased bg."""
import sys, json
import numpy as np
from PIL import Image
sys.path.insert(0, '/home/sandbox/Menschen-Egyptian-Style/scripts/n56')
from nativeutil import *

P = 55
scan = load_scan(P)
W, H = scan['width'], scan['height']
WORDS = scan['words']
FIRAC = REPO + '/assets/fonts/firasanscond-latin-400.ttf'
F = {f['id']: f for f in scan['fields']}
im = np.asarray(Image.open(f'{REPO}/assets/ab-a12-p55.png').convert('RGB')).astype(int)

items = []
def t(x, y, text, s=None, c='', col=None, b=False, i=False, target=None, path=DROID):
    if s is None:
        s = best_size(text, path, target, lo=12, hi=24) if target else 20
    it = {'k': 't', 'x': x, 'y': y, 't': text, 's': round(s,1)}
    if c: it['c'] = c
    if col: it['col'] = col
    if b: it['b'] = 1
    if i: it['i'] = 1
    items.append(it)
    return it

def field(fid, g, ans, w=None, x=None):
    f = F[fid]
    items.append({'k':'f','id':fid,'x':x if x is not None else f['x'],'y':f['y']+f['h']-1,'w':w or f['w'],'l':f['label'],'a':ans,'g':g})

for w in WORDS:                                   # OCR y-jitter: 'fast' belongs to the y832 line
    if w['text']=='fast' and 818<=w['y']<=833 and w['x']>800: w['y']=832

def ln_words(y, tol=9):
    return [w for w in sorted([w for w in WORDS if abs(w['y']-y)<=tol], key=lambda w:w['x']) if w['x']>=140]

def emit_line(y, breaks=(), tol=9, label=True, gap_split=0, skip=(), s=None, **kw):
    words = [w for w in ln_words(y, tol) if not w.get('_done')]
    for w in words:
        tx = w['text'].rstrip('.').lower()
        if label and w['x'] < 180 and tx in ('a','b','c','d','e','f'):
            t(w['x'], word_baseline(w), w['text'], s=15, col='#828185')
            w['_skip'] = True
        if w['text'] in skip or (w['text'].isdigit() and w['w']<=20):
            w['_skip'] = True
    groups, cur = [], []
    for w in words:
        if w.get('_skip'): continue
        if cur:
            g0, g1 = cur[-1]['x']+cur[-1]['w'], w['x']
            if any(b0 >= g0-6 and b1 <= g1+6 for b0, b1 in breaks) or (gap_split and g1-g0 > gap_split):
                groups.append(cur); cur = []
        cur.append(w)
    if cur: groups.append(cur)
    for g in groups:
        for w in g: w['_done']=True
        x0 = g[0]['x']; x1 = max(w['x']+w['w'] for w in g)
        txt = ' '.join(w['text'] for w in g)
        t(x0, line_baseline(g), txt, s=s, target=None if s else x1-x0, **kw)

# ---------- erase ----------
R = [(118,490,135,512),(118,1038,142,1062)]   # printed a/b labels (native re-render)
for w in WORDS:
    if w['x'] < 140 or w['y'] < 140 or w['y'] > 1310: continue
    if w['text'].isdigit() and w['w']<=20: continue        # card number circles
    R.append((w['x']-2, w['y']-2, w['x']+w['w']+2, w['y']+w['h']+3))
for f in scan['fields']:
    R.append((f['x']-2, f['y']-2, f['x']+f['w']+2, f['y']+f['h']+3))
R.append((148,1180,760,1196))                              # 6b '…' row
make_bg(P, R, f'{REPO}/assets/book-crops/native-ab12-p55-bg.png')
items.append({'k':'a','n':'bg','x':0,'y':0,'w':W,'h':H,'alt':'Seite 55 Hintergrund'})

# sample example-underline colors from card 1
def stroke(x0,y0,x1,y1,kind):
    r = im[y0:y1,x0:x1].reshape(-1,3)
    if kind=='b': m = r[(r[:,2]-r[:,0]>25)&(r[:,2]-r[:,1]>5)]
    else: m = r[(r[:,1]-r[:,0]>15)&(r[:,1]-r[:,2]>10)]
    return np.median(m,0).astype(int) if len(m) else None
print('blue underline:', stroke(225,598,320,608,'b'), 'green:', stroke(258,622,365,634,'g'))

DARK='#1d1d1b'
# ---------- ex 5 ----------
t(150,183,'Wie heißt das Gegenteil? Schreiben Sie.',c='naFiraM',col=DARK,target=389,path=FIRA)
S5 = best_size('sympathisch', DROID, 110, lo=13, hi=24)
for ly, lab, word, wx in [(272,'a','interessant',176),(297,'b','freundlich',176),(323,'c','sympathisch',176),(348,'d','dick',176),(374,'e','glücklich',175)]:
    t(152,ly,lab,s=S5,col='#2b2a28')
    t(wx,ly,word,s=S5)
t(345,348,'schlank /',s=S5)
# field rules measured from scan ink
for fid,x,ry,w in [('p55-5b',344,300,161),('p55-5c',344,326,160),('p55-5d',418,352,174),('p55-5e1',344,377,168),('p55-5e2',531,377,161)]:
    items.append({'k':'f','id':fid,'x':x,'y':ry,'w':w,'l':F[fid]['label'],'a':F[fid]['answer'],'g':'g1'})
items.append({'k':'chk','g':'g1','x':960,'y':330})

# ---------- ex 6 ----------
t(150,461,'Lesen Sie die SMS.',c='naFiraM',col=DARK,target=182,path=FIRA)
t(122,506,'a',s=15,col='#434e95',b=1)
t(154,506,'Markieren Sie die trennbaren Verben blau und die nicht trennbaren Verben grün.',s=17.4,col='#171614')
items.append({'k':'r','x':310,'y':507,'w':207,'h':2,'col':'#6596c4'})
items.append({'k':'r','x':593,'y':507,'w':261,'h':2,'col':'#69bb58'})
# SMS cards: Fira Sans Condensed; scan line pitch ~25.6px, body ~19.5 PIL (18.9 rendered),
# greeting lines (taller band) ~23.3 PIL (22.5 rendered). Baselines snapped to scan grid.
S_BODY = 18.9   # one size for all card text (scan FiraSansCond ~19.5 PIL)
CARDGRID = {   # zone -> baselines
 (140,400,540,745): [575,598,624,654,676,702,728],    # card 1
 (400,700,540,745): [590,615,640,666,691],            # card 3
 (700,960,540,745): [604,630,655,681],                # card 5
 (140,400,745,970): [810,836,862,888,913,939],        # card 2
 (400,700,745,970): [835,861],                        # card 4
 (700,960,745,970): [818,844,869,895,920,946],        # card 6
}
def card(x0,x1,y0,y1):
    ws=[w for w in WORDS if x0<=w['x']<x1 and y0<=w['y']<y1 and not w.get('_done') and not (w['text'].isdigit() and w['w']<=20)]
    cl=[]
    for w in sorted(ws,key=lambda w:w['y']):
        if not cl or w['y']-cl[-1][-1]['y']>9: cl.append([w])
        else: cl[-1].append(w)
    grid = CARDGRID[(x0,x1,y0,y1)]
    assert len(cl)==len(grid), f'card {(x0,y0)}: {len(cl)} lines vs {len(grid)} baselines'
    for i,c in enumerate(cl):
        c=sorted(c,key=lambda w:w['x'])
        groups,cur=[],[]
        for w in c:
            if cur and w['x']-(cur[-1]['x']+cur[-1]['w'])>40: groups.append(cur);cur=[]
            cur.append(w)
        if cur: groups.append(cur)
        for g in groups:
            for w in g: w['_done']=True
            gx=g[0]['x']
            t(gx, grid[i], ' '.join(w['text'] for w in g), s=S_BODY, c='naFiraC', path=FIRAC)
card(140,400,540,745)   # card 1
card(400,700,540,745)   # card 3
card(700,960,540,745)   # card 5
card(140,400,745,970)   # card 2
card(400,700,745,970)   # card 4
card(700,960,745,970)   # card 6
# card1 printed example underlines (redrawn after full erase)
items.append({'k':'r','x':295,'y':601,'w':63,'h':2,'col':'#6596c4'})
items.append({'k':'r','x':164,'y':626,'w':28,'h':2,'col':'#6596c4'})
items.append({'k':'r','x':262,'y':626,'w':91,'h':2,'col':'#69bb58'})
# mk buttons over the 7 student verbs
VERBS = [('p55-m1','entschuldigt.',(254,690,104,18),'g'),('p55-m2','vergessen.',(192,880,84,14),'g'),
         ('p55-m3','eingeladen.',(495,629,93,17),'b'),('p55-m4','bekommen.',(547,849,95,14),'g'),
         ('p55-m5','gefallen?',(774,644,71,18),'g'),('p55-m6','erkannt!',(741,858,65,14),'g'),
         ('p55-m7','mitgenommen.',(810,910,123,17),'b')]
for vid,label,(x,y,w,h),a in VERBS:
    items.append({'k':'mk','id':vid,'x':x-2,'y':y-4,'w':w+4,'h':h+9,'l':label,'a':a,'g':'g2'})
items.append({'k':'chk','g':'g2','x':960,'y':900})

# ---------- 6b ----------
t(123,1060,'b',s=15,col='#434e95',b=1)
t(154,1060,'Sortieren Sie die Partizipien und ergänzen Sie den Infinitiv.',target=519)
t(154,1098,'trennbar',c='naDB',col='#3c3b38',target=83)
t(480,1098,'nicht trennbar',c='naDB',col='#3c3b38',target=140)
for x in (155,481): t(x,1139,'Partizip',s=18,col='#676866')
for x in (275,603): t(x,1139,'Infinitiv',s=18,col='#676866')
# field rows: trennbar 2 rows, nicht trennbar 5 rows
rowsT = [('p55-6b-t1p','eingeladen','p55-6b-t1i','einladen'),('p55-6b-t2p','mitgenommen','p55-6b-t2i','mitnehmen')]
rowsN = [('p55-6b-n1p','entschuldigt','p55-6b-n1i','sich entschuldigen|entschuldigen'),
         ('p55-6b-n2p','vergessen','p55-6b-n2i','vergessen'),
         ('p55-6b-n3p','bekommen','p55-6b-n3i','bekommen'),
         ('p55-6b-n4p','gefallen','p55-6b-n4i','gefallen'),
         ('p55-6b-n5p','erkannt','p55-6b-n5i','erkennen')]
for i,(pid,pa,iid,ia) in enumerate(rowsT):
    y = 1189 + i*26
    items.append({'k':'f','id':pid,'x':155,'y':y,'w':110,'l':'6b trennbar Partizip %d'%(i+1),'a':pa,'g':'g3'})
    items.append({'k':'f','id':iid,'x':275,'y':y,'w':140,'l':'6b trennbar Infinitiv %d'%(i+1),'a':ia,'g':'g3'})
for i,(pid,pa,iid,ia) in enumerate(rowsN):
    y = 1189 + i*26
    items.append({'k':'f','id':pid,'x':481,'y':y,'w':110,'l':'6b nicht trennbar Partizip %d'%(i+1),'a':pa,'g':'g3'})
    items.append({'k':'f','id':iid,'x':603,'y':y,'w':150,'l':'6b nicht trennbar Infinitiv %d'%(i+1),'a':ia,'g':'g3'})
items.append({'k':'chk','g':'g3','x':960,'y':1240})

write_spec(P, {'w':W,'h':H,'items':items})
print('p55 written:', len(items), 'items')
