"""Generate native AB A1.2 page 59 (LERNWORTSCHATZ): spec JSON + erased bg + script art crops."""
import sys, json, re
sys.path.insert(0, '/home/sandbox/Menschen-Egyptian-Style/scripts/n56')
from nativeutil import *
import numpy as np
from PIL import Image

P = 59
scan = load_scan(P)
W, H = scan['width'], scan['height']
words = scan['words']
DROID700 = REPO + '/assets/fonts/droid-serif-700.woff2'
FIRA700 = REPO + '/assets/fonts/firasans-latin-700.woff2'

SCANRGB = np.asarray(Image.open(f'{REPO}/assets/ab-a12-p{P}.png').convert('RGB')).astype(int)

items = []
def t(x, y, text, s=None, c='', col=None, target=None, path=DROID, b=False):
    if s is None:
        s = best_size(text, path, target, lo=13, hi=40) if target else 18.5
    it = {'k':'t','x':round(x),'y':round(y),'t':text,'s':s}
    if c: it['c']=c
    if col: it['col']=col
    if b: it['b']=1
    items.append(it); return it

def base(y0,y1,x0,x1):
    ws=[w for w in words if w['y']+w['h']/2>=y0 and w['y']+w['h']/2<y1 and w['x']>=x0 and w['x']+w['w']<=x1+6]
    return line_baseline(ws) if ws else y1-4

R = []  # erase rects
OFFSETS=json.load(open(REPO+'/scripts/n59/ink-offsets-r2.json'))
line_index=0

def line(y0,y1,text,x0,x1,c='',path=DROID,sz=None):
    """One native text line; baseline calibrated against same-scale ink bottoms."""
    global line_index
    ws=[w for w in words if w['y']+w['h']/2>=y0 and w['y']+w['h']/2<y1 and w['x']+w['w']/2>=x0 and w['x']+w['w']/2<x1]
    ws.sort(key=lambda w: w['x'])
    assert ws, f'line band {y0}-{y1} empty'
    acc = re.sub(r'\s','', ''.join(w['text'] for w in ws))
    tk = re.sub(r'\s','',text)
    if acc != tk: print(f'WARN line {text!r}: scan words give {acc!r}')
    x_a, x_b = ws[0]['x'], ws[-1]['x']+ws[-1]['w']
    bl = line_baseline(ws)
    if sz is not None:
        t(x_a, bl, text, s=sz, c=c, path=path)
    else:
        t(x_a, bl, text, target=(x_b-x_a)*0.985, c=c, path=path)
    dx,dy=OFFSETS[line_index];line_index+=1
    items[-1]['x']+=dx;items[-1]['y']+=dy
    R.append(('fill',(x_a-3, y0-2, x_b+4, y1+3),(255,255,255)))

# ---------- header (rule right of title stays in bg) ----------
line(86,116,'LERNWORTSCHATZ',100,400)
items[-1]['col']='#555555'
items[-1]['c']='p59Header'

# ---------- ex1 instruction (badge stays) ----------
line(158,190,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.',146,720,c='naFiraB',path=FIRA700,sz=20.5)

# ---------- column headers (Droid Bold) ----------
line(198,226,'Aussehen',146,250,c='naDB',path=DROID700)
line(198,228,'Weitere wichtige Wörter',530,780,c='naDB',path=DROID700)

# ---------- left column vocab ----------
line(228,252,'Bart der, ¨e',148,280)
items[-1]['t']='Bart der,'
items[-1]['s']=17.0
R[-1]=('fill',(151,226,232,255),(255,255,255))  # plural suffix stays exactly as printed at x235-251
line(254,278,'Haar das, -e',148,280)
line(290,312,'blond',148,230)
line(316,338,'dick',148,220)
line(342,364,'dünn',148,230)
line(368,392,'glatt',148,225)
line(398,422,'grau',148,222)
line(420,444,'hübsch',148,235)
line(446,470,'schlank',148,240)
line(496,522,'Charakter',148,255,c='naDB',path=DROID700)
line(524,548,'freundlich/',148,280)
line(548,572,'unfreundlich',160,300)
line(574,598,'fröhlich',148,245)
line(600,626,'glücklich/',148,265)
line(626,652,'unglücklich',160,290)
line(652,676,'komisch',148,245)
line(678,702,'seltsam',148,238)
line(704,730,'sympathisch/',148,295)
line(730,756,'unsympathisch',160,310)
line(756,782,'traurig',148,240)

# ---------- right column vocab ----------
line(228,252,'Bäckerei die,',535,660)
line(256,278,'-en',545,590)
line(278,302,'Hausfrau die,',535,665)
line(308,330,'-en',545,590)
line(342,368,'beschweren (sich),',535,710)
line(368,392,'hat sich',545,630)
line(392,416,'beschwert',545,650)
line(418,444,'erkennen, hat',535,675)
line(444,470,'erkannt',545,635)
line(470,496,'geboren sein,',535,665)
line(496,524,'ist geboren',545,660)
line(526,552,'vergessen,',535,640)
line(548,576,'du vergisst,',545,665)
line(574,602,'er vergisst,',545,660)
line(598,624,'hat vergessen',545,680)
line(636,662,'gleich',535,605)
line(662,688,'laut',535,590)
line(688,714,'ledig',535,595)

# ---------- Tipp (yellow box + Tipp label stay in bg) ----------
line(834,862,'Machen Sie Wortbilder.',260,470)

# ---------- ex2 instruction (badge stays) ----------
line(916,950,'Welche Wörter möchten Sie noch lernen? Notieren Sie.',146,710,c='naFiraB',path=FIRA700,sz=20.5)

# ---------- script art crops (printed blue cursive word-picture examples) ----------
def crop_alpha(box,name):
    im=Image.open(f'{REPO}/assets/ab-a12-p{P}.png').convert('RGB').crop(box)
    a=np.asarray(im).astype(float)
    blue=(a[:,:,2]-a[:,:,0]); ink=(blue>10)&(a[:,:,2]>80)
    alpha=np.where(ink,255,0).astype('uint8')
    Image.fromarray(np.dstack([a,alpha]).astype('uint8'),'RGBA').save(f'{REPO}/assets/book-crops/native-ab12-p{P}-{name}.png')
    return box
b1=crop_alpha((488,810,618,884),'vergessen')
items.append({'k':'a','n':'vergessen','x':488,'y':810,'w':130,'h':74,'alt':'Wortbild vergessen'})
b2=crop_alpha((687,776,754,828),'schlankb')
items.append({'k':'a','n':'schlankb','x':687,'y':776,'w':67,'h':52,'alt':'Wortbild schlank'})

# ---------- bg + spec ----------
bgp=f'{REPO}/assets/book-crops/native-ab12-p{P}-bg.png'
bg=make_bg(P,R,bgp)
# mask-erase the blue script ink (pixel-exact; keeps nearby rules intact)
a=np.asarray(Image.open(bgp).convert('RGB')).astype(float)
blue=(a[:,:,2]-a[:,:,0]>15)&(a[:,:,2]>90)
m=np.zeros(blue.shape,bool); m[770:890,420:770]=True
sel=blue&m
# dilate 1px so anti-aliased edges go too
for dy in (-1,0,1):
    for dx in (-1,0,1):
        a[np.roll(np.roll(sel,dy,0),dx,1)]=(254.0,253.0,248.0)
a[sel]=(254.0,253.0,248.0)
Image.fromarray(np.clip(a,0,255).astype('uint8')).save(bgp)
spec={'w':W,'h':H,'items':[{'k':'a','n':'bg','x':0,'y':0,'w':W,'h':H,'alt':'Seite 59 Hintergrund'}]+items}
write_spec(P,spec)
print(f'p{P} written:',len(items)+1,'items,',len(R),'erase rects')
