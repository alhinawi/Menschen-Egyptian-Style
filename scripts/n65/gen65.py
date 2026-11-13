"""AB A1.2 p65 native text with original printed script note and illustrations."""
import sys,json
sys.path.insert(0,'/home/sandbox/Menschen-Egyptian-Style/scripts/n56')
from nativeutil import *
from scipy.ndimage import binary_dilation,distance_transform_edt
P=65;s=load_scan(P);words=s['words'];items=[];erases=[];bands=[]
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
line(85,119,100,395,'LERNWORTSCHATZ',size=30.5,col='#555555')
line(157,191,135,705,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.',c='naFiraB')
line(199,226,140,270,c='naDB',size=18)
line(200,229,525,765,c='naDB',size=18)
# Vocabulary, including exact umlaut plurals and separable-verb centre dots.
left=[(226,252,140,260,'Abfall der, -̈e'),(252,278,140,245,'Boden der, -̈'),(278,304,140,258,None),(303,330,140,265,None),(330,356,140,274,None),(356,382,150,293,None),(380,409,140,271,None),(407,432,150,215,None),(434,458,150,390,None),(458,484,140,245,None),(495,522,140,294,'ab·trocknen, hat'),(522,551,150,275,None),(548,574,140,290,'ab·waschen, hat'),(574,601,150,275,None),(600,628,140,316,None),(627,654,150,297,None),(655,678,150,490,None),(678,703,140,265,None),(704,733,150,255,None),(741,768,140,242,None),(769,794,140,205,None),(794,824,140,240,None)]
right=[(228,254,525,648,None),(253,279,525,700,None),(280,306,537,591,None),(307,334,525,647,None),(334,355,537,575,None),(356,382,525,640,None),(382,408,525,650,None),(408,435,525,684,None),(437,458,537,575,None),(473,497,525,607,'auf sein'),(500,523,537,656,None),(525,550,525,637,None),(549,577,537,612,None),(576,602,525,673,'zu·machen, hat'),(602,632,537,643,None),(640,669,525,586,None),(671,693,525,575,None),(693,717,525,598,None)]
for y0,y1,x0,x1,text in left+right:
 gray=y0 in (434,655,500);line(y0,y1,x0,x1,text=text,size=16 if gray else 18,col='#888880' if gray else '#383838')
# Retain the printed blue synonym note exactly.
line(847,871,342,602,c='',size=16,col='#555550')
line(871,896,342,565,c='',size=16,col='#555550')
line(919,951,137,692,'Welche Wörter möchten Sie noch lernen? Notieren Sie.',c='naFiraB')
# Translation lines and notes are personal writing, intentionally ungraded.
for side,x,width,ys in [('l',315,190,[246,272,298,324,376,428,479,544,596,648,726,765,791,817]),('r',675,197,[249,301,352,378,404,456,494,572,624,669,695,721])]:
 for n,y in enumerate(ys):items.append({'k':'f','id':'65-1-'+side+str(n+1),'x':x,'y':y,'w':width,'hh':21,'c':'sl','l':'Übersetzung '+side+' '+str(n+1)})
items.append({'k':'fa','id':'65-2-text','x':140,'ys':[983,1009,1035,1061,1087,1112,1138,1164,1190,1216,1242,1267,1293,1319,1344],'w':730,'l':'Notizen','rules':False,'legacy':['65-2-'+str(n) for n in range(1,16)]})
a=np.array(Image.open(REPO+'/assets/ab-a12-p65.png').convert('RGB'))
for x0,y0,x1,y1 in erases:
 patch=a[y0:y1,x0:x1].copy();z=patch.astype(int);mask=(z.min(2)<252)&(z.max(2)-z.min(2)<90);mask=binary_dilation(mask,iterations=2)
 dirty=(z.min(2)<253)|((z.max(2)-z.min(2))>15);idx=distance_transform_edt(dirty,return_distances=False,return_indices=True);patch[mask]=patch[tuple(idx)][mask];a[y0:y1,x0:x1]=patch
# Remove isolated OCR-missed punctuation in these native vocabulary runs only.
# Header, photos, notebook rules and original footer are never erased.
try:off=json.load(open(REPO+'/scripts/n65/offsets.json'))
except FileNotFoundError:off={}
for n,it in enumerate(items):
 if str(n) in off:it['x']+=off[str(n)][0];it['y']+=off[str(n)][1]
Image.fromarray(a).save(REPO+'/assets/book-crops/native-ab12-p65-bg.png')
write_spec(P,{'w':s['width'],'h':s['height'],'items':[{'k':'a','n':'bg','x':0,'y':0,'w':s['width'],'h':s['height'],'alt':'Seite 65 Hintergrund, Originalfußzeile unverändert'}]+items})
json.dump(bands,open('/tmp/p65-bands.json','w'));print('p65',len(items))
