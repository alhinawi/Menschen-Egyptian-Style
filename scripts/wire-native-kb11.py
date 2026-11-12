#!/usr/bin/env python3
"""Switch the given KB A1.1 page numbers to the native component in the lesson JSON files: wire-native-kb11.py 13 14 ..."""
import json,sys,os
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pages={str(int(x)) for x in sys.argv[1:]}
done=set()
for f in ['index','l2-3','l4-6','l10-12']:
    path=f'{ROOT}/src/lessons/{f}.json';d=json.load(open(path))
    def walk(n):
        if isinstance(n,list) and len(n)==3 and isinstance(n[0],str) and isinstance(n[1],dict):
            dp=n[1].get('data-page','')
            if n[0]=='section' and 'page' in n[1].get('class','').split() and dp in pages and 'NativePilot' not in json.dumps(n[2]) and 'NativeKB12' not in json.dumps(n[2]):
                if f=='index' and not ('"kb-a11"' in json.dumps(n[2])):return
                n[1]['class']='page nativeKbPage';n[2]=[['NativeKb11',{'page':dp},[]]];done.add(dp);return
            for c in n[2]:walk(c)
        elif isinstance(n,list):
            for c in n:walk(c)
    walk(d)
    json.dump(d,open(path,'w'),ensure_ascii=False,separators=(',',':'))
print('wired',sorted(done,key=int),'missing',sorted(pages-done,key=int))
