"""AB A1.2 p64 native text with original printed script note and illustrations."""
import sys,json
sys.path.insert(0,'/home/sandbox/Menschen-Egyptian-Style/scripts/n56')
from nativeutil import *
from scipy.ndimage import binary_dilation,distance_transform_edt
P=64;s=load_scan(P);words=s['words'];items=[];erases=[];bands=[]
FB=REPO+'/assets/fonts/firasans-latin-700.woff2';DI=REPO+'/assets/fonts/droid-serif-400-italic.ttf'
def line(y0,y1,x0,x1,text=None,c='',size=None,col='#383838'):
 ws=[w for w in words if y0<=w['y']+w['h']/2<y1 and x0<=w['x']+w['w']/2<x1];ws.sort(key=lambda w:w['x']);assert ws,(y0,x0)
 text=(text or ' '.join(w['text'] for w in ws)).replace('—','–').replace(' - ',' – ');path=FB if c=='naFiraB' else FIRA if c=='naFiraM' else DI if c=='naDI' else DB if c=='naDB' else DROID
 sz=size or best_size(text,path,(ws[-1]['x']+ws[-1]['w']-ws[0]['x'])*.99,lo=13,hi=34)
 it={'k':'t','x':ws[0]['x']-1,'y':line_baseline(ws),'s':sz,'t':text,'col':col}
 if c:it['c']=c
 items.append(it);bands.append([len(items)-1,x0,y0-3,x1,y1+3])
 erases.extend((w['x']-3,w['y']-3,w['x']+w['w']+4,w['y']+w['h']+4) for w in ws)
 return it
DB=REPO+'/assets/fonts/droid-serif-700.woff2'
line(85,121,110,210,'TEST',size=30.5,col='#555555')
for a in [(159,191,150,440),(379,412,150,455),(742,776,150,680),(974,1005,155,610)]:line(*a,c='naFiraB')
# Original blue examples, section badges, side labels, scoring rules and footer stay as art.
# Bank typography and separators are native; the crossed example remains exact art.
line(202,231,160,710,'wischen | decken | rausbringen | abtrocknen | aufhängen | machen |',c='naFiraR',size=17.2,col='#3f6489')
for y0,y1 in [(239,267),(267,292),(293,319),(319,345)]:
 line(y0,y1,160,320,size=18)
 if y0!=319:line(y0,y1,560,665,size=18)
# Exercise 2. Split at printed blank rules; model wisch remains source art.
for y0,y1 in [(420,449),(499,526),(576,602),(628,656)]:
 line(y0,y1,160,178,size=18);line(y0,y1,185,500,size=18)
for a in [(449,475,185,425),(449,475,475,610),(449,475,722,855),(475,500,185,490),(527,554,185,557),(527,554,669,829),(527,554,940,980),(554,579,294,569),(554,579,680,900),(602,631,185,565),(602,631,676,822),(656,682,185,625),(656,682,737,890),(682,710,294,387),(682,710,495,650)]:line(*a,size=18)
# Exercise 3, keep the printed blue sie model.
for a in [(783,812,185,425),(783,812,452,705),(811,838,185,700),(811,838,758,945),(837,864,185,414),(837,864,475,760),(864,889,185,590),(864,889,650,780),(889,916,185,616),(889,916,675,790),(916,943,185,646),(916,943,705,835)]:line(*a,size=18)
# OCR misses row letters; native a-f at the exact book indent.
for n,y in enumerate([804,830,855,881,908,934]):
 items.append({'k':'t','x':163,'y':y,'s':18,'t':chr(97+n),'col':'#383838'});erases.append((160,y-21,178,y+5))
# Exercise 4 prompts and punctuation; the complete printed blue model stays art.
for a,text in [((1017,1048,185,460),'(du: zurückrufen – Frau Lang )'),((1043,1069,185,430),'(ihr: kommen – um 10 Uhr)'),((1069,1096,185,350),'(du: sein – so nett )'),((1095,1122,185,416),'(ihr: zumachen – Fenster )'),((1121,1148,185,810),'(ihr: – sprechen – auf den Anrufbeantworter) Ich bin nicht zu Hause,'),((1172,1199,185,382),'(du: machen – Kaffee)')]:line(*a,text=text,size=18)
line(1069,1098,738,985,size=18)
for n,y in enumerate([1037,1063,1089,1114,1141,1192]):
 items.append({'k':'t','x':163,'y':y,'s':18,'t':chr(97+n),'col':'#383838'});erases.append((160,y-21,178,y+5))
for y0,y1 in [(1045,1068),(1097,1120),(1174,1198)]:line(y0,y1,974,984,size=18)
erases.extend([(448,1018,465,1047),(344,1070,360,1096),(409,1097,427,1121),(329,1121,351,1147)])
# Bottom self-assessment table uses native text; colors, lights and borders stay.
for a in [(1228,1258,180,250),(1228,1258,350,450),(1228,1258,520,655)]:line(*a,c='naDB',size=15)
for row,y in enumerate([1282,1316,1350]):
 for col,(x,vals) in enumerate([(227,['0–3 Punkte','4 Punkte','5–6 Punkte']),(391,['0–6 Punkte','7–9 Punkte','10–12 Punkte']),(559,['0–2 Punkte','3 Punkte','4–5 Punkte'])]):
  erases.append((x-4,y-18,[318,490,650][col],y+5));items.append({'k':'t','t':vals[row],'x':x,'y':y,'s':15,'col':'#383838'})
line(1367,1388,465,700,size=14)
for f in s['fields']:items.append({'k':'f','id':f['id'],'x':f['x'],'y':f['y']+18,'w':f['w']-3,'hh':22,'c':'sl','l':f['label'],'a':f['answer'],'g':f['group']})
for g,x,y in [('g1',990,345),('g2',990,707),('g3',990,941),('g4',990,1201)]:items.append({'k':'chk','g':g,'x':x,'y':y})
a=np.array(Image.open(REPO+'/assets/ab-a12-p64.png').convert('RGB'))
for x0,y0,x1,y1 in erases:
 patch=a[y0:y1,x0:x1].copy();z=patch.astype(int);mask=(z.max(2)<220)&(z.max(2)-z.min(2)<65);mask=binary_dilation(mask,iterations=2)
 dirty=((z.min(2)<175)&(z.max(2)-z.min(2)<65)) if 1228<=y0<1260 else (z.min(2)<235)|((z.max(2)-z.min(2))>25);idx=distance_transform_edt(dirty,return_distances=False,return_indices=True);patch[mask]=patch[tuple(idx)][mask];a[y0:y1,x0:x1]=patch
try:off=json.load(open(REPO+'/scripts/n64/offsets.json'))
except FileNotFoundError:off={}
for n,it in enumerate(items):
 if str(n) in off:it['x']+=off[str(n)][0];it['y']+=off[str(n)][1]
for n in (70,71,72):items[n]['y']=1249
Image.fromarray(a).save(REPO+'/assets/book-crops/native-ab12-p64-bg.png')
write_spec(P,{'w':s['width'],'h':s['height'],'items':[{'k':'a','n':'bg','x':0,'y':0,'w':s['width'],'h':s['height'],'alt':'Seite 64 Hintergrund'}]+items})
json.dump(bands,open('/tmp/p64-bands.json','w'));print('p64',len(items))
