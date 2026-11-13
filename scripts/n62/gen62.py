"""AB A1.2 p62: native instructions, exercises and ads; scan art retained."""
import sys,json
sys.path.insert(0,'/home/sandbox/Menschen-Egyptian-Style/scripts/n56')
from nativeutil import *
from scipy.ndimage import binary_dilation,distance_transform_edt
P=62;s=load_scan(P);words=s['words'];items=[];erases=[];bands=[]
DI=REPO+'/assets/fonts/droid-serif-400-italic.ttf'
FB=REPO+'/assets/fonts/firasans-latin-700.woff2'
def add(text,x,y,size=18,c='',col='#383838'):
 it={'k':'t','t':text,'x':x,'y':y,'s':size,'col':col}
 if c:it['c']=c
 items.append(it);return it
def line(y0,y1,x0,x1,text=None,c='',size=None):
 ws=[w for w in words if y0<=w['y']+w['h']/2<y1 and x0<=w['x']+w['w']/2<x1];ws.sort(key=lambda w:w['x']);assert ws,(y0,x0)
 text=text or ' '.join(w['text'] for w in ws)
 path=DI if c=='naDI' else FB if c=='naFiraB' else FIRA400 if c.startswith('naFira') else DROID
 size=size or best_size(text,path,(ws[-1]['x']+ws[-1]['w']-ws[0]['x'])*.98,lo=14,hi=32)
 it=add(text,ws[0]['x']-1,line_baseline(ws),size,c)
 erases.extend((w['x']-3,w['y']-3,w['x']+w['w']+4,w['y']+w['h']+4) for w in ws)
 bands.append([len(items)-1,x0,y0-3,x1,y1+3]);return it
line(85,117,100,365,'BASISTRAINING',size=31.2)['col']='#555555'
for a in [(160,190,145,570),(380,411,145,685),(651,682,145,510)]:line(*a,c='naFiraB')
# Ex7 note bodies use Fira sans; the blue printed es is not an input.
for x0,x1 in [(163,350),(380,565),(598,780),(816,990)]:
 for y0,y1 in [(235,258),(260,281),(283,306),(308,332)]:
  ws=[w for w in words if y0<=w['y']+w['h']/2<y1 and x0<=w['x']<x1 and w['text']!='e<']
  if not ws:continue
  end=min(x1,300) if x0==163 and y0==283 else x1
  if x0==598 and y0==283:
   line(y0,y1,x0,659,c='naFiraR',size=16);line(y0,y1,720,end,c='naFiraR',size=16)
  else:line(y0,y1,880 if x0==816 and y0==283 else x0,end,c='naFiraR',size=16)
for x0,x1 in [(160,180),(380,400),(595,615),(815,835)]:line(207,230,x0,x1,'c' if x0==595 else None,size=18)
# Ex8 printed question lines and repeated response labels.
for a in [(422,446,190,565),(447,475,190,570),(538,566,190,560),(422,450,640,930),(514,540,640,935)]:line(*a,size=18)
for x,y in [(151,438),(150,554),(601,439),(600,530)]:
 label='a' if y==438 else 'b' if y==554 else 'c' if y==439 else 'd';add(label,x-1,y,18);erases.append((x-3,y-20,x+15,y+4))
for x,y in [(194,491),(194,582),(644,468),(644,560)]:
 add('Nein.',x-1,y,18);erases.append((x-3,y-20,x+55,y+4))
for x,y in [(194,517),(194,608),(644,494),(644,586)]:
 add('Dann',x-1,y,18);erases.append((x-3,y-20,x+52,y+4))
# Ex9 instructions and ad copy.
line(691,721,145,360,c='naFiraM',size=19)
line(1000,1031,145,855,c='naFiraM',size=19)
line(1030,1057,145,860,size=18)
line(1057,1083,145,400,size=18)
for a in [(733,757,163,557),(758,781,163,410),(783,806,163,370),(806,832,163,530),(830,855,163,565),(854,877,163,310),(878,901,163,374)]:
 text='Achtung: Wir (= Paula, Susi und drei Katzen)' if a[0]==806 else 'paula.patent@t-online.de' if a[0]==878 else None
 line(*a,text=text,c='naFiraB' if a[0]==733 else 'naFiraR')
# Tilted ad lines: actual rotation, never horizontal scaling.
for a,text in [((866,897,470,805),'Kannst du kochen? Magst du Partys?'),((891,922,470,903),'Wir sind eine lustige WG und feiern gern zusammen.'),((908,945,470,958),'Ihr auch? Suchen noch zwei Mitbewohner (ca. 20–30 Jahre)'),((936,971,470,830),'für Zimmer (350,– €); wg-kontakt@web.de')]:
 it=line(*a,text=text,c='naFiraB' if a[0]==866 else 'naFiraR');it['c']+=' p62Tilt';it['x']=474;it['y']={866:895,891:919,908:943,936:967}[a[0]]
# Printed sample form uses a real self-hosted regular italic face.
for a in [(1130,1159,175,232),(1160,1184,185,300),(1160,1184,465,520),(1160,1187,680,890),(1186,1208,185,350),(1210,1236,185,343),(1236,1261,185,244),(1288,1310,185,288),(1315,1342,185,545)]:
 it=line(*a,c='naDI')
# Existing graded answers only; original rules remain visible.
for f in s['fields']:items.append({'k':'f','id':f['id'],'x':f['x'],'y':f['y']+18,'w':f['w']-3,'hh':22,'c':'sl','l':f['label'],'a':f['answer'],'g':f['group']})
for g,x,y in [('g1',960,347),('g2',940,615)]:items.append({'k':'chk','g':g,'x':x,'y':y})
# Free-form sample email: ungraded transparent fields, no answer key.
for n,(x,y,w) in enumerate([(233,1155,155),(301,1181,155),(521,1181,157),(343,1234,541),(243,1260,641),(189,1286,695),(287,1312,597)]):items.append({'k':'f','id':'p62-9b-'+str(n),'x':x,'y':y,'w':w,'hh':21,'c':'sl','l':'9 b freies Schreiben '+str(n+1)})
# Remove text ink only, keeping the card paper/texture and all colored examples.
a=np.array(Image.open(REPO+'/assets/ab-a12-p62.png').convert('RGB'));orig=a.copy()
for x0,y0,x1,y1 in erases:
 patch=a[y0:y1,x0:x1].copy();z=patch.astype(int);mask=(z.max(2)<220)&(z.max(2)-z.min(2)<70);mask=binary_dilation(mask,iterations=2)
 idx=distance_transform_edt(mask,return_distances=False,return_indices=True);patch[mask]=patch[tuple(idx)][mask];a[y0:y1,x0:x1]=patch
# Clean whole ad lines so omitted OCR punctuation cannot survive beneath native text.
regions=[(163,732,560,902)]
for x0,y0,x1,y1 in regions:
 z=orig[y0:y1,x0:x1].astype(int);mask=(z.max(2)<210)&(z.max(2)-z.min(2)<40);mask=binary_dilation(mask,iterations=1)
 idx=distance_transform_edt(mask,return_distances=False,return_indices=True);patch=orig[y0:y1,x0:x1].copy();patch[mask]=patch[tuple(idx)][mask];a[y0:y1,x0:x1]=patch
x0,y0,x1,y1=473,855,958,975
z=orig[y0:y1,x0:x1].astype(int);yy,xx=np.indices(z.shape[:2]);ink=(z.max(2)<210)&(z.max(2)-z.min(2)<40);area=np.zeros(ink.shape,dtype=bool)
for baseline in (895,919,943,967):area|=(yy+y0>=baseline-23-.035*(xx+x0-474))&(yy+y0<=baseline+4-.035*(xx+x0-474))
mask=binary_dilation(ink&area,iterations=1);idx=distance_transform_edt(mask,return_distances=False,return_indices=True);patch=orig[y0:y1,x0:x1].copy();patch[mask]=patch[tuple(idx)][mask];a[y0:y1,x0:x1]=patch
try:off=json.load(open(REPO+'/scripts/n62/offsets.json'))
except FileNotFoundError:off={}
for n,it in enumerate(items):
 if str(n) in off:it['x']+=off[str(n)][0];it['y']+=off[str(n)][1]
# r2: consistent first-ad body face, scan email indent, and measured form/row ink.
for n in range(47,53):items[n]['s']=17.2
items[52]['x']=164
items[57].update(x=190,y=1151,s=15.5)
items[60]['x']+=3
items[26]['y']-=2
items[34]['y']+=1
items[38]['y']+=1
items[16]['y']-=4
Image.fromarray(a).save(REPO+'/assets/book-crops/native-ab12-p62-bg.png')
write_spec(P,{'w':s['width'],'h':s['height'],'items':[{'k':'a','n':'bg','x':0,'y':0,'w':s['width'],'h':s['height'],'alt':'Seite 62 Hintergrund'}]+items})
json.dump(bands,open('/tmp/p62-bands.json','w'));print('p62',len(items))
