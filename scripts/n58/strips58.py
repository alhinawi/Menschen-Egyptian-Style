#!/usr/bin/env python3
"""p58 review strips: scan|render side-by-side composites."""
import sys
from PIL import Image

SCAN = 'assets/ab-a12-p58.png'
REN = sys.argv[1] if len(sys.argv)>1 else '/tmp/native-58-full.png'
OUT = sys.argv[2] if len(sys.argv)>2 else '/tmp'

scan = Image.open(SCAN).convert('RGB')
ren = Image.open(REN).convert('RGB')
if ren.size != scan.size: ren = ren.crop((0,0,scan.size[0],scan.size[1]))

def pair(box, scale, path, stack=None):
    s = scan.crop(box); r = ren.crop(box)
    w,h = s.size
    s = s.resize((int(w*scale),int(h*scale)), Image.LANCZOS)
    r = r.resize((int(w*scale),int(h*scale)), Image.LANCZOS)
    c = Image.new('RGB', (s.width+r.width+4, s.height), (255,0,0))
    c.paste(s,(0,0)); c.paste(r,(s.width+4,0))
    if stack:  # stack multiple pairs vertically with 6px gap
        c2 = Image.new('RGB', (c.width, c.height*len(stack)+6*(len(stack)-1)), (255,255,255))
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

# main strips (LANCZOS 2x like r1)
pair((130,190,990,378), 2.0, f'{OUT}/p58-ex1.png')
pair((130,385,990,672), 2.0, f'{OUT}/p58-ex2.png')
pair((130,680,990,918), 2.0, f'{OUT}/p58-ex3.png')
pair((130,928,990,1268),2.0, f'{OUT}/p58-ex4.png')
fs = scan.resize((536,726), Image.LANCZOS); fr = ren.resize((536,726), Image.LANCZOS)
c = Image.new('RGB',(1076,726),(255,0,0)); c.paste(fs,(0,0)); c.paste(fr,(540,0)); c.save(f'{OUT}/p58-full.png')

# 3x zoom sets (NEAREST for pixel truth)
multipair([(595,222,915,258),(290,248,470,285),(540,300,700,338),(290,330,480,362)], 3, f'{OUT}/p58-z1-dashes.png')     # item1 ex1 dashes
multipair([(500,222,640,258),(415,248,485,285),(230,1035,330,1072),(555,1138,680,1175)], 3, f'{OUT}/p58-z2-labels.png')               # item2 (x) labels
multipair([(845,328,990,365),(845,580,990,618),(845,852,990,898),(845,1168,990,1208)], 3, f'{OUT}/p58-z5-punkte.png') # item5 punkte
multipair([(230,950,380,1005),(160,1030,340,1080),(160,1085,335,1135),(700,955,800,1010)], 3, f'{OUT}/p58-z6-artifacts.png') # item6 ex4 zones + lange tick
multipair([(880,345,995,382),(880,598,995,635),(880,875,995,912),(880,1185,995,1225)], 3, f'{OUT}/p58-z7-chk.png')  # item7 chk clearance
print('strips done')
