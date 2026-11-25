// KB A1.1 page 21 item e: any correction that names Nicole, her Austrian origin (Wien or Österreich)
// and Munich is accepted; wrong places and missing parts are not. Mirrors NativeKb11 grade().
const fs=require('fs');
const d=JSON.parse(fs.readFileSync('src/native-kb11/p21.json','utf8'));
const f=d.fields.find(x=>x.id==='t1e');
const norm=s=>s.normalize('NFC').toLocaleLowerCase('de').trim().replace(/[.!?]+$/,'').replace(/\s+/g,' ');
const ok=v=>{const cur=norm(v);return f.answer.split('|').some(a=>norm(a)===cur)||(cur.length>0&&f.kw.every(k=>k.split('|').some(x=>cur.includes(norm(x)))))};
const yes=['Nicole kommt aus Wien und studiert in München.','Nicole kommt aus Österreich und studiert in München','nicole kommt aus österreich und studiert in münchen.','Nicole kommt aus Österreich und studiert in Muenchen.'];
const no=['Nicole kommt aus Graz und studiert in Wien.','Nicole kommt aus Deutschland und studiert in München.','Nicole kommt aus Österreich.','Nicole studiert in München.','Paco kommt aus Österreich und studiert in München.',''];
let bad=0;
for(const v of yes) if(!ok(v)){console.log('FAIL should accept:',v);bad++}
for(const v of no) if(ok(v)){console.log('FAIL should reject:',v);bad++}
if(bad)process.exit(1);console.log('kb11 p21 item e checker ok');
