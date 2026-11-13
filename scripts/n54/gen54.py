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

def radio(fid, name, correct):
    f = F[fid]
    items.append({'k':'d','id':fid,'v':'1','name':name,'a':correct,'x':f['x'],'y':f['y'],'s':24,'l':f['label'],'g':'g3'})

def emit_line(y, breaks=(), tol=10, label=True, **kw):
    """Emit runs for one printed line; breaks = (x0,x1) zones (fields/radios/handwriting)
    that split runs. Row label a-f emitted grey when label=True."""
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
    for g in groups:
        x0 = g[0]['x']; x1 = max(w['x']+w['w'] for w in g)
        txt = ' '.join(w['text'] for w in g).replace('Haare,','Haare.').replace('Brille,','Brille.')
        t(x0, line_baseline(g), txt, target=x1-x0, **kw)

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
t(169,238,'hatte | hat | hatten | war | hat | ist | hatte | hat | haben | waren | hatte',c='naFiraR',col='#696c97',target=554,path=FIRA400)
t(188,396,'Früher …',c='naDB',col='#4d4b4a',target=100)
t(545,396,'Heute …',c='naDB',col='#4d4b4a',target=92)
# row a (handwriting kept in bg: hatte x265-325, hat x625-665)
emit_line(408, breaks=[(178,232),(540,578)])
emit_line(433, breaks=[(244,350)])           # Haare ___ lang.
field('p54-1f0','g1','waren')
for ly, fid, ans, hid, hans in [
 (459,'p54-1f1','war','p54-1h0','ist'),
 (485,'p54-1f2','hatte','p54-1h1','hat'),
 (511,'p54-1f3','hatte','p54-1h2','hat'),
 (537,'p54-1f4','hatten','p54-1h3','haben')]:
    f1,f2 = F[fid],F[hid]
    emit_line(ly, breaks=[(f1['x']-4,f1['x']+f1['w']+4),(f2['x']-4,f2['x']+f2['w']+4)])
    field(fid,'g1',ans); field(hid,'g1',hans)
emit_line(563)                                # nur Fahrräder.
items.append({'k':'chk','g':'g1','x':950,'y':552})

# ---------- ex 2 ----------
items.append({'k':'t','x':166,'y':641,'t':'','s':21.0,'c':'naFiraM','col':DARK,
  'segs':[{'t':'Ergänzen Sie '},{'t':'haben oder sein','b':1},{'t':' im Präteritum.'}]})
t(164,678,'Schau mal, hier sind Fotos von früher:',target=339)
emit_line(693, breaks=[(195,247)])            # Das [hw waren] (a) mein Bruder...
for ly, fids in [(717,['p54-2b','p54-2c','p54-2d']),
                 (743,['p54-2e','p54-2f']),
                 (769,['p54-2g']),
                 (795,['p54-2h','p54-2i']),
                 (821,['p54-2j'])]:
    br=[(F[x]['x']-4,F[x]['x']+F[x]['w']+4) for x in fids]
    emit_line(ly, breaks=br, label=False)
    for x in fids: field(x,'g2',F[x]['answer'])
emit_line(847, label=False)                   # und haben nie mit uns gespielt.
items.append({'k':'chk','g':'g2','x':950,'y':836})

# ---------- ex 3 ----------
t(162,923,'Was passt? Kreuzen Sie an.',c='naFiraM',col=DARK,target=266,path=FIRA)
emit_line(952, breaks=[(562,610),(751,800)])  # row a (printed circles stay in bg)
for ly, lab, pair, extra in [(975,'b',[('p54-3b-traurig',True),('p54-3b-langweilig',False)],[(685,695)]),
                      (1001,'c',[('p54-3c-interessant',False),('p54-3c-glücklich',True)],[]),
                      (1028,'d',[('p54-3d-unfreundlich',True)],[]),
                      (1052,None,[('p54-3d-fröhlich',False)],[]),
                      (1080,'e',[],[]),
                      (1104,None,[('p54-3e-glatt',False),('p54-3e-schlank',True)],[]),
                      (1130,'f',[('p54-3f-seltsam',True),('p54-3f-dick',False)],[(632,644)])]:
    br=[(F[r]['x']-4,F[r]['x']+28) for r,_ in pair]+extra
    emit_line(ly, breaks=br, label=lab is not None)
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
