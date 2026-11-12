#!/usr/bin/env python3
"""Build native page data for KB A1.1 from scan-data + original page scans.
Text is rebuilt as real DOM text at the scanned word boxes; non-text artwork is cropped from the scan at exact framing."""
import json,sys,os,statistics
import numpy as np
from PIL import Image,ImageFont
from scipy import ndimage as ndi
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES=list(range(9,13))+list(range(13,41))+list(range(57,97))
FONT='/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf'
FONTB='/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf'
fr=ImageFont.truetype('/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf',100);fb=ImageFont.truetype(FONTB,100)
def tw(t,f):return f.getlength(t)
def build(p):
    d=json.load(open(f'{ROOT}/src/scan-data/kb-a11/p{p}.json'))
    im=Image.open(f"{ROOT}/{d['image']}").convert('RGB');S=im.width/d['width']
    a=np.array(im).astype(np.int16);work=a.copy();H,W=a.shape[:2]
    lum=a.mean(axis=2)
    # dark scanner border connected to the image edge is not part of the page
    dark=lum<95;dl,dn=ndi.label(dark);edge=set(np.unique(np.concatenate([dl[0],dl[-1],dl[:,0],dl[:,-1]])))-{0}
    paper0=np.median(a.reshape(-1,3),axis=0)
    for i in edge:
        m=dl==i
        if False:work[ndi.binary_dilation(m,iterations=6)]=paper0
    words=[];
    for wd in d['words']:
        x,y,w,h=[round(v*S) for v in(wd['x'],wd['y'],wd['w'],wd['h'])]
        t=wd['text']
        x0,y0,x1,y1=max(0,x-2),max(0,y-2),min(W,x+w+2),min(H,y+h+2)
        ring=np.concatenate([a[max(0,y0-3):y0,x0:x1].reshape(-1,3),a[y1:y1+3,x0:x1].reshape(-1,3),a[y0:y1,max(0,x0-3):x0].reshape(-1,3),a[y0:y1,x1:x1+3].reshape(-1,3)])
        ok=False
        box0=a[y0:y1,x0:x1].reshape(-1,3)
        if len(box0)>0:
            med=np.median(box0,axis=0);ok=float((np.abs(box0-med).sum(axis=1)<70).mean())>0.6
            # big titles/logos and strongly coloured panels stay as artwork
            if h>=34:ok=False
            if np.abs(med-paper0).sum()>150:ok=False
        rec={'t':t,'x':wd['x'],'y':wd['y'],'w':wd['w'],'h':wd['h']}
        if wd.get('phrase'):rec['ph']=wd['phrase']
        if ok and re_has(t):
            bg=med
            box=a[y0:y1,x0:x1].reshape(-1,3)
            dist=np.abs(box-bg).sum(axis=1)
            ink=dist>90
            frac=float(ink.mean())
            if ink.sum()>3:
                fg=np.median(box[dist>=np.percentile(dist[ink],60)],axis=0)
            else:fg=np.array([30,30,30])
            fgc=fg
            if fgc[2]>fgc[0]+35 and fgc[2]>fgc[1]+10:
                rec['r']=0;words.append(rec);continue
            work[y0:y1,x0:x1]=bg
            rec['c']='#%02x%02x%02x'%tuple(int(max(0,min(255,v))) for v in fg)
            rec['b']=1 if frac>0.34 else 0
            rec['r']=1
        words.append(rec)
    # artwork components from erased copy
    paper=np.median(work.reshape(-1,3),axis=0)
    diff=np.abs(work-paper).sum(axis=2)
    mask=diff>60
    mask=ndi.binary_dilation(mask,iterations=11)
    lab,n=ndi.label(mask)
    arts=[]
    for i,sl in enumerate(ndi.find_objects(lab)):
        y0,y1=sl[0].start,sl[0].stop;x0,x1=sl[1].start,sl[1].stop
        w,h=x1-x0,y1-y0
        core=(lab[sl]==i+1)&(diff[sl]>60)
        if core.sum()<120 or (w<18 and h<18):continue
        # trim dilation padding
        ys,xs=np.where(core);cx0,cx1,cy0,cy1=x0+xs.min(),x0+xs.max()+1,y0+ys.min(),y0+ys.max()+1
        arts.append((cx0,cy0,cx1,cy1))
    out=[]
    os.makedirs(f'{ROOT}/assets/book-crops',exist_ok=True)
    wim=Image.fromarray(work.clip(0,255).astype('uint8'))
    for k,(x0,y0,x1,y1) in enumerate(sorted(arts,key=lambda b:(b[1],b[0]))):
        name=f'kb11-p{p}-{k}.webp'
        sub=work[y0:y1,x0:x1];dd=np.abs(sub-paper).sum(axis=2)
        rgba=sub.clip(0,255).astype('uint8')
        Image.fromarray(rgba,'RGB').save(f'{ROOT}/assets/book-crops/{name}',quality=82,method=1)
        out.append({'src':'assets/book-crops/'+name,'x':round(x0/S),'y':round(y0/S),'w':round((x1-x0)/S),'h':round((y1-y0)/S)})
    # fit font sizes
    for r in words:
        if r.get('r'):
            f=fb if r.get('b') else fr
            width=tw(r['t'],f)
            r['f']=round(min(max(r['w']/width*100 if width else 0,r['h']*0.7),r['h']*1.5),1)
    # per-line font consistency + phrase text
    rs=[r for r in words if r.get('r')]
    rs.sort(key=lambda r:(r['y']+r['h']/2))
    lines=[]
    for r in sorted(words,key=lambda r:r['x']):
        cy=r['y']+r['h']/2
        for L in lines:
            if abs(L['cy']-cy)<max(r['h'],L['h'])*0.6 and 0<=r['x']-L['xe']<max(r['h'],L['h'])*2.5:
                L['ws'].append(r);L['xe']=r['x']+r['w'];L['cy']=(L['cy']+cy)/2;L['h']=max(L['h'],r['h']);break
        else:lines.append({'cy':cy,'h':r['h'],'xe':r['x']+r['w'],'ws':[r]})
    for li,L in enumerate(lines):
        txt=' '.join(w['t'] for w in L['ws'])
        rr=[w for w in L['ws'] if w.get('r')]
        if rr:
            bold=1 if sum(w['b'] for w in rr)*2>len(rr) else 0
            for w in rr:w['b']=bold
        fs=[w['f'] for w in L['ws'] if w.get('r')]
        med=statistics.median(fs) if fs else None
        for w in L['ws']:
            if 'ph' not in w and len(L['ws'])>1:w['ph']=txt
            w['l']=li
            if med and w.get('r'):w['f']=round(med,1);w['cy']=round(statistics.median([x['y']+x['h']/2 for x in L['ws']]),1)
    blocks=[]
    for L in lines:
        rr=sorted([w for w in L['ws'] if w.get('r')],key=lambda w:w['x'])
        seg=[]
        for w in rr:
            if seg and w['x']-(seg[-1]['x']+seg[-1]['w'])>max(w['f'],seg[-1]['f'])*1.1:
                blocks.append(seg);seg=[]
            seg.append(w)
        if seg:blocks.append(seg)
    outb=[]
    for seg in blocks:
        x0=min(w['x'] for w in seg);x1=max(w['x']+w['w'] for w in seg)
        outb.append({'x':x0,'w':x1-x0,'cy':seg[0]['cy'],'f':seg[0]['f'],'b':seg[0]['b'],'ws':[{'t':w['t'],'c':w['c'],**({'ph':w['ph']} if 'ph' in w else {})} for w in seg]})
    words=[w for w in words if not w.get('r')]
    checks={}
    for g in sorted({f['group'] for f in d['fields'] if f.get('answer') is not None}):
        fs=[f for f in d['fields'] if f['group']==g]
        yb=max(f['y']+f['h'] for f in fs);xm=min(f['x'] for f in fs)
        bw,bh=128,42
        blockers=[(r['x'],r['y'],r['w'],r['h']) for r in words]+[(w['x'],w['cy']-w['f']*0.6,w['w'],w['f']*1.2) for w in outb]+[(f['x'],f['y'],f['w'],f['h']) for f in d['fields']]+[(q['x'],q['y'],q['w'],q['h']) for q in out if q['w']>60 and q['h']>40]
        lowest=max(fs,key=lambda f:f['y']+f['h']);ax=min(f['x'] for f in fs if abs(f['y']-lowest['y'])<12);ay=lowest['y']+lowest['h']
        gx1=max(f['x']+f['w'] for f in fs if abs(f['y']-lowest['y'])<12)
        cands=[]
        for x in range(10,d['width']-bw-5,6):
            for y in range(int(ay-bh),int(ay+160),4):
                if y<0 or y+bh>d['height']:continue
                dist=abs(y-(ay+4))*1.2+min(abs(x-ax),abs(x-gx1-6))
                cands.append((dist,x,y))
        cands.sort();best=None
        for dist,x,y in cands:
            if all(x+bw<=bx or bx+bw_<=x or y+bh<=by or by+bh_<=y for bx,by,bw_,bh_ in blockers):best=(x,y);break
        checks[g]=list(best or (min(xm,d['width']-bw-10),min(yb+6,d['height']-bh)))
    return {'blocks':outb,'checks':checks,'book':'kb-a11','page':p,'w':d['width'],'h':d['height'],'words':words,'art':out,
            'paper':'#%02x%02x%02x'%tuple(int(v) for v in paper),'fields':d['fields'],'audio':d['audio'],'review':d['review']}
def re_has(t):
    return any(c.isalnum() for c in t) or t.strip() in ('.',',','!','?',':','–','-','…')
if __name__=='__main__':
    sel=[int(x) for x in sys.argv[1:]] or PAGES
    os.makedirs(f'{ROOT}/src/native-kb11',exist_ok=True)
    for p in sel:
        r=build(p)
        json.dump(r,open(f'{ROOT}/src/native-kb11/p{p}.json','w'),ensure_ascii=False,separators=(',',':'))
        print(p,len(r['words']),len(r['art']),sum(1 for w in r['words'] if w.get('r')))
