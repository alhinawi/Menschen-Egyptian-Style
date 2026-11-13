"""Called by build-native-kb11.py for p24. Deskew this photographed sheet and all hit areas together."""
import json
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw
ROOT=Path(__file__).resolve().parents[1]
p=ROOT/'src/native-kb11/p24.json'
d=json.loads(p.read_text())
note='Perspective-corrected photographed page and aligned answer blanks (deskew-kb11-p24.py).'
if note in d['review']['notes']:
    raise SystemExit('p24 already deskewed; regenerate native source data before rerunning')
src=np.array([[25,78],[1071,53],[1071,1475],[80,1515]],float)
dst=np.array([[0,0],[1072,0],[1072,1516],[0,1516]],float)
def matrix(a,b):
    A=[];B=[]
    for (x,y),(u,v) in zip(a,b):
        A.extend([[x,y,1,0,0,0,-u*x,-u*y],[0,0,0,x,y,1,-v*x,-v*y]])
        B.extend([u,v])
    return np.append(np.linalg.solve(A,B),1).reshape(3,3)
M=matrix(src,dst);inv=matrix(dst,src)
def point(x,y):
    q=M@np.array([x,y,1]);return q[:2]/q[2]
def box(o):
    pts=np.array([point(o['x']+dx*o['w'],o['y']+dy*o['h']) for dx,dy in [(0,0),(1,0),(0,1),(1,1)]])
    o.update(x=round(float(pts[:,0].min()),2),y=round(float(pts[:,1].min()),2),w=round(float(np.ptp(pts[:,0])),2),h=round(float(np.ptp(pts[:,1])),2))
photo=Image.open(ROOT/'assets/kb-a11-p24.png').convert('RGB')
# Remove only the tiny printed audio tag. Sample the adjacent white paper per row;
# the red task number starts farther right and is never touched.
pix=photo.load()
for y in range(259,278):
    paper=tuple(int(np.median([pix[x,y][c] for x in range(75,87)])) for c in range(3))
    for x in range(89,126):pix[x,y]=paper
im=photo.transform((1072,1516),Image.Transform.PERSPECTIVE,inv.flatten()[:8],Image.Resampling.BICUBIC)
# The page photo has a black camera border above the sheet, not book content.
ImageDraw.Draw(im).rectangle((0,0,1072,12),fill=(253,253,241))
asset='assets/book-crops/kb11-p24-straight.webp'
im.save(ROOT/asset,quality=94,method=6)
d['art']=[dict(src=asset,x=0,y=0,w=1072,h=1516)]
for o in d['words']+d['audio']:box(o)
for a in d['audio']:a['task']='1'
for g,(x,y) in d['checks'].items():d['checks'][g]=[round(float(n),2) for n in point(x,y)]
for f in d['fields']:
    box(f)
    if f['id'].startswith('t2a-'):
        i='bcdef'.index(f['id'][-1]);f.update(x=176,y=856+27*i,w=246,h=22)
    elif f['id'].startswith('t2b-'):
        i=int(f['id'][-1])-2;f.update(x=177+29*i,y=1227,w=23,h=19)
    else:
        coords={'dk':(665,219,100),'pl':(665,385,110),'cz':(665,465,110),'at':(665,497,110),'sk':(665,550,110),'hu':(665,588,110),'si':(665,648,110),'nl':(148,309,90),'be':(148,364,90),'lu':(148,443,90),'fr':(148,522,90),'ch':(148,608,90),'it':(148,644,100)}
        x,y,w=coords[f['id'].split('-')[-1]];f.update(x=x,y=y,w=w,h=22)
d['review']['notes'].append(note)
p.write_text(json.dumps(d,ensure_ascii=False,separators=(',',':'))+'\n')
