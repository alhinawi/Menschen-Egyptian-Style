#!/usr/bin/env python3
"""p59 review strips: scan|render side-by-side composites."""
import sys
from PIL import Image

SCAN = 'assets/ab-a12-p59.png'
REN = sys.argv[1] if len(sys.argv)>1 else '/tmp/native-59-full.png'
OUT = sys.argv[2] if len(sys.argv)>2 else '/tmp'

scan = Image.open(SCAN).convert('RGB')
ren = Image.open(REN).convert('RGB')
assert ren.size == scan.size, (ren.size, scan.size)

def pair(box, scale, path):
    s = scan.crop(box); r = ren.crop(box)
    w,h = s.size
    s = s.resize((int(w*scale),int(h*scale)), Image.LANCZOS)
    r = r.resize((int(w*scale),int(h*scale)), Image.LANCZOS)
    c = Image.new('RGB', (s.width+r.width+4, s.height), (255,0,0))
    c.paste(s,(0,0)); c.paste(r,(s.width+4,0))
    c.save(path)

def multipair(boxes, scale, path):
    imgs=[]
    for b in boxes:
        s=scan.crop(b); r=ren.crop(b); w,h=s.size
        s=s.resize((int(w*scale),int(h*scale)),Image.NEAREST)
        r=r.resize((int(w*scale),int(h*scale)),Image.NEAREST)
        c=Image.new('RGB',(s.width+r.width+4,s.height),(255,0,0))
        c.paste(s,(0,0)); c.paste(r,(s.width+4,0))
        imgs.append(c)
    W=max(i.width for i in imgs); H=sum(i.height for i in imgs)+8*(len(imgs)-1)
    out=Image.new('RGB',(W,H),(200,200,200)); y=0
    for i in imgs: out.paste(i,(0,y)); y+=i.height+8
    out.save(path)

pair((90,70,930,135), 2.0, f'{OUT}/p59-header.png')
pair((130,145,800,195), 2.0, f'{OUT}/p59-ins1.png')
pair((140,190,430,800), 2.0, f'{OUT}/p59-leftcol.png')
pair((520,190,790,730), 2.0, f'{OUT}/p59-rightcol.png')
pair((190,680,790,895), 2.0, f'{OUT}/p59-tipp.png')
pair((95,905,1010,1310), 1.5, f'{OUT}/p59-ex2.png')
fs = scan.resize((536,725), Image.LANCZOS); fr = ren.resize((536,725), Image.LANCZOS)
c = Image.new('RGB',(1076,725),(255,0,0)); c.paste(fs,(0,0)); c.paste(fr,(540,0)); c.save(f'{OUT}/p59-full.png')

multipair([(100,80,410,125),(140,155,720,195),(140,198,790,230)], 3, f'{OUT}/p59-z1-titles.png')
multipair([(145,225,290,280),(145,520,310,580),(530,225,715,310)], 3, f'{OUT}/p59-z2-vocab.png')
multipair([(200,825,480,870),(480,800,630,895),(675,765,765,840)], 3, f'{OUT}/p59-z3-tipp-script.png')
multipair([(140,910,720,955)], 3, f'{OUT}/p59-z4-ins2.png')
print('strips done')
