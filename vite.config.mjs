import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
// Static files keep their original URL, and copyrighted source PDFs stay excluded.
export default defineConfig({plugins:[react(),{name:'book-static-assets',closeBundle(){
 for(const name of fs.readdirSync('.')){
  if(name==='assets')fs.cpSync(name,'dist/assets',{recursive:true});
  else if(/\.(css|svg|png|jpg|webp|mp3)$/.test(name))fs.copyFileSync(name,path.join('dist',name));
 }
}}],build:{outDir:'dist',emptyOutDir:true,rolldownOptions:{input:Object.fromEntries(fs.readdirSync('.').filter(n=>n.endsWith('.html')).map(n=>[n,n]))}},server:{host:'127.0.0.1'}});
