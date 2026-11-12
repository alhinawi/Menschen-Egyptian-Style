import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
// Static files keep their original URL, and copyrighted source PDFs stay excluded.
// One SPA entry (index.html); closeBundle emits a per-route html for every
// legacy URL with its own title/OG meta stamped in, so crawlers that run no
// JS still get the right preview and old links keep working.
const ROOT = {
  title: 'Menschen · Lektion 1',
  ogTitle: 'Menschen. - The Interactive German Coursebook',
  description: 'Flip real pages, hear the original audio, and tap any word for its meaning in Egyptian Arabic. A1.1 + A1.2 · 24 lessons.',
  ogImage: 'assets/og.png',
  url: 'https://almany.vercel.app/',
};
function stamp(html, file, m) {
  const swap = (from, to, count) => {
    const parts = html.split(from);
    if (parts.length - 1 !== count) throw new Error(`stamp ${file}: expected ${count} of ${from.slice(0, 60)}, found ${parts.length - 1}`);
    html = parts.join(to);
  };
  swap(`<title>${ROOT.title}</title>`, `<title>${m.title}</title>`, 1);
  swap(`content="${ROOT.ogTitle}"`, `content="${m.ogTitle}"`, 2);
  swap(`content="${ROOT.description}"`, `content="${m.description}"`, 3);
  swap(`content="${ROOT.url}"`, `content="${ROOT.url}${file}"`, 1);
  swap(`href="${ROOT.url}"`, `href="${ROOT.url}${file}"`, 1);
  swap(`${ROOT.url}${ROOT.ogImage}"`, `${ROOT.url}${m.ogImage}"`, 2);
  return html;
}
export default defineConfig({plugins:[react(),{name:'book-static-assets',closeBundle(){
 for(const name of fs.readdirSync('.')){
  if(name==='assets')fs.cpSync(name,'dist/assets',{recursive:true});
  else if(/\.(css|svg|png|jpg|webp|mp3)$/.test(name))fs.copyFileSync(name,path.join('dist',name));
 }
 const spa = fs.readFileSync('dist/index.html','utf8');
 const metas = JSON.parse(fs.readFileSync('src/route-meta.json','utf8'));
 for(const [file, m] of Object.entries(metas)){
  if(file==='index.html')continue;
  fs.writeFileSync(path.join('dist',file), stamp(spa,file,m));
 }
}}],build:{outDir:'dist',emptyOutDir:true,rolldownOptions:{input:{main:'index.html'}}},server:{host:'127.0.0.1'}});
