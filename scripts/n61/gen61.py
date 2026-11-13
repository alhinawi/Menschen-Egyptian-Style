"""AB A1.2 p61 native body and instructions; ungraded free tasks remain ungraded."""
import json,sys
sys.path.insert(0,'/home/sandbox/Menschen-Egyptian-Style/scripts/n56')
from nativeutil import *
from PIL import Image
import numpy as np
P=61;s=load_scan(P);words=s['words'];items=[];rects=[];bands=[]
FB=REPO+'/assets/fonts/firasans-latin-700.woff2';DB=REPO+'/assets/fonts/droid-serif-700.woff2'
def line(y0,y1,x0,x1,text=None,style='',size=None):
 ws=[w for w in words if y0<=w['y']+w['h']/2<y1 and x0<=w['x']+w['w']/2<x1];ws.sort(key=lambda w:w['x']);assert ws,(y0,x0)
 text=text or ' '.join(w['text'] for w in ws)
 a=ws[0]['x'];b=ws[-1]['x']+ws[-1]['w'];p=FB if style.startswith('naFira') else DB if style=='naDB' else DROID
 sz=size or best_size(text,p,(b-a)*.975,lo=14,hi=30)
 it={'k':'t','x':a,'y':line_baseline(ws),'s':sz,'t':text,'col':'#383838'}
 if style:it['c']=style
 items.append(it);rects.append(('fill',(a-2,y0-2,b+3,y1+2),(255,255,255)));bands.append([text,a-3,y0-2,b+4,y1+2])
line(85,115,100,360,'BASISTRAINING',size=31.2)
items[-1]['col']='#555555'
line(159,185,140,865,'Schreiben Sie fünf Kärtchen mit einem Problem und fünf Kärtchen mit',style='naFiraB')
line(187,215,140,425,'einer Lösung im Imperativ.',style='naFiraB')
line(380,403,140,590,'Tauschen Sie mit Ihrer Partnerin / Ihrem Partner.',style='naFiraM')
line(406,432,140,595,'Sie/Er sucht: Welche Kärtchen passen zusammen?',style='naFiraM')
# Color-key underlines remain exact scan pixels.
line(468,497,140,700,'Markieren Sie die Pronomen: Dativ grün, Akkusativ rot',style='naFiraB')
for y0,y1 in [(509,536),(537,563),(574,598),(601,626),(638,665),(665,691),(702,730),(730,752),(754,782),(793,816),(820,845),(858,880),(884,910)]:
 ws=[w for w in words if y0<=w['y']+w['h']/2<y1 and 185<=w['x']<900]
 if ws:
  text=' '.join(w['text'] for w in sorted(ws,key=lambda w:w['x']))

  line(y0,y1,185,900,text)
# Row labels are independent from the dialogue to preserve the scan's indent.
for y0,y1 in [(510,536),(574,598),(638,665),(702,730),(793,816),(858,880)]:line(y0,y1,140,160,size=18)
line(946,976,140,460,'Ergänzen Sie die Pronomen aus',style='naFiraB')
line(946,976,480,625,'in der Tabelle.',style='naFiraB')
# Table text is native; printed table paper and borders remain source pixels.
for w in words:
 if 985<=w['y']<1250 and w['x']>140:
  style='naDB' if w['y']<1015 else ''
  size=16.5
  items.append({'k':'t','x':w['x'],'y':1008 if style else word_baseline(w),'s':size,'t':w['text'],'col':'#383838',**({'c':style} if style else {})})
  rects.append(('cell',w))
for f in s['fields']:items.append({'k':'f','id':f['id'],'x':f['x'],'y':f['y']+18,'w':f['w']-3,'hh':22,'c':'sl','l':f['label'],'a':f['answer'],'g':f['group']})
items.append({'k':'chk','g':'g1','x':580,'y':1280})
try:off=json.load(open(REPO+'/scripts/n61/offsets.json'))
except FileNotFoundError:off={}
for it in items:
 if it['k']=='t' and it['t'] in off:it['x']+=off[it['t']][0];it['y']+=off[it['t']][1]
# r2 per-item scan-ink corrections, distinct for repeated table labels.
try: fine=json.load(open(REPO+'/scripts/n61/fine-r2.json'))
except FileNotFoundError:fine={}
for n,it in enumerate(items):
 if str(n) in fine:
  dx,dy=fine[str(n)];it['x']+=dx;it['y']+=dy
bgp=REPO+'/assets/book-crops/native-ab12-p61-bg.png';make_bg(P,[r for r in rects if r[0]!='cell'],bgp)
a=np.array(Image.open(bgp).convert('RGB'));orig=np.array(Image.open(REPO+'/assets/ab-a12-p61.png').convert('RGB'))
from scipy.ndimage import binary_dilation,distance_transform_edt
for rr in rects:
 if rr[0]!='cell':continue
 w=rr[1];x0=w['x']-4;x1=w['x']+w['w']+5;y0=w['y']-4;y1=w['y']+w['h']+4
 if w['y']<1015:
  patch=orig[y0:y1,x0:x1].copy();mask=binary_dilation(patch.min(2)<180,iterations=2)
  idx=distance_transform_edt(mask,return_distances=False,return_indices=True)
  patch[mask]=patch[tuple(idx)][mask];a[y0:y1,x0:x1]=patch
 else:a[y0:y1,x0:x1]=[255,255,255]
# Retain only colored underlines, never the old black instruction text.
region=orig[489:499,440:695].astype(int)
colored=(region.max(2)-region.min(2)>40)&(region.min(2)<180)
a[489:499,440:695][colored]=region[colored]
region=orig[555:560,297:325].astype(int)
colored=(region[:,:,0]-region[:,:,1]>35)&(region[:,:,0]>100)
a[555:560,297:325][colored]=region[colored]
Image.fromarray(a).save(bgp)
write_spec(P,{'w':s['width'],'h':s['height'],'items':[{'k':'a','n':'bg','x':0,'y':0,'w':s['width'],'h':s['height'],'alt':'Seite 61 Hintergrund'}]+items})
json.dump(bands,open('/tmp/p61-bands.json','w'));print('p61',len(items))
