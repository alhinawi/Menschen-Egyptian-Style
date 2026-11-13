"""Native AB A1.2 p60. Printed blue cursive note text remains source art."""
import sys,json,re
sys.path.insert(0,'/home/sandbox/Menschen-Egyptian-Style/scripts/n56')
from nativeutil import *
import numpy as np
from PIL import Image
P=60
scan=load_scan(P); words=scan['words']; items=[]; rects=[]
FIRAB=REPO+'/assets/fonts/firasans-latin-700.woff2'
def line(y0,y1,x0,x1,text=None,kind='body',size=None):
 ws=[w for w in words if y0<=w['y']+w['h']/2<y1 and x0<=w['x']+w['w']/2<x1]; ws.sort(key=lambda w:w['x'])
 assert ws,(y0,x0)
 if kind=='body' and len(ws)>1 and len(ws[0]['text'])==1 and ws[0]['text'].isalpha():
  w=ws.pop(0)
  items.append({'k':'t','x':w['x'],'y':word_baseline(w),'t':w['text'],'s':18,'col':'#383838'})
  rects.append(('fill',(w['x']-2,y0-2,w['x']+w['w']+3,y1+2),(255,255,255)))
 text=text or ' '.join(w['text'] for w in ws)
 a=min(w['x'] for w in ws);b=max(w['x']+w['w'] for w in ws)
 path=FIRAB if kind=='instruction' else DROID
 s=size or best_size(text,path,(b-a)*.97,lo=14,hi=42)
 it={'k':'t','x':a,'y':line_baseline(ws),'t':text,'s':s,'col':'#383838'}
 if kind=='instruction':it['c']='naFiraB'
 if kind=='bank':it.update(c='naFiraR',col='#547797')
 items.append(it)
 box=(a-2,y0-2,b+3,y1+2)
 rects.append(box if kind=='header' else ('fill',box,(255,255,255)))
 return it
line(60,106,410,830,'Komm sofort runter!',kind='header')
line(175,202,150,850,'Familie Richter räumt die Küche auf. Wer macht was? Schreiben Sie.',kind='instruction')
for y0,y1 in [(215,239),(240,264),(266,290),(292,316),(318,342),(344,372)]:
 line(y0,y1,150,299)
line(510,537,150,665,'Was sollen Carla und Tim machen? Ordnen Sie zu.',kind='instruction')
# Yellow word-bank highlights and printed crossed-out example stay intact.
for w in words:
 if 550<=w['y']<=563 and w['text']!='|' and w['text']!='reparieren':
  path=FIRA400;s=best_size(w['text'],path,w['w'],lo=16,hi=21)
  # Use original highlight color as the erase fill.
  rects.append(('bank',w))
  items.append({'k':'t','x':w['x'],'y':word_baseline(w),'t':w['text'],'s':s,'c':'naFiraR','col':'#547797'})
line(949,980,150,500,'Schreiben Sie Sätze im Imperativ.',kind='instruction')
for y0,y1,x0,x1 in [(990,1016,174,440),(1016,1042,174,415),(1043,1068,150,485),(1070,1095,174,350),(1095,1119,150,550),(1120,1144,174,400),(1146,1170,150,365),(1172,1197,174,380),(1199,1223,150,352),(1224,1248,174,390)]:line(y0,y1,x0,x1)
# Scan rules stay visible. Inputs occupy only the writing spans.
for f in scan['fields']:
 items.append({'k':'f','id':f['id'],'x':f['x'],'y':f['y']+17,'w':f['w']-3,'hh':23,'c':'sl','l':f['label'],'a':f['answer'],'g':f['group']})
for g,x,y in [('g1',900,490),('g2',940,890),('g3',970,1280)]:items.append({'k':'chk','g':g,'x':x,'y':y})
# Optional per-line optical corrections, measured against a full-size screenshot.
try: offsets=json.load(open(REPO+'/scripts/n60/offsets.json'))
except FileNotFoundError:offsets={}
for it in items:
 if it['k']=='t' and it['t'] in offsets:
  dx,dy=offsets[it['t']];it['x']+=dx;it['y']+=dy
bgpath=f'{REPO}/assets/book-crops/native-ab12-p{P}-bg.png'
make_bg(P,[r for r in rects if r[0]!='bank'],bgpath)
a=np.array(Image.open(bgpath).convert('RGB'))
original=np.array(Image.open(f'{REPO}/assets/ab-a12-p{P}.png').convert('RGB'))
# Remove title ink only, preserving the panel texture around it.
from scipy.ndimage import binary_dilation, distance_transform_edt, gaussian_filter
patch=original[55:110,420:810].copy()
mask=binary_dilation(patch.min(2)<150,iterations=2)
idx=distance_transform_edt(mask,return_distances=False,return_indices=True)
filled=patch[tuple(idx)]
soft=gaussian_filter(filled.astype(float),sigma=(1.2,1.2,0))
patch[mask]=soft[mask]
a[55:110,420:810]=patch
for rr in rects:
 if rr[0]!='bank':continue
 w=rr[1];x0=w['x']-2;x1=w['x']+w['w']+3;y0=w['y']-3;y1=w['y']+w['h']+3
 region=original[y0:y1,x0:x1].astype(int)
 ink=(region[:,:,2]-region[:,:,0]>5)&(region[:,:,0]<247)
 mask=ink.copy()
 for dy in (-1,0,1):
  for dx in (-1,0,1):mask|=np.roll(np.roll(ink,dy,0),dx,1)
 for j,y in enumerate(range(y0,y1)):
  row=original[y,max(155,x0-60):min(760,x1+60)].astype(int)
  paper=row[(row[:,0]>235)&(row[:,1]>235)&(row[:,2]>180)]
  col=np.median(paper,axis=0) if len(paper) else [255,253,222]
  a[y,x0:x1][mask[j]]=col
Image.fromarray(a).save(bgpath)
write_spec(P,{'w':scan['width'],'h':scan['height'],'items':[{'k':'a','n':'bg','x':0,'y':0,'w':scan['width'],'h':scan['height'],'alt':'Seite 60 Hintergrund'}]+items})
print('p60',len(items),'items')
