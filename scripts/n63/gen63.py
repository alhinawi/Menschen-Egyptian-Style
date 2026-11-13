"""AB A1.2 p63 native text with original printed script note and illustrations."""
import sys,json
sys.path.insert(0,'/home/sandbox/Menschen-Egyptian-Style/scripts/n56')
from nativeutil import *
from scipy.ndimage import binary_dilation,distance_transform_edt
P=63;s=load_scan(P);words=s['words'];items=[];erases=[];bands=[]
FB=REPO+'/assets/fonts/firasans-latin-700.woff2';DI=REPO+'/assets/fonts/droid-serif-400-italic.ttf'
def line(y0,y1,x0,x1,text=None,c='',size=None,col='#383838'):
 ws=[w for w in words if y0<=w['y']+w['h']/2<y1 and x0<=w['x']+w['w']/2<x1];ws.sort(key=lambda w:w['x']);assert ws,(y0,x0)
 text=text or ' '.join(w['text'] for w in ws);path=FB if c=='naFiraB' else FIRA if c=='naFiraM' else DI if c=='naDI' else DROID
 sz=size or best_size(text,path,(ws[-1]['x']+ws[-1]['w']-ws[0]['x'])*.99,lo=13,hi=34)
 it={'k':'t','x':ws[0]['x']-1,'y':line_baseline(ws),'s':sz,'t':text,'col':col}
 if c:it['c']=c
 items.append(it);bands.append([len(items)-1,x0,y0-3,x1,y1+3])
 erases.extend((w['x']-3,w['y']-3,w['x']+w['w']+4,w['y']+w['h']+4) for w in ws)
 return it
line(85,117,100,390,'TRAINING: LESEN',size=30.5,col='#555555')
line(159,189,145,945,c='naFiraB')
line(187,213,145,930,c='naFiraM',size=19)
line(213,242,145,680,c='naFiraM',size=19)
for a in [(387,410,245,385),(410,432,270,360),(387,410,445,635),(410,433,452,625),(387,410,670,855),(410,431,730,793),(568,591,215,415),(570,594,450,630),(592,614,505,575),(570,594,685,850)]:line(*a)
for a in [(638,662,750,980),(662,685,750,975),(685,706,750,885)]:line(*a,size=17,col='#555550')
line(986,1018,100,490,'TRAINING: AUSSPRACHE',size=30.5,col='#555555')
line(992,1025,497,785,'Satzmelodie (Zusammenfassung)',c='naDI',size=18)
line(1048,1080,145,600,c='naFiraB')
line(1048,1080,685,995,c='naFiraB')
# Printed melody arrows before this instruction stay exactly in source pixels.
line(1077,1106,730,915,c='naFiraB')
for y0,y1 in [(1116,1140),(1142,1166),(1168,1192),(1194,1220),(1219,1243),(1245,1269),(1271,1296),(1296,1324)]:
 line(y0,y1,145,165,size=18);line(y0,y1,170,410,size=18);line(y0,y1,685,940,size=18)
line(1333,1365,145,560,c='naFiraM',size=19)
line(1333,1365,685,1010,c='naFiraM',size=19)
for f in s['fields']:items.append({'k':'f','id':f['id'],'x':f['x'],'y':f['y']+20,'w':f['w'],'hh':24,'c':'sl circ63','l':f['label'],'a':f['answer'],'g':f['group']})
items.append({'k':'chk','g':'g1','x':960,'y':922})
# Pronunciation arrow blanks are free entries, intentionally ungraded.
for n,(x,y,w) in enumerate([(412,1190,35),(353,1216,35),(331,1241,35),(332,1267,35),(399,1293,35),(366,1319,35),(786,1139,34),(780,1165,34),(814,1191,34),(940,1217,34),(872,1243,34),(934,1269,34),(841,1295,34),(884,1321,34)]):items.append({'k':'f','id':'p63-melody-'+str(n),'x':x,'y':y,'w':w,'hh':21,'c':'sl melody63','l':'Satzmelodie '+str(n+1),'max':2})
# Clickable original audio icons; permanent audio element remains below the page.
for n,au in enumerate(s['audio']):
 name='audio'+str(n);box=(au['x']-1,au['y']-1,au['x']+au['w']+1,au['y']+au['h']+1);crop(P,box,name)
 items.append({'k':'au','x':box[0],'y':box[1],'w':box[2]-box[0],'h':box[3]-box[1],'n':name,'src':au['src'],'l':au['label']})
a=np.array(Image.open(REPO+'/assets/ab-a12-p63.png').convert('RGB'))
for x0,y0,x1,y1 in erases:
 patch=a[y0:y1,x0:x1].copy();z=patch.astype(int);mask=(z.max(2)<220)&(z.max(2)-z.min(2)<65);mask=binary_dilation(mask,iterations=2)
 dirty=(z.min(2)<235)|((z.max(2)-z.min(2))>25);idx=distance_transform_edt(dirty,return_distances=False,return_indices=True);patch[mask]=patch[tuple(idx)][mask];a[y0:y1,x0:x1]=patch
try:off=json.load(open(REPO+'/scripts/n63/offsets.json'))
except FileNotFoundError:off={}
for n,it in enumerate(items):
 if str(n) in off:it['x']+=off[str(n)][0];it['y']+=off[str(n)][1]
Image.fromarray(a).save(REPO+'/assets/book-crops/native-ab12-p63-bg.png')
write_spec(P,{'w':s['width'],'h':s['height'],'items':[{'k':'a','n':'bg','x':0,'y':0,'w':s['width'],'h':s['height'],'alt':'Seite 63 Hintergrund'}]+items})
json.dump(bands,open('/tmp/p63-bands.json','w'));print('p63',len(items))
