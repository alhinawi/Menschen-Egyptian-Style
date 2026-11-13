"""Generate native AB A1.2 page 57: spec JSON + erased bg + art crops."""
import sys, json
sys.path.insert(0, '/home/sandbox/Menschen-Egyptian-Style/scripts/n56')
from nativeutil import *

P = 57
scan = load_scan(P)
W, H = scan['width'], scan['height']
words = scan['words']

items = []
def t(x, y, text, s=None, c='', col=None, b=False, i=False, target=None, path=DROID):
    if s is None:
        s = best_size(text, path, target, lo=13, hi=24) if target else 20
    it = {'k': 't', 'x': x, 'y': y, 't': text, 's': s}
    if c: it['c'] = c
    if col: it['col'] = col
    if b: it['b'] = 1
    if i: it['i'] = 1
    items.append(it)
    return it

def band(y0, y1, x0, x1):
    ws = [w for w in words if w['y']+w['h']/2 >= y0 and w['y']+w['h']/2 < y1
          and w['x'] >= x0-2 and w['x']+w['w'] <= x1+6]
    ws.sort(key=lambda w: w['x'])
    return ws

def auto(y0, y1, x0, x1, text, **kw):
    ws = band(y0, y1, x0, x1)
    assert ws, f'no words in band {y0}-{y1} x{x0}-{x1}'
    x = round(min(w['x'] for w in ws))
    bl = round(line_baseline(ws))
    tgt = round(max(w['x']+w['w'] for w in ws) - x)
    return t(x, bl, text, target=kw.pop('target', tgt), **kw)

# ---------- erase rectangles ----------
R = [
    (150,156,975,212),      # ex1 title 2 lines (ink y163-206, marker x111-141 stays)
    (115,226,465,256),      # 1a letter + Sammeln Sie Fragewoerter. (ink y229-250)
    (148,266,305,342),      # Fragewoerter rows (Wer/Wie, Was/Wo, Woher)
    (115,368,505,402),      # 1b Notieren Sie fuenf Fragen auf Kaertchen,
    (145,572,800,614),      # ex2 Spiel title
    (145,614,920,702),      # ex2 3 instruction lines
    (145,932,522,992),      # training ex1 title (2 lines, marker at x529 stays)
    (145,994,565,1082),     # word lines 1-3 (orange underlines redrawn as rules)
    (145,1108,485,1148),    # training ex2 title
    (145,1152,480,1186),    # column headers trennbar / nicht trennbar
    (140,1178,222,1214),    # aussehen script (art crop placed after)
    (303,1180,402,1216),    # bekommen script (art crop placed after)
    (145,1238,565,1278),    # ex3 title
    (408,1288,548,1312),    # 1. Silbe / 2. Silbe
    (175,1310,425,1362),    # row labels
    (428,1311,523,1356),    # radio circles (all 4)
    (634,936,885,978),      # ex4 title (red 4 box x594-624 stays)
    (652,980,1032,1292),    # dialogue lines (markers x636-648 stay in bg)
    (628,1296,968,1330),    # Hoeren Sie noch einmal und sprechen
    (628,1322,725,1356),    # Sie nach.
]

# ---------- ex1 ----------
FIRA700=REPO+'/assets/fonts/firasans-latin-700.woff2'
t(159,179,'Ihre Freundin / Ihr Freund hat ihren Traummann / seine Traumfrau kennengelernt.',c='naFiraB',s=21.0)
t(160,205,'Was möchten Sie wissen?',c='naFiraM',target=216)
wsa=band(232,268,118,146); t(round(wsa[0]['x']),round(line_baseline(wsa)),'a',c='naFiraM',col='#5c75ab',target=round(wsa[0]['w'])+2)
t(157,243,'Sammeln Sie Fragewörter.',c='naRB',target=224)
# Fragewoerter grid
t(157,282,'Wer …',i=1,target=50)
t(247,283,'Wie …',i=1,target=46)
t(156,308,'Was …',i=1,target=52)
t(247,309,'Wo …',i=1,target=44)
t(156,333,'Woher …',i=1,target=68)
wsb=band(368,402,118,146); t(round(wsb[0]['x']),round(line_baseline(wsb)),'b',c='naFiraM',target=round(wsb[0]['w'])+2)
t(156,385,'Notieren Sie fünf Fragen auf Kärtchen.',target=337)

# ---------- ex2 Spiel ----------
auto(572,614,148,800,'Spiel: Meine Traumfrau / Mein Traummann. Spielen Sie zu viert.',c='naFiraM')
auto(614,646,148,920,'Legen Sie alle Kärtchen auf einen Stapel. Person A zieht eine Karte und fragt Person B.',c='naFiraM',path=FIRA)
auto(640,668,148,920,'Person B beschreibt ihren Traummann / seine Traumfrau. Dann zieht Person B eine',c='naFiraM',path=FIRA)
auto(664,702,148,920,'Karte und fragt Person C …',c='naFiraM',path=FIRA)
auto(730,768,185,360,'Wie sieht sie/er aus?')
auto(730,752,425,725,'Er ist blond und hat blaue Augen.')
auto(752,774,425,725,'Wo hast du deine Traumfrau / deinen')
auto(774,798,425,725,'Traummann kennengelernt?')
t(823,727,'Im Supermarkt.',target=114)
t(777,750,'Was macht sie/er beruflich?',target=205)

# ---------- training ex1 ----------
t(153,954,'Hören Sie die Wörter und markieren',c='naFiraS',target=353)
t(152,979,'Sie den Wortakzent.',c='naFiraS',target=197)
auto(996,1030,148,502,'aussehen – bekommen – entschuldigen –')
auto(1028,1056,148,502,'gefallen – erkennen – mitnehmen –')
t(151,1068,'anmelden – absagen – vergessen – einkaufen',target=394)
items.append({'k':'r','x':152,'y':1019,'w':27,'h':2,'col':'#da8855'})
items.append({'k':'r','x':274,'y':1020,'w':36,'h':2,'col':'#da8855'})

# ---------- training ex2 ----------
t(151,1134,'Ordnen Sie die Wörter aus',c='naFiraM',s=20.0)
t(413,1134,'1',c='naFiraM',col='#5c75ab',s=20.0)
t(425,1134,' zu.',c='naFiraM',s=20.0)
t(150,1171,'trennbar',b=True,c='naRB',target=82)
t(317,1173,'nicht trennbar',b=True,c='naRB',target=139)

# ---------- ex3 ----------
auto(1238,1278,148,565,'Wo ist der Wortakzent? Kreuzen Sie an.',c='naFiraS')
auto(1288,1312,405,470,'1. Silbe')
auto(1288,1312,470,548,'2. Silbe')
t(184,1326,'Bei trennbaren Verben:',target=182)
t(184,1348,'Bei nicht trennbaren Verben:',target=229)
flds={f['id']:f for f in scan['fields']}
for fid,lbl in [('p57-3r0-1','Bei trennbaren Verben: 1. Silbe'),('p57-3r0-2','Bei trennbaren Verben: 2. Silbe'),
                ('p57-3r1-1','Bei nicht trennbaren Verben: 1. Silbe'),('p57-3r1-2','Bei nicht trennbaren Verben: 2. Silbe')]:
    f=flds[fid]
    pos={'p57-3r0-1':(433,1315),'p57-3r0-2':(501,1315),'p57-3r1-1':(433,1335),'p57-3r1-2':(501,1335)}[fid]
    it={'k':'d','id':f['name'],'v':f['value'],'x':pos[0],'y':pos[1],'l':lbl,'s':15,'g':f['group'],'a':f['answer']=='true'}
    items.append(it)

# ---------- ex4 dialogue ----------
t(637,959,'Hören Sie das Gespräch.',c='naFiraM',target=232)
dlg=[(980,1008,'Entschuldigen Sie! Kennen wir uns'),
     (1006,1030,'nicht? Sie sind doch Susi Meier. Ich'),
     (1030,1056,'habe Sie gleich erkannt.'),
     (1054,1084,'Äh … ja … Wie war noch gleich Ihr'),
     (1084,1112,'Name? Ich habe ihn wohl vergessen.'),
     (1112,1140,'Ich heiße Peter. … Susi, Sie sehen'),
     (1136,1162,'toll aus! Kann ich Sie irgendwohin'),
     (1158,1186,'mitnehmen?'),
     (1186,1212,'Danke, nein. Ich muss noch einkaufen'),
     (1212,1238,'und bekomme noch Besuch.'),
]
t(656,1280,'Ja, gern … ein anderes Mal.',s=18.5)
for y0,y1,txt in dlg:
    auto(y0,y1,650,1012,txt)
t(657,1253,'Schade. Na ja, vielleicht ein anderes Mal.',s=18.5)
auto(1296,1330,628,968,'Hören Sie noch einmal und sprechen',c='naFiraS')
auto(1322,1356,628,725,'Sie nach.',c='naFiraS')

# ---------- audio ----------
for a in scan['audio']:
    items.append({'k':'au','x':a['x'],'y':a['y'],'w':a['w'],'h':a['h'],'src':a['src'],'l':a['label']})

# ---------- art crops (printed script font, blue-ink alpha) ----------
import numpy as np
from PIL import Image
def crop_alpha(box,name):
    im=Image.open(f'{REPO}/assets/ab-a12-p{P}.png').convert('RGB').crop(box)
    a=np.asarray(im).astype(float)
    blue=(a[:,:,2]-a[:,:,0]); ink=(blue>10)&(a[:,:,2]>80)
    alpha=np.where(ink,255,0).astype('uint8')
    Image.fromarray(np.dstack([a,alpha]).astype('uint8'),'RGBA').save(f'{REPO}/assets/book-crops/native-ab12-p{P}-{name}.png')
crop_alpha((140,1178,222,1214),'aussehen')
crop_alpha((303,1180,402,1216),'bekommen')
items.append({'k':'a','n':'aussehen','x':140,'y':1178,'w':82,'h':36,'alt':'Beispieleintrag aussehen'})
items.append({'k':'a','n':'bekommen','x':303,'y':1180,'w':99,'h':36,'alt':'Beispieleintrag bekommen'})

# ---------- bg + spec ----------
bgp=f'{REPO}/assets/book-crops/native-ab12-p{P}-bg.png'
bg=make_bg(P,R,bgp)
# bubble text: masked erase (dark pixels only + 1px dilation) so pale oval rings survive
_bga=np.asarray(Image.open(bgp).convert('RGB')).astype(float)
_sca=np.asarray(Image.open(f'{REPO}/assets/ab-a12-p{P}.png').convert('RGB')).astype(float)
def mask_erase(bga,sca,rect,thr=222):
    x0,y0,x1,y1=rect
    m=sca[y0:y1,x0:x1].max(axis=2)<thr
    md=m.copy()
    md[1:,:]|=m[:-1,:]; md[:-1,:]|=m[1:,:]; md[:,1:]|=m[:,:-1]; md[:,:-1]|=m[:,1:]
    reg=bga[y0:y1,x0:x1]
    reg[md]=np.array([254.,253.,248.])
for _r in [(188,726,360,760),(425,724,725,796),(766,706,1000,762)]:
    mask_erase(_bga,_sca,_r)
Image.fromarray(np.clip(_bga,0,255).astype('uint8')).save(bgp)
spec={'w':W,'h':H,'items':[{'k':'a','n':'bg','x':0,'y':0,'w':W,'h':H,'alt':'Seite 57 Hintergrund'}]+items}
write_spec(P,spec)
print(f'p{P} written:',len(items)+1,'items')
