"""Generate native AB A1.2 page 58 (TEST): spec JSON + erased bg + script art crops."""
import sys, json, re
sys.path.insert(0, '/home/sandbox/Menschen-Egyptian-Style/scripts/n56')
from nativeutil import *
import numpy as np
from PIL import Image

P = 58
scan = load_scan(P)
W, H = scan['width'], scan['height']
words = scan['words']
DROID700 = REPO + '/assets/fonts/droid-serif-700.woff2'

SCANRGB = np.asarray(Image.open(f'{REPO}/assets/ab-a12-p{P}.png').convert('RGB')).astype(int)
DRK = (SCANRGB[:,:,0]<150)&(SCANRGB[:,:,1]<150)&(SCANRGB[:,:,2]<150)
BLU = (SCANRGB[:,:,2]-SCANRGB[:,:,0]>25)&(SCANRGB[:,:,2]>110)

def runs(y0,y1,x0,x1,mask=DRK,gap=16,minw=3):
    prof = mask[y0:y1,x0:x1].sum(axis=0) > 1
    out=[]; s=None
    for i,v in enumerate(prof):
        if v and s is None: s=i
        if not v and s is not None:
            if i-s>=minw: out.append((x0+s,x0+i))
            s=None
    if s is not None: out.append((x0+s,x1))
    mg=[]
    for r in out:
        if mg and r[0]-mg[-1][1]<=gap: mg[-1]=(mg[-1][0],r[1])
        else: mg.append(list(r))
    return [tuple(r) for r in mg]

items = []
def t(x, y, text, s=None, c='', col=None, target=None, path=DROID, b=False):
    if s is None:
        s = best_size(text, path, target, lo=13, hi=24) if target else 18.5
    it = {'k':'t','x':round(x),'y':round(y),'t':text,'s':s}
    if c: it['c']=c
    if col: it['col']=col
    if b: it['b']=1
    items.append(it); return it

def base(y0,y1,x0,x1):
    ws=[w for w in words if w['y']+w['h']/2>=y0 and w['y']+w['h']/2<y1 and w['x']>=x0 and w['x']+w['w']<=x1+6]
    return line_baseline(ws) if ws else y1-4

R = []  # erase rects
def erase_line(y0,y1,x0,x1):
    R.append((x0,y0,x1,y1+4))

flds = {f['id']:f for f in scan['fields']}
def field(fid, y0, y1, x_override=None, sl=False):
    f = flds[fid]
    x = x_override if x_override is not None else f['x']
    it = {'k':'f','id':fid,'x':x,'y':f['y']+18,'w':f['w']+4,
                  'l':fid.replace('p58-','').replace('b',' b').replace('c',' c').replace('d',' d').replace('e',' e').replace('f',' f').replace('g',' g').replace('a',' a'),
                  'a':f['answer'],'g':f['group']}
    if sl: it['c']='sl'
    items.append(it)

def segs(y0,y1,x0,x1,parts,keep=None):
    """parts: ('t',text) | ('f',fieldid) | ('art',name). Position text parts by consuming
    scan words whose concatenation matches the part text (blanks produce no words)."""
    ws=[w for w in words if w['y']+w['h']/2>=y0 and w['y']+w['h']/2<y1 and w['x']+w['w']/2>=x0 and w['x']+w['w']/2<x1]
    ws.sort(key=lambda w: w['x'])
    bl = base(y0,y1,x0,x1)
    wi = 0
    def key(s): return re.sub(r'\s','',s).replace('–','-').replace('—','-')
    for pi,p in enumerate(parts):
        if p[0]=='t':
            tk = key(p[1]); acc=''; x0w=None; x1w=None
            while wi < len(ws) and len(acc) < len(tk):
                w = ws[wi]
                acc += key(w['text'])
                if x0w is None: x0w = w['x']
                x1w = w['x']+w['w']
                wi += 1
                if acc == tk: break
            if acc != tk:
                print(f'WARN band {y0}: part {p[1]!r} matched {acc!r}')
            if x0w is not None:
                tw = x1w-x0w
                if pi+1 < len(parts) and parts[pi+1][0] == 'h' and len(parts[pi+1][1]) <= 2:
                    tw -= 6
                t(x0w, bl, p[1], target=tw)
        elif p[0]=='h':
            rs = runs(y0,y1,p[2],p[3])
            if rs:
                xoff = 0
                t(rs[0][0]+xoff, bl, p[1], s=18.5)
            else:
                print(f'WARN h-window empty: {p}')
        elif p[0]=='f':
            field(p[1], y0, y1, sl=(len(p)>2 and p[2]=='sl'))
            fbox = flds[p[1]]
            while wi < len(ws) and ws[wi]['x']+ws[wi]['w']/2 < fbox['x']+fbox['w']+2:
                wi += 1
        elif p[0]=='art':
            pass
    spans = [(x0,x1)]
    for ka,kb in (keep or []):
        spans = [(a,b) for a,b in spans for a,b in [(a,min(b,ka)),(max(a,kb),b)] if b-a>2]
    for a,b in spans:
        erase_line(y0,y1,a,b)

# ---------- titles (badges stay in bg) ----------
def title(y0,y1,text,x0=158,x1=975):
    rs = runs(y0,y1,x0,x1)
    assert rs, f'title band {y0} empty'
    x_a,x_b = rs[0][0], rs[-1][1]
    bl = base(y0,y1,x0,x1)
    t(x_a, bl, text, c='naDB', s=best_size(text,DROID700,x_b-x_a,lo=13,hi=24), path=DROID700)
    erase_line(y0,y1,x0,x1)

title(160,190,'Ergänzen Sie das Gespräch.')
title(396,420,'Ergänzen Sie haben und sein in der richtigen Form.')
title(628,654,'Ordnen Sie zu und ergänzen Sie die Verben in der richtigen Form.')
title(928,954,'Ergänzen Sie das Gespräch.')

# ---------- ex1 (marker squares x157-172 stay; Punkte x890+ stays on L6) ----------
segs(204,226,180,500,[('t','Wie sieht Sarah van der Ahe aus?')])
segs(228,250,180,945,[('t','Sie steht am Eingang. Sie ist'),('h','s',436,450),('art','chlan'),('h','k',515,530),
                      ('t','(a)'),('t','und'),('h','hat',597,632),('h','k',633,646),
                      ('f','p58-1b'),('t','(b) braune H'),('f','p58-1c'),('t','(c).')])
segs(252,278,180,700,[('t','Sie ist wirklich h'),('f','p58-1d'),('t','(d) .')])
segs(280,304,180,500,[('t','Ja, das finde ich auch.')])
segs(306,330,180,900,[('t','Und wer ist der Mann neben ihr mit dem'),('h','B',553,572),('f','p58-1e'),('t','(e)?')])
segs(332,356,180,890,[('t','Hat er dunkle'),('h','L',308,325),('f','p58-1f'),('t','(f)? Dann ist es Louis.')])

# ---------- ex2 (letters x~162 native; square/triangle markers ~184-196 stay) ----------
def rowletter(y0,y1,letter):
    rs = runs(y0,y1,148,180)
    if rs:
        t(rs[0][0], base(y0,y1,148,180), letter, target=rs[0][1]-rs[0][0])
    R.append((148,y0,180,y1+4))

# a: blank, then text, then triangle + short answer
rowletter(433,458,'a')
segs(433,458,198,780,[('f','p58-2a'),('t','du früher auch blonde Haare?'),('t','Nein, braune.')],keep=[(608,628)])
rowletter(459,484,'b')
segs(459,484,198,780,[('t','Wie geht es Frau Brunner?'),('f','p58-2b1'),('t','sie wieder gesund?')])
segs(486,512,198,680,[('t','Sie'),('f','p58-2b2'),('t','vier Wochen im Krankenhaus.')])
rowletter(511,536,'c')
segs(511,536,198,500,[('t','Was bist du von Beruf?')])
segs(537,562,198,930,[('t','Früher'),('f','p58-2c1'),('h','ich',404,436),('t','Krankenschwester, heute'),('f','p58-2c2'),('t','ich Ärztin.')])
rowletter(562,588,'d')
segs(562,588,198,950,[('t','Wo'),('f','p58-2d1'),('h','ihr gestern',368,470),('t','Abend?'),('t','Im Büro. Wir'),('f','p58-2d2'),('t','viel Stress.')],keep=[(556,580)])

# ---------- ex3 (bank stays in bg; script example = printed, kept as art) ----------
segs(710,734,180,540,[('t','Wie hat dir Melanies Party'),('art','gefallen'),('t','(a)?')])
segs(734,758,180,820,[('t','Gut. Leider bin ich zu spät'),('f','p58-3b'),('t','(b) und ich habe ihr')])
segs(760,784,180,620,[('t','Geburtstagsgeschenk'),('f','p58-3c'),('t','(c).')])
segs(784,808,180,540,[('t','Was hat sie'),('f','p58-3d'),('t','(d)?')])
segs(810,834,180,760,[('t','Natürlich nichts. Aber ich habe mich'),('f','p58-3e'),('t','(e).')])
segs(836,862,180,900,[('t','Wir haben dann viel zusammen'),('f','p58-3f'),('t','(f). Die Musik war super.')])
segs(862,886,180,900,[('t','Stimmt! Hast du den Sänger'),('f','p58-3g'),('t','(g)? Das war Richie.')])

# ---------- ex4 (hint letters inside blanks get erased with underscores) ----------
segs(963,989,175,915,[('t','Richie?'),('f','p58-4a','sl'),('t','(a) Das war doch nicht Richie. Richie hat lange Haare und')],keep=[(246,368)])
segs(991,1015,175,320,[('t','einen Bart.')])
segs(1017,1041,175,780,[('t','Das war früher. Jetzt hat er kurze Haare und keinen Bart mehr.')])
segs(1042,1066,175,320,[('f','p58-4b','sl'),('t','? (b)')],keep=[(168,252)])
segs(1067,1092,175,640,[('t','Und – das glaubst du nicht – er ist verheiratet.')])
segs(1094,1120,175,380,[('f','p58-4c','sl'),('t','(c)')],keep=[(178,322)])
segs(1120,1144,175,430,[('t','Und er hat fünf Kinder.')])
segs(1146,1170,175,870,[('f','p58-4d','sl'),('t','(d) – Wann kommt denn der Bus? Es ist schon halb eins.')],keep=[(178,328)])
segs(1173,1198,175,900,[('f','p58-4e','sl'),('t','! (e) Der Bus fährt nur bis 24 Uhr.')],keep=[(178,450)])

# ---------- chk per group (bottom-right, below Punkte labels, on empty paper) ----------
items.append({'k':'chk','g':'g1','x':930,'y':362})
items.append({'k':'chk','g':'g2','x':930,'y':615})
items.append({'k':'chk','g':'g3','x':930,'y':892})
items.append({'k':'chk','g':'g4','x':930,'y':1204})

# ---------- script art crops (printed blue cursive example answers, blue-ink alpha) ----------
def crop_alpha(box,name):
    im=Image.open(f'{REPO}/assets/ab-a12-p{P}.png').convert('RGB').crop(box)
    a=np.asarray(im).astype(float)
    blue=(a[:,:,2]-a[:,:,0]); ink=(blue>10)&(a[:,:,2]>80)
    alpha=np.where(ink,255,0).astype('uint8')
    Image.fromarray(np.dstack([a,alpha]).astype('uint8'),'RGBA').save(f'{REPO}/assets/book-crops/native-ab12-p{P}-{name}.png')
    return box
b1=crop_alpha((453,230,512,256),'chlan')
items.append({'k':'a','n':'chlan','x':453,'y':230,'w':59,'h':26,'alt':'Beispieleintrag schlank'})
b2=crop_alpha((420,708,486,744),'gefallen')
items.append({'k':'a','n':'gefallen','x':420,'y':708,'w':66,'h':36,'alt':'Beispieleintrag gefallen'})
# erase the script ink from bg (bands already cover; ensure underline rows included)
R.append((453,230,512,258))
R.append((420,708,486,746))

# ---------- bg + spec ----------
bgp=f'{REPO}/assets/book-crops/native-ab12-p{P}-bg.png'
bg=make_bg(P,R,bgp)
spec={'w':W,'h':H,'items':[{'k':'a','n':'bg','x':0,'y':0,'w':W,'h':H,'alt':'Seite 58 Hintergrund'}]+items}
write_spec(P,spec)
print(f'p{P} written:',len(items)+1,'items,',len(R),'erase rects')
