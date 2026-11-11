"""Import printed markup into React element data without changing text/assets.
Run once per page; existing converted pages are deliberately not overwritten.
"""
from pathlib import Path
from bs4 import BeautifulSoup,Comment,NavigableString
import json,subprocess
R=Path(__file__).resolve().parents[1]
def node(e,seen):
 if isinstance(e,Comment):return None
 if isinstance(e,NavigableString):return str(e)
 if e.name=='script':return None
 attrs={k:' '.join(v) if isinstance(v,list) else v or '' for k,v in e.attrs.items()}
 if 'paletteButton' in attrs.get('class',''):
  if seen[0]:return None
  seen[0]=True;return ['span',{'data-react-theme-slot':''},[]]
 children=[n for x in e.children if (n:=node(x,seen)) is not None];return [e.name,attrs,children]
manifest={}
for p in sorted(R.glob('*.html')):
 # Authoritative content snapshot, not an already converted entry point.
 original=subprocess.check_output(['git','show','608edd3:'+p.name],cwd=R,text=True)
 s=BeautifulSoup(original,'html5lib');reader=bool(s.select_one('#pageStage'));slug=p.stem
 styles=[x.get('href') for x in s.head.select('link[rel=stylesheet]')]
 nodes=[n for x in s.body.children if (n:=node(x,[False])) is not None] if not reader else [n for x in s.body.children if (n:=node(x,seen:=[False])) is not None]
 # One shared palette placeholder per document, not per top-level element.
 seen=[False];nodes=[n for x in s.body.children if (n:=node(x,seen)) is not None]
 data=R/'src/lessons'/f'{slug}.json'
 if not data.exists():data.write_text(json.dumps(nodes,ensure_ascii=False))
 initializers=[]
 for i,e in enumerate(s.select('script')):
  src=e.get('src')
  if src in ('assets/page-flip.browser.js','themes.js'):continue
  name=src[:-3] if src else slug+'-inline-'+str(i)
  target=R/'src/adapters'/f'{name}.js';target.parent.mkdir(parents=True,exist_ok=True)
  if not target.exists():target.write_text('export default function mount(){\n'+((R/src).read_text() if src else (e.string or e.decode_contents()))+'\n}\n')
  initializers.append(name)
 if reader and p.name!='ab-a12-l17-20.html':initializers.append('cover-socials')
 manifest[p.name]={'slug':slug,'title':s.titl(e.string or e.decode_contents()) if s.title else 'Menschen','reader':reader,'themes':reader and p.name!='ab-a12-l17-20.html','styles':styles,'initializers':initializers,'bodyAttrs':s.body.attrs}
 head=''.join(str(x) for x in s.head.children if getattr(x,'name',None) not in ('script','link'))
 if not s.head.select_one('meta[charset]'):head='<meta charset="utf-8">'+head
 p.write_text('<!doctype html><html lang="de"><head>'+head+'<link rel="icon" href="data:,"></head><body><div id="react-book-root" style="display:contents"></div><script type="module" src="/src/main.jsx"></script></body></html>')
(R/'src/lessons/manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
