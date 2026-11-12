"""Restore printed punctuation on OCR blocks from a hand-transcribed page text (src/native-kb11/text/pN.txt).
Each OCR word whose letters match a token of the printed text gets the printed spelling incl. punctuation."""
import re,os
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def norm(s):return re.sub(r'[^a-zäöüß0-9]','',s.lower().replace('ß','ß'))
def tokens(txt):return [t for t in txt.split() if norm(t)]
def restore(blocks,page):
    f=f'{ROOT}/src/native-kb11/text/p{page}.txt'
    if not os.path.exists(f):return 0
    S=tokens(open(f).read().replace('\n',' '));N=[norm(t) for t in S];n=0
    for b in blocks:
        ws=b['ws'];k=len(ws);bn=[norm(w['t']) for w in ws]
        best=(0,None)
        for j in range(0,len(S)-k+1) if len(S)>=k else []:
            sc=sum(1 for i in range(k) if bn[i]==N[j+i])
            if sc>best[0]:best=(sc,j)
        if best[1] is None or best[0]<max(1,0.6*k):continue
        j=best[1]
        for i in range(k):
            if bn[i]==N[j+i] and ws[i]['t']!=S[j+i]:ws[i]['t']=S[j+i];n+=1
    return n
