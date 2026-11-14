import {useNativeCanvas,Canvas,Words} from './shared';
import {LinedArea} from '../components/LinedArea';
import {LineMatching} from '../exercises/LineMatching';

export function NativeAB12L24({page}:{page:string}){
 const c=useNativeCanvas(page);
 const {text,art,field,check,title,rule}=c;const set=c.set;
 const conf98=(id:string,y:number)=><>{[0,1,2].map(cc=>c.dot(id,''+cc,650+cc*29.5,y,'Selbsteinschätzung '+id+' '+['gut','mittel','noch nicht'][cc],false,'naDot98'))}</>;
 const sect98=(y:number,t:string,tag:string)=><div className="naText naSect98" style={{left:78,top:y}}><Words text={t}/> <span className="naTag98">{tag}</span></div>;
 const conf99=(id:string,y:number)=><>{[0,1,2].map(cc=>c.dot(id,''+cc,646.6+cc*28.9,y,'Selbsteinschätzung '+id+' '+['gut','mittel','noch nicht'][cc],false,'naDot99'))}</>;
 const mix102=(x:number,y:number,w:number,segs:[string,(boolean|number)?][],fs=12.5)=><div className="naText naCell102 naNw" style={{left:x,top:y,width:w,fontSize:fs}}>{segs.map((s,i)=>s[1]?<span key={i} className="naRed102">{s[0]}</span>:<Words key={i} text={s[0]}/>)}</div>;
 const mix103=(x:number,y:number,w:number,segs:[string,(boolean|number)?][],fs=12.5)=><div className="naText naCell103 naNw" style={{left:x,top:y,width:w,fontSize:fs}}>{segs.map((s,i)=>s[1]===1?<span key={i} className="naRed103">{s[0]}</span>:s[1]===2?<span key={i} className="naBold103">{s[0]}</span>:s[1]===3?<span key={i} className="naBold103 naIt103">{s[0]}</span>:s[1]===4?<span key={i} className="naIt103">{s[0]}</span>:<Words key={i} text={s[0]}/>)}</div>;
 const tx103=(x:number,y:number,b:number,t:string,cls='naCell103 naNw',fs=12.5)=>text(x,y,w102(t,fs),t,cls,fs);
 const tx102=(x:number,y:number,b:number,t:string,cls='naCell102 naNw',fs=12.5)=>text(x,y,w102(t,fs),t,cls,fs);
 const w102=(t:string,fs:number)=>t.length*fs*0.6+10;
 const mix104=(x:number,y:number,w:number,segs:[string,(boolean|number)?][],fs=12.5)=>{return <div className="naText naCell104 naNw" style={{left:x,top:y,width:w,fontSize:fs}}>{segs.map((s,i)=>s[1]===1?<span key={i} className="naRed104">{s[0]}</span>:s[1]===2?<span key={i} className="naBold104">{s[0]}</span>:s[1]===3?<span key={i} className="naBold104 naIt104">{s[0]}</span>:s[1]===4?<span key={i} className="naIt104">{s[0]}</span>:<Words key={i} text={s[0]}/>)}</div>;};
 const tx104=(x:number,y:number,b:number,t:string,cls='naCell104 naNw',fs=12.5)=>{if(cls.indexOf('naCell104')>=0||cls.indexOf('naRed104')>=0){fs=Math.round(fs*94.3)/100;y=y+0.25;}return text(x,y,w102(t,fs),t,cls,fs);};
 const bul104=(cx:number,cy:number,fill:string)=><svg className="naBul104" style={{left:cx-4,top:cy-4,width:8,height:8}} viewBox="0 0 8 8" aria-hidden="true"><circle cx="4" cy="4" r="3" fill={fill}/></svg>;
 const sect99=(y:number,t:string,tag:string)=><div className="naText naSect99" style={{left:78,top:y}}><Words text={t}/> <span className="naTag99">{tag}</span></div>;
 return <Canvas page={page} root={c.root} player={c.player} scale={c.scale}>
 {page==='96'&&<>
  {text(80,54,610,'WIEDERHOLUNGSSTATION: WORTSCHATZ','naHead96 naNw',28.5)}
  {title('1',80,123,560,'Wie sieht Constanze aus? Ergänzen Sie die Kleidungsstücke.','naRB naNw naT96')}
  {text(111,155.5,16,'a','naBookSerif naBk88')}{text(130,155.5,30,'Ihre','naBookSerif naBk88 naNw',14)}{field('96-1a',161,150,116,'1 a')}{text(282,155.5,18,'ist','naBookSerif naBk88 naNw',14)}{text(302,155.5,40,'blau.','naBookSerif naBk88 naNw',14)}
  {text(111,174.5,16,'b','naBookSerif naBk88')}{text(130,174.5,25,'Ihr','naBookSerif naBk88 naNw',14)}{field('96-1b',154,170,115,'1 b')}{text(275,174.5,18,'ist','naBookSerif naBk88 naNw',14)}{text(296,174.5,26,'rot.','naBookSerif naBk88 naNw',14)}
  {text(111,193.5,16,'c','naBookSerif naBk88')}{text(130,193.5,25,'Ihr','naBookSerif naBk88 naNw',14)}{field('96-1c',154,189,115,'1 c')}{text(275,193.5,18,'ist','naBookSerif naBk88 naNw',14)}{text(295,193.5,35,'gelb.','naBookSerif naBk88 naNw',14)}
  {text(382,154.5,16,'d','naBookSerif naBk88')}{text(402,154.5,30,'Ihre','naBookSerif naBk88 naNw',14)}{field('96-1d',435,150,114,'1 d')}{text(555,154.5,18,'ist','naBookSerif naBk88 naNw',14)}{text(575,154.5,28,'lila.','naBookSerif naBk88 naNw',14)}
  {text(382,173.5,16,'e','naBookSerif naBk88')}{text(402,173.5,30,'Ihre','naBookSerif naBk88 naNw',14)}{field('96-1e',435,169,115,'1 e')}{text(554,173.5,22,'sind','naBookSerif naBk88 naNw',14)}{text(587,173.5,45,'braun.','naBookSerif naBk88 naNw',14)}
  {text(382,193.5,16,'f','naBookSerif naBk88')}{text(402,193.5,30,'Ihre','naBookSerif naBk88 naNw',14)}{field('96-1f',435,188,113,'1 f')}{text(555,193.5,18,'ist','naBookSerif naBk88 naNw',14)}{text(574,193.5,38,'grün.','naBookSerif naBk88 naNw',14)}
  {art('clown',650,110,80,152)}
  {check('96-1',606,214,{'96-1a':'Jacke','96-1b':'Rock','96-1c':'Gürtel','96-1d':'Strumpfhose','96-1e':'Haare','96-1f':'Mütze'})}
  {title('2',80,241,300,'Rätsel','naRB naNw naT96')}
  {text(88,273,16,'a','naLab96 naNw',14)}{text(113,270,605,'Lesen Sie die Sätze und ergänzen Sie die Tabelle. Zu drei Feldern gibt es keine Information.','naInstr96 naNw',14.5)}
  {[300.5,320.5,339.5,359.5,378.5,397.5,417.5,436.5,456.5].map((t,i)=><span key={i}>{text(112,t+1,15,String(i+1),'naBookSerif naBk88')}{text(130,t,600,['Carla hat am 14. November Geburtstag.','Hannah macht dieses Jahr Urlaub in Schweden. Sie hat schon einen Reiseführer gekauft.','Julia liebt Strumpfhosen. Sie trägt sie immer, auch im Sommer.','Beate wohnt seit Januar in der Schweiz, in Bern. Sie hat am 5. Februar Geburtstag.','Eine Frau zieht nicht gern Hosen an. Sie lebt in Hamburg und macht Urlaub in Dänemark.','Eine Frau macht Urlaub in Frankreich. Sie ist elegant und trägt gerne einen Hut.','Julia wohnt in Rom.','Eine Frau hat am 9. April Geburtstag. Es ist nicht Hannah.','Eine Frau wohnt in Wien. Sie trägt nur Hosen.'][i],'naBookSerif naBk88 naNw',14)}</span>)}
  <div style={{position:'absolute',left:112,top:486,width:160,height:125,background:'#f5eecc'}}/>
  {[112,272,386,500,614,728].map(x=><div key={'v'+x} style={{position:'absolute',left:x,top:486,width:1,height:125,background:'#e6e8d2'}}/>)}
  {[486,511,536,561,586,611].map(y=><div key={'h'+y} style={{position:'absolute',left:112,top:y,width:616,height:1,background:'#e6e8d2'}}/>)}
  {text(118,491.5,60,'Name','naBookSerif naBk88 naTbL96 naNw',13.7)}
  {text(118,516.5,130,'macht Urlaub in ...','naBookSerif naBk88 naTbL96 naNw',13.7)}
  {text(118,541.5,140,'hat am ... Geburtstag','naBookSerif naBk88 naTbL96 naNw',13.7)}
  {text(117,566,100,'trägt gern ...','naBookSerif naBk88 naTbL96 naNw',13.7)}
  {text(117,592.5,100,'wohnt in ...','naBookSerif naBk88 naTbL96 naNw',13.7)}
  {art('name1',274,490,36,18)}{art('name2',389,487,43,26)}{art('name3',502,490,31,18)}{art('name4',617,489,40,18)}
  {art('datum',276,540,36,18)}
  {field('96-2uc',277,513.5,106,'2 Urlaub Carla','naCell96')}{field('96-2uh',390,513.5,106,'2 Urlaub Hannah','naCell96')}{field('96-2ub',616,513.5,106,'2 Urlaub Beate','naCell96')}
  {field('96-2gj',503,538.5,106,'2 Geburtstag Julia','naCell96')}{field('96-2gb',616,538.5,106,'2 Geburtstag Beate','naCell96')}
  {field('96-2th',390,563.5,106,'2 trägt gern Hannah','naCell96')}{field('96-2tj',503,563.5,106,'2 trägt gern Julia','naCell96')}{field('96-2tb',616,563.5,106,'2 trägt gern Beate','naCell96')}
  {field('96-2wc',277,588.5,106,'2 wohnt in Carla','naCell96')}{field('96-2wh',390,588.5,106,'2 wohnt in Hannah','naCell96')}{field('96-2wj',503,588.5,106,'2 wohnt in Julia','naCell96')}{field('96-2wb',616,588.5,106,'2 wohnt in Beate','naCell96')}
  {text(88,632,16,'b','naLab96 naNw',14)}{text(113,628,190,'Beantworten Sie die Fragen.','naInstr96 naNw',14.5)}
  {text(112,652.5,620,'Wer hat am 29. August Geburtstag? Wer macht Urlaub in Spanien? Wer trägt gern Röcke?','naBookSerif naBk88 naNw',14)}
  {check('96-2',686,674,{'96-2uc':'Dänemark','96-2uh':'Schweden','96-2ub':'Frankreich','96-2gj':'9.4.|9.4|09.04.','96-2gb':'5.2.|5.2|05.02.','96-2th':'Hosen','96-2tj':'Strumpfhosen','96-2tb':'Hut','96-2wc':'Hamburg','96-2wh':'Wien','96-2wj':'Rom','96-2wb':'Bern'})}
  {title('3',80,698,360,'Wie ist das Wetter? Ordnen Sie zu.','naRB naNw naT96')}
  {text(112,729.5,16,'a','naBookSerif naBk88')}{text(130,732.5,80,'Ist es windig?','naBookSerif naBk88 naQ96 naNw',11.75)}
  {text(131,748.5,20,'Ja,','naBookSerif naBk88 naNw',14)}{text(200,748.5,40,'es ist','naBookSerif naBk88 naNw',14)}
  {text(132,768.5,35,'Nein,','naBookSerif naBk88 naNw',14)}{text(200,768.5,15,'es','naBookSerif naBk88 naNw',14)}
  {text(112,797.5,16,'b','naBookSerif naBk88')}{text(130,799.5,65,'Ist es kalt?','naBookSerif naBk88 naQ96 naNw',11.75)}
  {text(131,816.5,20,'Ja,','naBookSerif naBk88 naNw',14)}{text(200,816.5,50,'es sind','naBookSerif naBk88 naNw',14)}
  {text(125,837.5,35,'Nein,','naBookSerif naBk88 naNw',14)}{text(200,837.5,35,'es ist','naBookSerif naBk88 naNw',14)}
  {text(445,729.5,16,'c','naBookSerif naBk88')}{text(464,731.5,110,'Scheint die Sonne?','naBookSerif naBk88 naQ96 naNw',11.75)}
  {text(463,748.5,20,'Ja,','naBookSerif naBk88 naNw',14)}{text(557,748.5,45,'es gibt','naBookSerif naBk88 naNw',14)}
  {text(465,770.5,35,'Nein,','naBookSerif naBk88 naNw',14)}{text(557,770.5,50,'es sind','naBookSerif naBk88 naNw',14)}
  {text(445,797.5,16,'d','naBookSerif naBk88')}{text(465,799.5,60,'Regnet es?','naBookSerif naBk88 naQ96 naNw',11.75)}
  {text(463,818.5,55,'Ja, aber','naBookSerif naBk88 naNw',14)}{text(557,818.5,15,'es','naBookSerif naBk88 naNw',14)}
  {text(465,856.5,70,'Nein, aber','naBookSerif naBk88 naNw',14)}{text(558,856.5,35,'es ist','naBookSerif naBk88 naNw',14)}
  <svg style={{position:'absolute',left:0,top:0,width:807,height:1094,pointerEvents:'none'}} viewBox="0 0 807 1094" aria-hidden="true"><path d="M168 776.5 H196.5 M216 777.5 H229 C240 776,241 767,249 760 C253 757,258 756.5,277 756.5" fill="none" stroke="#5b84bd" strokeWidth="2"/></svg>
  {art('snow',350,730,50,37)}{art('sun',686,734,54,40)}{art('thermo',341,836,54,46)}{art('scribble',711,816,59,39)}
  <LineMatching id="96-3lb" left={['','']} right={['schneit.','sonnig.','windig und neblig.','warm.']} values={c.values} onMatch={set} leftX={131} rightX={239} leftWidth={117} rightWidth={185} ys={[816.5,837.5]} rightYs={[743.5,764.5,812.5,835.5]} rightXs={[276,276,276,276]} leftDotXs={[258,258]} leftDotYs={[824.5,845.5]} rightDotYs={[757,778.5,827,850]} rightDots={false} dotR={4} width={807} height={1094} fontSize={14} itemHeights={[19,19]} lineHeight={19} className="lmScanFont lm96"/>
  <LineMatching id="96-3r" left={['','','','']} right={['27 Grad.','Wolken.','neblig und\nbewölkt.','donnert und blitzt.']} values={c.values} onMatch={set} leftX={464} rightX={586} leftWidth={140} rightWidth={190} ys={[748.5,770.5,818.5,856.5]} rightYs={[752.5,770.5,815,854.5]} rightXs={[621,621,621,621]} leftDotXs={[614,614,614,614]} leftDotYs={[756.5,778.5,826.5,864.5]} rightDotYs={[757.5,776,839.5,864]} rightDots={false} dotR={3} rightFontSizes={[13,13.5,13,14.3]} width={807} height={1094} fontSize={13} itemHeights={[19,19,19,19]} rightHeights={[19,19,37,19]} multiline={true} lineHeight={18.5} className="lmScanFont lm96"/>
  {title('4',80,883,300,'Ergänzen Sie die SMS.','naRB naNw naT96')}
  <div className="naCard96" style={{left:112,top:910,width:146,height:122}}/><div className="naCard96" style={{left:268,top:910,width:148,height:122}}/><div className="naCard96" style={{left:428,top:910,width:148,height:122}}/><div className="naCard96" style={{left:588,top:910,width:151,height:122}}/>
  {text(120,915,16,'a','naBookSerif naBk88 naLab4b96',13.5)}{text(277,915,16,'b','naBookSerif naBk88 naLab4b96',13.5)}{text(440,915,16,'c','naBookSerif naBk88 naLab4b96',13.5)}{text(600,915,16,'d','naBookSerif naBk88 naLab4b96',13.5)}
  {text(123,934,120,'Hallo Ihr Lieben,','naSMS96 naNw',13)}{text(123,952.5,50,'Frohe','naSMS96 naNw',13)}
  {field('96-4a1',120,964,106,'4 a 1')}
  {text(123,989,115,'und ein gutes neues','naSMS96 naNw',13)}
  {field('96-4a2',122,1001,106,'4 a 2')}{text(231,1005.5,10,'!','naSMS96 naNw',13)}
  {text(278,934,70,'Eine 2 in der','naSMS96 naNw',13)}{text(278,952.5,100,'Englisch-Prüfung?','naSMS96 naNw',13)}
  {text(277,970.5,25,'Gut','naSMS96 naNw',13)}{field('96-4b',303,964,105,'4 b')}{text(406,970.5,10,'!','naSMS96 naNw',13)}
  {text(440,934,95,'Lieber Ben, alles','naSMS96 naNw',13)}
  {field('96-4c',439,946,105,'4 c')}
  {text(440,972,115,'zum 30. Geburtstag!','naSMS96 naNw',13)}
  {text(600,934,65,'Herzlichen','naSMS96 naNw',13)}
  {field('96-4d',599,946,106,'4 d')}
  {text(599,972,80,'zum Baby! Wir','naSMS96 naNw',13)}
  {text(600,988.5,115,'besuchen Euch bald.','naSMS96 naNw',13)}
  {check('96-4',686,1008,{'96-4a1':'Weihnachten','96-4a2':'Jahr','96-4b':'gemacht','96-4c':'Gute','96-4d':'Glückwunsch'})}
  {art('modul8-tab',0,1049,50,20)}
  <div className="naText naFoot88" style={{left:62,top:1052,width:200}}>96&nbsp;&nbsp;|&nbsp;&nbsp;sechsundneunzig</div>
 </>}
 {page==='98'&&<>
  {text(79,58.1,330,'SELBSTEINSCHÄTZUNG','naHead98 naNw',26.9)}
  {art('script',416,56,154,34)}
  {text(78,124.5,130,'Ich kann jetzt …','naKann98 naNw')}
  {art('lights',645,118,83,25)}
  {sect98(148,'… Kleidung bewerten:','L22')}{conf98('s1',153)}
  <div className="naSq98" style={{left:95,top:172,width:7,height:7}}/>
  {text(109,168.5,90,'Welches Kleid','naBookSerif naBody98 naNw',12.4)}{field('98-1a',196,161.9,98,'1 Welches Kleid')}{text(297,168.5,110,'du am schönsten?','naBookSerif naBody98 naNw',12.4)}
  <div className="naTr98" style={{left:96,top:191.5}}/>
  {text(111,188,110,'Das hier. Und du?','naBookSerif naBody98 naNw',12.4)}
  <div className="naSq98" style={{left:95,top:211,width:7,height:7}}/>
  {text(110,207.8,25,'Mir','naBookSerif naBody98 naNw',12.1)}{field('98-1c',135,200.9,97,'1 Mir')}{text(235,207.8,95,'das hier besser.','naBookSerif naBody98 naNw',12.1)}
  {check('98-1',745,144,{'98-1a':'findest|magst','98-1c':'gefällt'})}
  {sect98(242,'… Kleidung beschreiben:','L22')}{conf98('s2',247)}
  {text(96,261.4,10,'M','naBookSerif naBody98 naNw',12.5)}{field('98-2a1',107,255.9,58,'2 Mein')}{text(170,261.4,100,'Lieblings-T-Shirt','naBookSerif naBody98 naNw',12.5)}{field('98-2a2',271,255.9,79,'2 habe')}{text(353,261.4,185,'ich bei einem Konzert gekauft.','naBookSerif naBody98 naNw',12.5)}
  {text(96,279.35,20,'Ich','naBookSerif naBody98 naNw',12.6)}{text(119,279.35,5,'t','naBookSerif naBody98 naNw',12.6)}{field('98-2b1',123,272.9,78,'2 trage')}{text(205,279.35,85,'es oft. Zuletzt','naBookSerif naBody98 naNw',12.6)}{text(291,279.35,7,'h','naBookSerif naBody98 naNw',12.6)}{field('98-2b2',299,272.9,78,'2 hatte')}{text(381,279.35,150,'ich es letzten Montag an.','naBookSerif naBody98 naNw',12.6)}
  {check('98-2',745,238,{'98-2a1':'ein|Mein','98-2a2':'habe','98-2b1':'rage|trage','98-2b2':'atte|hatte'})}
  {sect98(315,'… Aussagen verstärken:','L22')}{conf98('s3',320)}
  <div className="naSq98" style={{left:96,top:339,width:7,height:7}}/>
  {text(109,336.95,235,'Wow, hast du das Kleid schon gesehen?','naBookSerif naBody98 naNw',12.5)}{text(347,336.95,7,'T','naBookSerif naBody98 naNw',12.5)}{field('98-3a',354,328.9,78,'3 Total')}{text(436,336.95,40,'schön.','naBookSerif naBody98 naNw',12.5)}
  <div className="naTr98" style={{left:96,top:358.5}}/>
  {text(111,355.95,200,'Was? Das gefällt dir? Das ist doch','naBookSerif naBody98 naNw',12.5)}{text(314,355.95,9,'w','naBookSerif naBody98 naNw',12.5)}{field('98-3b',324,347.9,97,'3 wirklich')}{text(425,355.95,68,'langweilig.','naBookSerif naBody98 naNw',12.5)}
  <div className="naCi98" style={{left:96,top:378.5,width:7.5,height:7.5}}/>
  {text(110,373.95,160,'Aber seht mal, das hier ist','naBookSerif naBody98 naNw',12.5)}{text(271,373.95,5,'r','naBookSerif naBody98 naNw',12.5)}{field('98-3c',276,367.9,98,'3 richtig')}{text(378,373.95,25,'toll.','naBookSerif naBody98 naNw',12.5)}
  {check('98-3',745,311,{'98-3a':'otal|Total','98-3b':'irklich|wirklich','98-3c':'ichtig|richtig'})}
  {sect98(410,'… Gründe angeben:','L23')}{conf98('s4',414)}
  {text(96,428.95,145,'Unser Ziel war Südtirol,','naBookSerif naBody98 naNw',12.5)}{field('98-4',243,421.9,78,'4 denn')}{text(325,428.95,245,'dort ist es im März schon oft sehr warm.','naBookSerif naBody98 naNw',12.5)}
  {check('98-4',745,405,{'98-4':'denn'})}
  {sect98(464,'… über das Wetter sprechen:','L23')}{conf98('s5',468)}
  <div className="naSq98" style={{left:96,top:488,width:7,height:7}}/>
  {field('98-5a',110,477.9,77,'5 Wie')}{text(191,484.45,145,'ist das Wetter bei euch?','naBookSerif naBody98 naNw',12.5)}
  <div className="naTr98" style={{left:97,top:506.5}}/>
  {text(111,503.35,40,'Super,','naBookSerif naBody98 naNw',12.6)}{field('98-5b1',152,496.9,233,'5 die Sonne')}{text(389,503.35,105,'scheint und es ist','naBookSerif naBody98 naNw',12.6)}{field('98-5b2',497,496.9,104,'5 warm')}{text(604,503.35,5,'.','naBookSerif naBody98 naNw',12.6)}
  {art('thermo',546,455,64,63)}
  {check('98-5',745,459,{'98-5a':'ie|Wie','98-5b1':'die Sonne','98-5b2':'warm|heiß|sonnig|schön'})}
  {sect98(539,'… über Wünsche sprechen:','L24')}{conf98('s6',543)}
  {field('98-6a1',96,551.9,58,'6 Was')}{text(157,557.95,205,'würdest du am liebsten jeden Tag','naBookSerif naBody98 naNw',12.5)}{text(362,557.95,10,'m','naBookSerif naBody98 naNw',12.5)}{field('98-6a2',373,551.9,88,'6 machen')}{text(461,557.95,6,'?','naBookSerif naBody98 naNw',12.5)}
  {text(97,576.95,18,'Ich','naBookSerif naBody98 naNw',12.5)}{field('98-6b',133,569.9,463,'6 Ich würde')}{text(602,576.95,5,'.','naBookSerif naBody98 naNw',12.5)}
  {text(97,595.05,195,'(gern meinen Geburtstag feiern)','naBookSerif naBody98 naNw',12.4)}
  {check('98-6',745,534,{'98-6a1':'Was','98-6a2':'machen|achen','98-6b':'würde gern meinen Geburtstag feiern|würde meinen Geburtstag feiern'})}
  {sect98(631,'… gratulieren:','L24')}{conf98('s7',634)}
  {text(96,649.95,7,'F','naBookSerif naBody98 naNw',12.5)}{field('98-7a1',103,641.9,78,'7 Frohe')}{text(184,649.95,10,'W','naBookSerif naBody98 naNw',12.5)}{field('98-7a2',196,641.9,176,'7 Weihnachten')}{text(373,649.95,6,'!','naBookSerif naBody98 naNw',12.5)}{text(382,649.95,7,'/','naBookSerif naBody98 naNw',12.5)}{text(390,649.95,7,'H','naBookSerif naBody98 naNw',12.5)}{field('98-7a3',398,641.9,94,'7 Herzlichen')}
  {text(96,667.95,7,'G','naBookSerif naBody98 naNw',12.5)}{field('98-7b1',104,659.9,107,'7 Glückwunsch')}{text(214,667.95,6,'!','naBookSerif naBody98 naNw',12.5)}{text(223,667.95,7,'/','naBookSerif naBody98 naNw',12.5)}{text(231,667.95,8,'A','naBookSerif naBody98 naNw',12.5)}{field('98-7b2',236,659.9,69,'7 Alles')}{text(308,667.95,7,'G','naBookSerif naBody98 naNw',12.5)}{field('98-7b3',316,659.9,68,'7 Gute')}{text(385,667.95,6,'!','naBookSerif naBody98 naNw',12.5)}
  {check('98-7',745,625,{'98-7a1':'rohe|Frohe','98-7a2':'eihnachten|Weihnachten','98-7a3':'erzlichen|Herzlichen','98-7b1':'lückwunsch|Glückwunsch','98-7b2':'lles|Alles','98-7b3':'ute|Gute'})}
  {text(79,709.5,130,'Ich kenne …','naKenn98 naNw')}
  {sect98(733,'… 8 Kleidungsstücke:','L22')}{conf98('s8',736)}
  {text(97,750.85,285,'Diese Kleidungsstücke habe ich oft an/mag ich:','naBookSerif naBody98 naNw',12.6)}
  {field('98-8a',96,762.9,500,'8 oft an')}
  {text(97,786.55,345,'Diese Kleidungsstücke habe ich nie an/mag ich nicht so:','naBookSerif naBody98 naNw',12.9)}
  {field('98-8b',96,799.4,500,'8 nie an')}
  {sect98(841,'… 6 Wörter zum Thema Wetter:','L23')}{conf98('s9',846)}
  {text(96,860.05,138,'So mag ich das Wetter:','naBookSerif naBody98 naNw',12.4)}
  {field('98-9a',234,853.9,362,'9 mag Wetter')}
  {text(96,877.95,172,'So mag ich das Wetter nicht:','naBookSerif naBody98 naNw',12.5)}
  {field('98-9b',270,871.9,326,'9 mag Wetter nicht')}
  {sect98(914,'… die 4 Himmelsrichtungen:','L23')}{conf98('s10',918)}
  {field('98-10',96,925.9,500,'10 Himmelsrichtungen')}
  {sect98(968,'… 5 Wörter zum Thema Feste und Feiern:','L24')}{conf98('s11',972)}
  {text(97,987.6,34,'Feste:','naBookSerif naBody98 naNw',11.8)}{field('98-11f',133,979.9,463,'11 Feste')}
  {text(97,1006.05,47,'Verben:','naBookSerif naBody98 naNw',12.4)}{text(147,1006.05,18,'gra','naBookSerif naBody98 naNw',12.4)}{field('98-11v1',165,997.9,126,'11 gratulieren')}{text(294,1006.05,7,',','naBookSerif naBody98 naNw',12.4)}{text(302,1006.05,20,'sch','naBookSerif naBody98 naNw',12.4)}{field('98-11v2',322,997.9,138,'11 schenken')}{text(460,1006.05,6,',','naBookSerif naBody98 naNw',12.4)}{text(466,1006.05,12,'fei','naBookSerif naBody98 naNw',12.4)}{field('98-11v3',481,997.9,115,'11 feiern')}
  <div className="naText naBadge98" style={{left:0,top:1051,width:54,height:17}}>Modul 8</div>
  <div className="naText naFoot98" style={{left:59,top:1052,width:200}}><b>98</b>&nbsp;&nbsp;|&nbsp;&nbsp;achtundneunzig</div>
 </>}
 {page==='99'&&<>
  {text(76.7,58.1,330,'SELBSTEINSCHÄTZUNG','naHead99 naNw',26.9)}
  {art('script',415,57,154,30)}
  {art('bars',735,31,64,63)}
  {text(78,124.5,150,'Ich kann auch …','naKann99 naNw')}
  {art('lights',641,118,83,24)}
  {sect99(148,'… Kleidung bewerten (Komparation):','L22')}{conf99('s1',148.4)}
  {field('99-1a',95,159.9,135,'1 am besten')}{text(235.1,168.75,215,'(+++, gut) findet sie seine Schuhe.','naBookSerif naBody99 naNw',12.5)}
  {text(95,185.95,68,'Maike mag','naBookSerif naBody99 naNw',12.5)}{field('99-1b',166.5,177.9,112.5,'1 lieber')}{text(284.9,185.95,125,'(++, gern) Beige als Lila.','naBookSerif naBody99 naNw',12.5)}
  {text(95,203.95,140,'Dein T-Shirt ist ja noch','naBookSerif naBody99 naNw',12.5)}{field('99-1c',241.1,196.7,91.7,'1 älter')}{text(338.7,203.95,160,'(++, alt) als das von Marco.','naBookSerif naBody99 naNw',12.5)}
  {check('99-1',742,139.4,{'99-1a':'am besten|besten','99-1b':'lieber','99-1c':'älter'})}
  {sect99(239,'… Kleidung vergleichen (genauso … wie, als):','L22')}{conf99('s2',239.1)}
  {text(95,259.6,95,'Lila (+) mag sie','naBookSerif naBody99 naNw',12.5)}{field('99-2a1',190.3,250.9,85.7,'2 so')}{text(280,259.6,30,'gern','naBookSerif naBody99 naNw',12.5)}{field('99-2a2',311.8,250.9,46.9,'2 wie')}{text(364.6,259.6,55,'Rosa (+).','naBookSerif naBody99 naNw',12.5)}
  {text(96,276.6,195,'Das Hemd (++) gefällt ihr besser','naBookSerif naBody99 naNw',12.5)}{field('99-2b',289.9,267.9,57.8,'2 als')}{text(352.7,276.6,80,'die Hose (+).','naBookSerif naBody99 naNw',12.5)}
  {check('99-2',742,230.1,{'99-2a1':'so','99-2a2':'wie','99-2b':'als'})}
  {sect99(311,'… sagen, wie etwas ist (Adjektive bilden):','L23')}{conf99('s3',309.1)}
  {text(95,329.95,200,'Ohne …: Der Himmel ist wolken','naBookSerif naBody99 naNw',12.5)}{field('99-3',292.9,322.6,46.8,'3 los')}{text(341.5,329.95,8,'.','naBookSerif naBody99 naNw',12.5)}
  {check('99-3',742,300.1,{'99-3':'los'})}
  {sect99(365,'… Gründe angeben (Konjunktion: denn):','L23')}{conf99('s4',364.2)}
  {text(95,384.95,490,'Nächstes Jahr fahren wir lieber ans Mittelmeer. Dort ist es auch im Herbst noch','naBookSerif naBody99 naNw',12.5)}
  {text(95,400.95,75,'schön warm.','naBookSerif naBody99 naNw',12.5)}{art('hw1',176.3,403.6,88.6,11)}{field('99-4a',179.3,395,421.5,'4 fahren wir lieber')}{text(600.4,400.95,8,',','naBookSerif naBody99 naNw',12.5)}
  {art('hw2',95.6,421.6,23.1,11)}{field('99-4b',94.6,413,504.2,'4 denn dort')}{text(600.5,420.95,8,'.','naBookSerif naBody99 naNw',12.5)}
  {check('99-4',742,355.2,{'99-4a':'fahren wir lieber ans Mittelmeer','99-4b':'dort ist es auch im Herbst noch schön warm'})}
  {sect99(455,'… das Datum angeben (Ordinalzahlen):','L24')}{conf99('s5',455.1)}
  {text(95,474.95,138,'Welcher Tag ist heute?','naBookSerif naBody99 naNw',12.5)}{field('99-5a',233,467.9,277,'5 heute')}{text(513,474.95,8,'.','naBookSerif naBody99 naNw',12.5)}{text(521,474.95,72,'(7. September)','naBookSerif naBody99 naNw',12.5)}
  {text(95,492.95,160,'Wann hast du Geburtstag?','naBookSerif naBody99 naNw',12.5)}{field('99-5b',256,485.9,287.8,'5 wann')}{text(545.5,492.95,8,'.','naBookSerif naBody99 naNw',12.5)}{text(553.9,492.95,55,'(16. Juli)','naBookSerif naBody99 naNw',12.5)}
  {check('99-5',742,446.1,{'99-5a':'Heute ist der 7. September|der 7. September|Heute ist der siebte September|der siebte September','99-5b':'am 16. Juli|am sechzehnten Juli'})}
  {sect99(528,'… Wünsche angeben (Konjunktiv II: würde):','L24')}{conf99('s6',525.1)}
  {text(95,546.95,290,'ins Kino / einladen / würde / ich / dich / gern:','naBookSerif naBody99 naNw',12.5)}
  {field('99-6',95,557.9,498.2,'6 würde einladen')}{text(597.5,564.95,8,'.','naBookSerif naBody99 naNw',12.5)}
  {check('99-6',742,516.1,{'99-6':'Ich würde dich gern ins Kino einladen'})}
  {text(77.7,612.7,300,'Üben / Wiederholen möchte ich noch …','naKann99 naNw')}
  {field('99-7',78.7,628.4,513,'7 üben')}
  {text(77.7,710.1,160,'RÜCKBLICK','naHead99 naNw',20.6)}
  {text(77.7,765.5,295,'Wählen Sie eine Aufgabe zu Lektion','naWahl99 naNw')}
  <div className="naText naNum22" style={{left:366.6,top:769,width:32,height:15}}>22</div>
  <div className="naRuleR99" style={{left:398.5,top:782,width:321}}/>
  {art('icon1',47.8,812,24,26)}
  <div className="naText naNum99" style={{left:85.7,top:817,width:15,height:15}}>1</div>
  {text(109.6,817,610,'Lesen Sie noch einmal den Forumsbeitrag von Marco im Kursbuch auf Seite 59.','naAufg99 naNw')}
  {text(109.6,836.7,300,'Schreiben Sie einen Kommentar.','naAufg99 naNw',14.4)}
  <div className="naYelB99" style={{left:109.6,top:865.2,width:388.6,height:15}}/>
  {text(114.6,865.2,382,'Ich finde dein T-Shirt … | Super / Nicht so gut finde ich … | …','naYel99 naNw')}
  {art('icon2',44.8,908,30,32)}
  <div className="naText naNum99" style={{left:85.7,top:913,width:15,height:15}}>2</div>
  {text(109.6,914.5,620,'Haben Sie auch ein Lieblingskleidungsstück? Schreiben Sie einen Beitrag im Forum.','naAufg99 naNw')}
  <div className="naYelB99" style={{left:109.6,top:943.1,width:338.7,height:15}}/>
  {text(114.6,943.7,335,'Mein/e Lieblingspullover / Lieblings… ist … Jahre alt.','naYel99 naNw')}
  <div className="naYelB99" style={{left:109.6,top:962.1,width:418.4,height:15}}/>
  {text(114.6,962.7,410,'Ich habe ihn/sie/es … gekauft. / Er/Sie/Es ist ein Geschenk von …','naYel99 naNw')}
  <div className="naYelB99" style={{left:110.6,top:982.1,width:142.5,height:15}}/>
  {text(114.6,981.7,135,'Ich finde ihn/sie/es …','naYel99 naNw')}
  <div className="naYelB99" style={{left:110.6,top:1002.1,width:23.9,height:15}}/>
  {text(114.6,1002.2,20,'…','naYel99 naNw')}
  <div className="naText naFoot99 naNw" style={{left:597,top:1050,width:141}}>neunundneunzig&nbsp;|&nbsp;99</div>
  <div className="naText naBadge99" style={{left:749.2,top:1052,width:46.8,height:14}}>Modul 8</div>
 </>}
 {page==='100'&&<>
  {text(81.5,50.3,165,'RÜCKBLICK','naHead100 naNw',28.5)}
  {text(80.5,121.9,290,'Wählen Sie eine Aufgabe zu Lektion','naWahl100 naNw')}
  <div className="naText naLsn100" style={{left:370,top:125,width:21.5,height:13.5}}>23</div>
  <div className="naRuleR100" style={{left:392,top:138.2,width:334}}/>
  {art('icon1',46,165,32,31)}
  <div className="naText naNum100" style={{left:84.5,top:172.5,width:15,height:15}}>1</div>
  {text(112.5,170.9,592,'Lesen Sie noch einmal die Blogbeiträge im Kursbuch auf Seite 62 und ergänzen','naAufg100 naNw',16.3)}
  {text(112.5,191.2,110,'Sie die Tabelle.','naAufg100 naNw',16.3)}
  <div className="naTabF100" style={{left:112,top:219,width:620,height:23}}/>
  <svg className="naPipeSvg100" viewBox="0 0 807 1094"><rect x="112" y="219" width="1" height="89"/><rect x="287.5" y="219" width="1" height="89"/><rect x="450" y="219" width="1" height="89"/><rect x="572.5" y="219" width="1" height="89"/><rect x="732" y="219" width="1" height="89"/><rect x="112" y="242" width="620" height="1"/><rect x="112" y="263.5" width="620" height="1"/><rect x="112" y="308" width="620" height="1"/></svg>
  {text(293,221.5,105,'Tom und Hanna','naTabH100 naNw',12.1)}
  {text(456,221.5,95,'Familie Encke','naTabH100 naNw',12.1)}
  {text(579,221.5,155,'Beat, Karla und Franca','naTabH100 naNw',12.1)}
  {text(118,244.9,150,'Wo waren die Personen?','naQ100 naNw',12.5)}
  {text(118,269.9,160,'Was waren die Probleme? /','naQ100 naNw',12.5)}
  {text(118,286.9,100,'Was ist passiert?','naQ100 naNw',12.5)}
  {art('hw1',291,245,48,16)}
  {art('hw2',291,268,156,35)}
  {field('100-1ew',455.5,243,109,'1 Familie Encke Ort','naFieldBlank')}
  {field('100-1bw',578,243,147,'1 Beat Karla Franca Ort','naFieldBlank')}
  <LinedArea id="100-1ep" values={c.values} set={set} x={455.5} tops={[266,286]} w={109} label="1 Familie Encke Probleme" rules={false} boxH={20} className="naFieldBlank"/>
  <LinedArea id="100-1bp" values={c.values} set={set} x={578} tops={[266,286]} w={147} label="1 Beat Karla Franca Probleme" rules={false} boxH={20} className="naFieldBlank"/>
  {check('100-1',742,247.5,{'100-1ew':'Schwarzwald|im Schwarzwald','100-1ep':'Es war sehr windig. Nach fünf Minuten war das Hausdach total kaputt|Ein Sturm hat das Hausdach kaputt gemacht','100-1bw':'Ostsee|an der Ostsee|die Ostsee','100-1bp':'Es war fünf Tage lang sehr neblig und kalt|Es war fünf Tage lang neblig und kalt|Es war neblig und kalt'})}
  {art('icon2',40,331,38,32)}
  <div className="naText naNum100" style={{left:84.5,top:337.5,width:15,height:15}}>2</div>
  {text(112.5,335.9,540,'Ins Wasser gefallen? Schreiben Sie einen Beitrag in einem Blog zu einem','naAufg100 naNw',16.3)}
  {text(112.5,355.7,495,'Problemurlaub. Machen Sie zuerst Notizen zu folgenden Punkten:','naAufg100 naNw',16.3)}
  {art('notes',123.5,398,166,68)}
  {text(80.5,539.9,290,'Wählen Sie eine Aufgabe zu Lektion','naWahl100 naNw')}
  <div className="naText naLsn100" style={{left:369.5,top:544,width:21.5,height:13.5}}>24</div>
  <div className="naRuleR100" style={{left:392,top:557.2,width:332}}/>
  {art('icon3',45,583,31,31)}
  <div className="naText naNum100" style={{left:83.5,top:590.5,width:15,height:15}}>1</div>
  {text(112.5,589.9,590,'Lesen Sie noch einmal den Tagebucheintrag von Alisa im Kursbuch auf Seite 66','naAufg100 naNw',16.3)}
  {text(112.5,609.2,245,'und beantworten Sie die Fragen.','naAufg100 naNw',16.3)}
  {text(110.5,639.3,8,'a','naQ100 naNw',15)}{text(129,639.3,155,'Was hat Alisa gefeiert?','naQ100 naNw',14)}{field('100-2a',293.5,633.9,420.5,'1 a')}
  {text(110.5,658.3,8,'b','naQ100 naNw',15)}{text(129,658.3,150,'Wann hat sie gefeiert?','naQ100 naNw',14)}{field('100-2b',293.5,653.9,420.5,'1 b')}
  {text(110.5,677.3,8,'c','naQ100 naNw',15)}{text(129,677.3,135,'Wo hat sie gefeiert?','naQ100 naNw',14)}{field('100-2c',293.5,673.9,420.5,'1 c')}
  {text(110.5,697.3,8,'d','naQ100 naNw',15)}{text(129,697.3,140,'Wer hat mitgefeiert?','naQ100 naNw',14)}{field('100-2d',293.5,692.9,420.5,'1 d')}
  {check('100-2',742,667.5,{'100-2a':'Alisa hat den Heiligen Abend gefeiert|den Heiligen Abend|Heiligen Abend|Weihnachten','100-2b':'Am 24.12.|24.12.|am 24. Dezember|24. Dezember','100-2c':'Sie hat bei Tante Lissy gefeiert|bei Tante Lissy','100-2d':'Ihre Mutter, ihr Vater, ihr Bruder und seine Freundin haben mitgefeiert|Mama, Papa, Holger und Katrin|Mama, Papa, Holger und Katrin haben mitgefeiert'})}
  {art('icon4',40,739,38,32)}
  <div className="naText naNum100" style={{left:83,top:746,width:15,height:15}}>2</div>
  {text(112.5,744.9,520,'Was haben Sie zuletzt gefeiert? Schreiben Sie einen Tagebucheintrag.','naAufg100 naNw',16.3)}
  {text(112.5,764.2,205,'Machen Sie zuerst Notizen.','naAufg100 naNw',16.3)}
  <div className="naDash100" style={{left:110,top:804.2}}/>{text(123,793.7,160,'Was haben Sie gefeiert?','naQ100 naNw',14)}
  <div className="naDash100" style={{left:110,top:823.2}}/>{text(123,812.7,165,'Wann haben Sie gefeiert?','naQ100 naNw',14)}
  <div className="naDash100" style={{left:110,top:843.2}}/>{text(123,832.7,150,'Wo haben Sie gefeiert?','naQ100 naNw',14)}
  <div className="naDash100" style={{left:110,top:862.2}}/>{text(123,851.7,140,'Wer hat mitgefeiert?','naQ100 naNw',14)}
  <div className="naDash100" style={{left:110,top:881.2}}/>{text(123,871.7,160,'Was haben Sie gemacht?','naQ100 naNw',14)}
  <div className="naDash100" style={{left:110,top:901.2}}/>{text(123,890.7,340,'Was hat Ihnen besonders gefallen / nicht gefallen?','naQ100 naNw',15)}
  <div className="naText naBadge100" style={{left:3,top:1050.5,width:43.5,height:13}}>Modul 8</div>
  {text(56.7,1047.5,20,'100','naFoot100 naNw',13.5)}{text(86.9,1047.5,4,'|','naFoot100 naNw',13.5)}{text(100.9,1047.5,50,'hundert','naFoot100 naNw',13.5)}
 </>}
 {page==='101'&&<>
  {art('bg',0,0,807,1094)}
  {text(75.7,54.9,180,'LITERATUR','naLit101 naNw',29)}
  <div className="naText naBan101 naNw" style={{left:78.6,top:141.6,width:245,transform:'rotate(-4.1deg)',transformOrigin:'left top',fontSize:25}}><Words text='WIEDERSEHEN IN WIEN'/></div>
  {text(104.6,189.1,244,'Teil 4: Ein schöner Abend, oder?','naTeil101 naNw',15)}
  {text(104.6,216.5,231.1,'Paul und Anja klingeln. Lisa öffnet die Tür.','naDlg101 naNw',12.0)}
  {text(104.6,236.5,274.0,'„Hallo Paul, hallo Anja! Kommt rein. Es sind schon','naDlg101 naNw',12.0)}
  {text(111.6,255.5,203.2,'viele Leute da. Na, und wer bist du?“','naDlg101 naNw',12.0)}
  {text(105.6,275.4,80.7,'Herr Rossmann bellt.','naDlg101 naNw',12.0)}
  {text(104.6,295.4,135.5,'„Das ist Herr Rossmann.“','naDlg101 naNw',12.0)}
  {text(104.6,314.7,274.0,'„Hallo Herr Rossmann, komm auch rein!“','naDlg101 naNw',12.0)}
  {text(104.6,333.4,292.9,'„Alles Gute zum Geburtstag, Lisa!“, sagt Paul und gibt','naDlg101 naNw',12.0)}
  {text(113.6,353.4,81.7,'ihr die Blumen.','naDlg101 naNw',12.0)}
  {text(104.6,372.4,290.9,'„Oh, danke, die sind schön. Das ist sehr nett von dir,','naDlg101 naNw',12.0)}
  {text(113.6,392.3,262.0,'Paul.“ Sie lächelt. „Ich zeige euch gleich mal die','naDlg101 naNw',12.0)}
  {text(112.6,412.6,59.8,'Wohnung.“','naDlg101 naNw',12.0)}
  {text(105.6,431.3,218.2,'„Wow, die ist wirklich super“, sagt Anja.','naDlg101 naNw',12.0)}
  {text(104.6,451.6,80.7,'„Und so groß.“','naDlg101 naNw',12.0)}
  {text(105.6,470.6,279.0,'„Ich brauche auch eine große Wohnung“, sagt Lisa.','naDlg101 naNw',12.0)}
  {text(113.6,489.2,252.1,'„Ich möchte gern bald eine Familie haben. Ich','naDlg101 naNw',12.0)}
  {text(113.6,509.2,72.7,'liebe Kinder.“','naDlg101 naNw',12.0)}
  {text(105.6,528.5,208.2,'„Kinder?“, fragt Paul. „Bist du …?“','naDlg101 naNw',12.0)}
  {text(437.4,179.8,133.5,'„Nein, noch nicht. Aber mein Freund Franz und ich','naDlg101 naNw',12.0)}
  {text(445.3,199.5,42.8,'wollen bald heiraten.“','naDlg101 naNw',12.0)}
  {text(437.4,218.8,42.8,'„Oh …“','naDlg101 naNw',12.0)}
  {text(438.4,237.5,275.0,'Paul und Anja setzen sich auf ein Sofa und trinken','naDlg101 naNw',12.0)}
  {text(445.3,257.5,163.4,'etwas. Sie hören der Musik zu und sehen die','naDlg101 naNw',12.0)}
  {text(445.3,277.4,97.6,'anderen Leute an.','naDlg101 naNw',12.0)}
  {text(438.4,296.7,259.0,'Dann sagt Anja: „Lisa hat einen Freund. Bist du','naDlg101 naNw',12.0)}
  {text(445.3,316.7,46.8,'traurig?“','naDlg101 naNw',12.0)}
  {text(437.4,335.7,39.9,'„Nein.“','naDlg101 naNw',12.0)}
  {text(437.4,355.7,41.8,'„Doch.“','naDlg101 naNw',12.0)}
  {text(437.4,372.7,222.2,'„O.K., ein bisschen vielleicht“, sagt Paul,','naDlg101 naNw',12.0)}
  {text(437.4,392.6,208.2,'„Weißt du was? Gehen wir spazieren.“','naDlg101 naNw',12.0)}
  {text(437.4,413.3,64.8,'„Gute Idee!“','naDlg101 naNw',12.0)}
  {text(453.3,458.3,281.0,'Es ist warm, der Himmel ist klar, der Mond scheint.','naDlg101 naNw',12.0)}
  {text(452.3,478.6,269.0,'Sie gehen an der Oper vorbei und dann durch die','naDlg101 naNw',12.0)}
  {text(461.3,498.2,88.7,'Kärntner Straße.','naDlg101 naNw',12.0)}
  {text(452.3,517.2,270.0,'„Ist der Stephansdom nicht schön in der Nacht?“,','naDlg101 naNw',12.0)}
  {text(460.3,537.5,56.8,'fragt Anja.','naDlg101 naNw',12.0)}
  {text(452.3,557.5,108.6,'„Oh ja, sehr schön.“','naDlg101 naNw',12.0)}
  {text(452.3,575.2,124.5,'„Bist du noch traurig?“','naDlg101 naNw',12.0)}
  {text(452.3,596.1,133.5,'„Nein, eigentlich nicht.“','naDlg101 naNw',12.0)}
  {text(452.3,615.4,59.8,'„Wirklich?“','naDlg101 naNw',12.0)}
  {text(452.3,634.1,171.4,'„Ja, wirklich.“','naDlg101 naNw',12.0)}
  {text(453.3,653.1,100.6,'Paul sieht Anja an.','naDlg101 naNw',12.0)}
  {text(452.3,673.4,271.0,'‚Was war nur los mit mir”, denkt er. ‚Warum habe','naDlg101 naNw',12.0)}
  {text(461.3,692.1,258.0,'ich Lisa so super gefunden? Sie ist nett, ja, und','naDlg101 naNw',12.0)}
  {text(460.3,712.0,262.0,'sie ist auch hübsch. Aber eigentlich ... finde ich','naDlg101 naNw',12.0)}
  {text(460.3,732.3,84.7,'Anja viel toller.’','naDlg101 naNw',12.0)}
  {text(453.3,751.0,111.6,'Herr Rossmann bellt.','naDlg101 naNw',12.0)}
  {text(452.3,771.0,149.4,'„Ja, genau, Herr Rossmann, das findest du auch,','naDlg101 naNw',12.0)}
  {text(460.3,791.0,33.9,'oder?“','naDlg101 naNw',12.0)}
  {text(452.3,810.0,148.4,'„Was findet Herr Rossmann auch?“, fragt Anja.','naDlg101 naNw',12.0)}
  {text(452.3,828.9,162.4,'„Oh, nichts …“ Paul wird rot.','naDlg101 naNw',12.0)}
  {text(452.3,849.2,283.9,'„Ein schöner Abend, oder?“, sagt er und lächelt Anja','naDlg101 naNw',12.0)}
  {text(460.3,868.9,42.8,'an.','naDlg101 naNw',12.0)}
  {text(453.3,887.9,98.6,'Sie lächelt zurück.','naDlg101 naNw',12.0)}
  {text(452.3,906.9,171.4,'„Ja, wirklich ein schöner Abend …“','naDlg101 naNw',12.0)}
  {text(620.7,1050.5,72,'hunderteins','naFoot101 naNw',14)}{text(705.5,1050.5,6,'|','naFoot101 naNw',14)}{text(719.3,1050.5,18,'101','naFoot101 naNw',14)}
  <div style={{position:'absolute',left:747.2,top:1044.5,width:58,height:23,background:'#c8bc92'}}/>
  {text(750,1048.5,52,'Modul 8','naMod101 naNw',11)}
 </>}
 {page==='102'&&<>
  {text(78,54.6,343,'GRAMMATIKÜBERSICHT','naHead102 naNw',29)}
  {text(77,125.3,60,'Nomen','naSect102 naNw',16)}
  <div className="naBand102" style={{left:78,top:154,width:300,height:20}}/>
  {tx102(82,158.2,170,'Genitiv bei Eigennamen','naBandT102 naNw',12.3)}{tx102(248,159.3,170,'L14','naLT102 naNw',12.5)}
  <svg className="naGrid102" viewBox="0 0 807 1094" aria-hidden="true">
   <rect x="78" y="174" width="1" height="40"/><rect x="377.5" y="174" width="1" height="40"/><rect x="78" y="213.5" width="300" height="1"/>
   <rect x="77" y="302" width="1" height="223"/><rect x="175" y="302" width="1" height="223"/><rect x="274" y="302" width="1" height="223"/><rect x="372.5" y="302" width="1" height="223"/><rect x="471.5" y="302" width="1" height="223"/><rect x="571" y="302" width="1" height="223"/><rect x="669.5" y="302" width="1" height="223"/>
   {[302,325,347,369.5,391,414,436,458,481,503,525].map(y=><rect key={'ph'+y} x="77" y={y} width="593" height="1"/>)}
   <rect x="77" y="568" width="1" height="176"/><rect x="199" y="568" width="1" height="176"/><rect x="321.5" y="568" width="1" height="176"/>
   {[588,610,633,654,677,699.5,721,744].map(y=><rect key={'plh'+y} x="77" y={y} width="245" height="1"/>)}
   <rect x="355" y="568" width="1" height="179"/><rect x="512.5" y="568" width="1" height="179"/><rect x="669.5" y="568" width="1" height="179"/>
   {[591,613.5,635.5,657.5,680,702.5,724.5,747].map(y=><rect key={'prh'+y} x="355" y={y} width="315" height="1"/>)}
   <rect x="76" y="827" width="1" height="90"/><rect x="136" y="827" width="1" height="90"/><rect x="202" y="827" width="1" height="90"/><rect x="246.5" y="827" width="1" height="90"/>
   {[850,872,894.5,917].map(y=><rect key={'vlh'+y} x="76" y={y} width="171" height="1"/>)}
   <rect x="272" y="827" width="1" height="46"/><rect x="429.5" y="827" width="1" height="46"/>
   {[850.5,873].map(y=><rect key={'vmh'+y} x="272" y={y} width="158" height="1"/>)}
   <rect x="430" y="827" width="1" height="174.5"/><rect x="513.5" y="827" width="1" height="174.5"/><rect x="586.5" y="827" width="1" height="174.5"/><rect x="669" y="827" width="1" height="174.5"/>
   {[851.5,873.5,896,918.5,957,979.5,1001.5].map(y=><rect key={'vrh'+y} x="430" y={y} width="239" height="1"/>)}
   <rect x="76" y="953" width="1" height="79"/><rect x="411.5" y="953" width="1" height="79"/>
   {[993,1032].map(y=><rect key={'vwh'+y} x="76" y={y} width="336" height="1"/>)}
  </svg>
  {mix102(82,180.5,240,[['Otto'],['s',1],[' Nachbarin']])}{tx102(194,180.5,192.5,'=')}{mix102(216.5,180.5,140,[['die Nachbarin von Otto']])}
  {mix102(82,197.5,240,[['Vanilla'],['s',1],[' Garten']])}{tx102(194,197.5,209.5,'=')}{mix102(216.5,197.5,140,[['der Garten von Vanilla']])}
  {text(76,252.3,220,'Artikelwörter und Pronomen','naSect102 naNw',16)}
  <div className="naBand102" style={{left:77,top:281,width:592,height:21}}/>
  {tx102(82,286.2,298,'Possessivartikel sein/ihr','naBandT102 naNw',12.3)}{tx102(250,285.3,296,'L14','naLT102 naNw',12.5)}
  {tx102(182,306,318.05,'Nominativ','naColH102 naNw')}{tx102(379,306,318.05,'Akkusativ','naColH102 naNw')}
  {tx102(182,327.7,341,'Da ist ...','naCell102 naNw')}{tx102(380,327.7,341,'Ich mag ...','naCell102 naNw')}
  {art('icon1',179,343,29,36)}{art('icon2',276,343,29,36)}{art('icon3',375,343,27,36)}{art('icon4',474,343,30,36)}
  <div className="naBullet102" style={{left:82,top:379.5,background:'#184a97'}}/>
  {tx102(93,371.7,385,'Garten')}{tx102(181,371.7,385,'sein','naRed102 naNw')}{tx102(281,371.7,385,'ihr','naRed102 naNw')}{tx102(379,371.7,385,'seinen','naRed102 naNw')}{tx102(478,371.7,385,'ihren','naRed102 naNw')}{tx102(577,371.7,385,'Garten.')}
  <div className="naBullet102" style={{left:82,top:401.5,background:'#4bbd26'}}/>
  {tx102(94,393.7,407,'Haus')}{tx102(181,393.7,407,'sein','naRed102 naNw')}{tx102(281,393.7,407,'ihr','naRed102 naNw')}{tx102(379,393.7,407,'sein','naRed102 naNw')}{tx102(478,393.7,407,'ihr','naRed102 naNw')}{tx102(578,393.7,407,'Haus.')}
  <div className="naBullet102" style={{left:82,top:423.5,background:'#e15444'}}/>
  {tx102(93,416.7,430,'Küche')}{tx102(181,416.7,430,'seine','naRed102 naNw')}{tx102(280,416.7,430,'ihre','naRed102 naNw')}{tx102(379,416.7,430,'seine','naRed102 naNw')}{tx102(478,416.7,430,'ihre','naRed102 naNw')}{tx102(578,416.7,430,'Küche.')}
  {tx102(182,461.7,475,'Da sind ...','naCell102 naNw')}{tx102(380,461.7,475,'Ich mag ...','naCell102 naNw')}
  <div className="naBullet102" style={{left:82,top:490.5,background:'#faf942'}}/>
  {tx102(94,482.7,496,'Kinder')}{tx102(181,482.7,496,'seine','naRed102 naNw')}{tx102(280,482.7,496,'ihre','naRed102 naNw')}{tx102(379,482.7,496,'seine','naRed102 naNw')}{tx102(478,482.7,496,'ihre','naRed102 naNw')}{tx102(578,482.7,496,'Kinder.')}
  {tx102(82,505.7,519,'auch so bei: finden, ...','naNote102 naNw')}
  <div className="naBand102" style={{left:77,top:545,width:591,height:23}}/>
  {tx102(82,548.2,560,'Personalpronomen im Dativ','naBandT102 naNw',12.3)}{tx102(272,549.3,560,'L15','naLT102 naNw',12.5)}
  {tx102(362,551.2,563,'Personalpronomen im Akkusativ','naBandT102 naNw',12.3)}{tx102(582,552.2,563,'L20','naLT102 naNw',12.5)}
  {tx102(82,569.95,582,'Nominativ','naColH102 naNw')}{tx102(201,569.95,582,'Dativ','naColH102 naNw')}
  {tx102(82,590.7,604,'ich')}{tx102(207,590.7,604,'mir','naRed102 naNw')}
  {tx102(82,613.7,627,'du')}{tx102(205,613.7,627,'dir','naRed102 naNw')}
  {tx102(82,635.7,649,'er/es')}{tx102(206,637.7,651,'ihm','naRed102 naNw')}
  {tx102(82,658.7,672,'sie')}{tx102(206,658.7,672,'ihr','naRed102 naNw')}
  {tx102(82,680.7,694,'wir')}{tx102(205,680.7,694,'uns','naRed102 naNw')}
  {tx102(82,702.7,716,'ihr')}{tx102(205,702.7,716,'euch','naRed102 naNw')}
  {tx102(82,725.7,739,'sie/Sie')}{tx102(206,725.7,739,'ihnen/Ihnen','naRed102 naNw')}
  {tx102(363,572.95,585,'Nominativ','naColH102 naNw')}{tx102(519,572.95,585,'Akkusativ','naColH102 naNw')}
  {tx102(362,594.7,608,'ich')}{tx102(519,594.7,608,'mich','naRed102 naNw')}
  {tx102(362,616.7,630,'du')}{tx102(519,616.7,630,'dich','naRed102 naNw')}
  {tx102(362,639.7,653,'er/es/sie')}{tx102(519,639.7,653,'ihn/es/sie','naRed102 naNw')}
  {tx102(362,660.7,674,'wir')}{tx102(519,660.7,674,'uns','naRed102 naNw')}
  {tx102(362,682.7,696,'ihr')}{tx102(518,682.7,696,'euch','naRed102 naNw')}
  {tx102(362,706.7,720,'sie/Sie')}{tx102(519,706.7,720,'sie/Sie','naRed102 naNw')}
  {mix102(362,727.7,300,[['Ich komme um 10 Uhr an. Holst du '],['mich',1],[' bitte ab?']])}
  {text(75,778.3,60,'Verben','naSect102 naNw',16)}
  <div className="naBand102" style={{left:76,top:807,width:591,height:20}}/>
  {tx102(81,810.2,822,'Verben mit Dativ','naBandT102 naNw',12.3)}{tx102(203,811.3,822,'L15','naLT102 naNw',12.5)}
  {tx102(272,811.2,823,'Imperativ Sie','naBandT102 naNw',12.3)}{tx102(369,812.3,823,'L18','naLT102 naNw',12.5)}
  {tx102(437,812.2,824,'Imperativ Du/ihr','naBandT102 naNw',12.3)}{tx102(558,812.3,823,'L20','naLT102 naNw',12.5)}
  {tx102(82,830.7,844,'Das')}{tx102(142,831.2,844.5,'gehört','naRed102 naNw')}{tx102(209,830.7,844,'mir.')}
  {tx102(82,852.7,866,'Das')}{tx102(142,853.2,866.5,'gefällt','naRed102 naNw')}{tx102(209,853.7,867,'dir.')}
  {tx102(82,875.7,889,'Das')}{tx102(144,875.7,889,'hilft','naRed102 naNw')}{tx102(209,875.7,889,'ihm.')}
  {tx102(82,897.7,911,'Ich')}{tx102(143,897.7,911,'danke','naRed102 naNw')}{tx102(209,897.7,911,'ihr.')}
  {mix102(272,831.7,100,[['Trinken Sie',1]])}{tx102(344,831.7,845,'viel!')}
  {mix102(272,853.7,100,[['Gehen Sie',1]])}{tx102(335,853.7,867,'zum Arzt!')}
  {tx102(520,832.95,845,'du','naColH102 naNw')}{tx102(593,832.95,845,'ihr','naColH102 naNw')}
  {tx102(437,853.7,867,'decken')}{tx102(521,854.7,868,'Deck ...!','naRed102 naNw')}{tx102(594,854.7,868,'Deckt ...!','naRed102 naNw')}
  {tx102(437,876.7,890,'schlafen')}{tx102(521,876.7,890,'Schlaf ...!','naRed102 naNw')}{tx102(593,876.7,890,'Schlaft ...!','naRed102 naNw')}
  {tx102(436,899.2,912.5,'vergessen')}{tx102(520,899.2,912.5,'Vergiss ...!','naRed102 naNw')}{tx102(594,899.2,912.5,'Vergesst ...!','naRed102 naNw')}
  {tx102(437,924.7,938,'aus|räumen')}{tx102(521,924.7,938,'Räum ...','naRed102 naNw')}{tx102(594,924.7,938,'Räumt ...','naRed102 naNw')}
  {tx102(521,937.7,951,'aus!','naRed102 naNw')}{tx102(593,937.7,951,'aus!','naRed102 naNw')}
  {tx102(437,959.7,973,'!','naYelM102 naNw')}{tx102(449,959.7,973,'sein')}{tx102(521,959.7,973,'Sei ...!','naRed102 naNw')}{tx102(593,960.7,974,'Seid ...!','naRed102 naNw')}
  {tx102(437,981.7,995,'!','naYelM102 naNw')}{tx102(449,981.7,995,'haben')}{tx102(521,982.7,996,'Hab ...!','naRed102 naNw')}{tx102(594,982.7,996,'Habt ...!','naRed102 naNw')}
  <div className="naBand102" style={{left:76,top:933,width:335,height:20}}/>
  {tx102(81,937.2,949,'Verwendung von Imperativ und sollen','naBandT102 naNw',12.3)}{tx102(334,937.3,948,'L18','naLT102 naNw',12.5)}
  {tx102(81,957.45,970.5,'direkt:','naColH102 naNw')}
  {mix102(81,976.95,300,[['Schwester Angelika: '],['„Geben',1],[' Sie ihm diesen Tee!“']])}
  {tx102(81,996.45,1009.5,'indirekt:','naColH102 naNw')}
  {mix102(81,1014.95,330,[['Schwester Angelika sagt, ich '],['soll',1],[' dir diesen Tee '],['geben.',1]])}
  {text(37,1050,20,'102','naFoot102 naNw',13.5)}{text(68,1050,6,'|','naFoot102 naNw',13.5)}{text(82,1050,80,'hundertzwei','naFoot102 naNw',13.5)}
 </>}
 {page==='103'&&<>
  <div className="naBand103" style={{left:81.7,top:119.9,width:156.5,height:26}}/>
  {tx103(89,123.7,137,'Modalverb wollen','naBandT103 naNw',12.3)}{tx103(213,123.7,137,'L17','naLT103 naNw',12.5)}
  <div className="naBand103" style={{left:257,top:119.9,width:150,height:26}}/>
  {tx103(265,125.9,139,'Modalverb sollen','naBandT103 naNw',12.1)}{tx103(384,125.7,139,'L18','naLT103 naNw',12.5)}
  <div className="naBand103" style={{left:420.5,top:119.9,width:254,height:26}}/>
  {tx103(428,127.6,141,'Modalverben dürfen und müssen','naBandT103 naNw',12.2)}{tx103(648,129.7,143,'L21','naLT103 naNw',12.5)}
  <svg className="naGrid103" viewBox="0 0 807 1094" aria-hidden="true">
   <rect x="80.2" y="145.9" width="1" height="129.8"/><rect x="159.4" y="145.9" width="1" height="129.8"/><rect x="237.6" y="145.9" width="1" height="129.8"/>
   {[164.3,186.8,208.8,230.8,253.2,275.7].map(y=><rect key={'t1ah'+y} x="80.2" y={y} width="157.4" height="1"/>)}
   <rect x="258" y="145.9" width="1" height="131.8"/><rect x="332.8" y="145.9" width="1" height="131.8"/><rect x="406" y="145.9" width="1" height="131.8"/>
   {[166.3,188.3,211.3,233.3,255.7,277.7].map(y=><rect key={'t1bh'+y} x="258" y={y} width="148" height="1"/>)}
   <rect x="421.4" y="145.9" width="1" height="156.8"/><rect x="505.6" y="145.9" width="1" height="156.8"/><rect x="581.3" y="145.9" width="1" height="156.8"/><rect x="659.6" y="145.9" width="1" height="156.8"/>
   {[168.8,191.3,213.8,236.3,258.2,280.2,302.7].map(y=><rect key={'t1ch'+y} x="421.4" y={y} width="238.2" height="1"/>)}
   <rect x="78.7" y="342.7" width="1" height="153.8"/><rect x="197.8" y="342.7" width="1" height="153.8"/><rect x="315.3" y="342.7" width="1" height="153.8"/><rect x="433.9" y="342.7" width="1" height="153.8"/><rect x="552.5" y="342.7" width="1" height="153.8"/><rect x="669.5" y="342.7" width="1" height="153.8"/>
   {[363.1,385.6,408.1,430.1,452.5,475,496.5].map(y=><rect key={'prh'+y} x="78.7" y={y} width="590.8" height="1"/>)}
   <rect x="77.7" y="538.5" width="1" height="147"/><rect x="274" y="538.5" width="1" height="90.5"/><rect x="472.7" y="538.5" width="1" height="90.5"/><rect x="668" y="538.5" width="1" height="147"/>
   {[538.5,562,584,607,629,685.5].map(y=><rect key={'peh'+y} x="77.7" y={y} width="590.3" height="1"/>)}
   <rect x="77" y="727.3" width="1" height="132.8"/><rect x="272" y="727.3" width="1" height="132.8"/><rect x="470.3" y="727.3" width="1" height="132.8"/><rect x="667.5" y="727.3" width="1" height="132.8"/>
   {[748.3,770.7,792.7,815.7,837.2].map(y=><rect key={'wuh'+y} x="77" y={y} width="393.3" height="1"/>)}
   <rect x="77" y="860.1" width="590.5" height="1"/>
  </svg>
  {tx103(88,145.7,159,'ich')}{tx103(166.4,145.7,159,'will','naRed103 naNw')}
  {tx103(88,168.2,181.5,'du')}{tx103(166.4,168.2,181.5,'willst','naRed103 naNw')}
  {tx103(88,191.2,204.5,'er/sie/es')}{tx103(165.4,191.2,204.5,'will','naRed103 naNw')}
  {tx103(88,213.2,226.5,'wir')}{tx103(165.4,213.2,226.5,'wollen','naRed103 naNw')}
  {tx103(88,234.7,248,'ihr')}{tx103(164.4,234.7,248,'wollt','naRed103 naNw')}
  {tx103(88,259.2,272.5,'sie/Sie')}{tx103(164.4,259.2,272.5,'wollen','naRed103 naNw')}
  {tx103(263.5,147.2,160.5,'ich')}{tx103(339.7,147.2,160.5,'soll','naRed103 naNw')}
  {tx103(263.5,171.2,184.5,'du')}{tx103(338.7,171.2,184.5,'sollst','naRed103 naNw')}
  {tx103(263.5,193.7,207,'er/es/sie')}{tx103(338.7,193.7,207,'soll','naRed103 naNw')}
  {tx103(263.5,216.2,229.5,'wir')}{tx103(338.7,216.2,229.5,'sollen','naRed103 naNw')}
  {tx103(263.5,238.2,251.5,'ihr')}{tx103(337.7,238.2,251.5,'sollt','naRed103 naNw')}
  {tx103(263.5,260.7,274,'sie/Sie')}{tx103(337.7,260.7,274,'sollen','naRed103 naNw')}
  {tx103(514,150,163,'dürfen','naColH103 naNw')}{tx103(591,151,164,'müssen','naColH103 naNw')}
  {tx103(427.5,169.7,183,'ich')}{tx103(511.7,169.7,183,'darf','naRed103 naNw')}{tx103(588.8,170.7,184,'muss','naRed103 naNw')}
  {tx103(427.5,191.7,205,'du')}{tx103(511.7,192.7,206,'darfst','naRed103 naNw')}{tx103(587.8,192.7,206,'musst','naRed103 naNw')}
  {tx103(427.5,215.2,228.5,'er/es/sie')}{tx103(511.7,215.2,228.5,'darf','naRed103 naNw')}{tx103(587.8,215.2,228.5,'muss','naRed103 naNw')}
  {tx103(427.5,238.2,251.5,'wir')}{tx103(510.7,238.2,251.5,'dürfen','naRed103 naNw')}{tx103(587.8,238.2,251.5,'müssen','naRed103 naNw')}
  {tx103(427.5,259.2,272.5,'ihr')}{tx103(510.7,259.2,272.5,'dürft','naRed103 naNw')}{tx103(586.8,259.2,272.5,'müsst','naRed103 naNw')}
  {tx103(427.5,284.2,297.5,'sie/Sie')}{tx103(509.7,284.2,297.5,'dürfen','naRed103 naNw')}{tx103(586.8,284.2,297.5,'müssen','naRed103 naNw')}
  <div className="naBand103" style={{left:79.7,top:316.8,width:592.5,height:26}}/>
  {tx103(87,320.6,334,'Präteritum: sein und haben','naBandT103 naNw',12.2)}{tx103(272,320.7,334,'L19','naLT103 naNw',12.5)}
  {tx103(204.2,344.2,357,'Präsens','naColH103 naNw')}{tx103(322.8,344.2,357,'Präteritum','naColH103 naNw')}
  {tx103(441.4,344.2,357,'Präsens','naColH103 naNw')}{tx103(559.9,344.2,357,'Präteritum','naColH103 naNw')}
  {tx103(85.5,365.2,379,'ich')}{tx103(203.2,365.2,379,'bin')}{tx103(322.8,365.2,379,'war','naRed103 naNw')}{tx103(441.4,365.2,379,'habe')}{tx103(559.9,365.2,379,'hatte','naRed103 naNw')}
  {tx103(85.5,388.7,402,'du')}{tx103(203.2,388.7,402,'bist')}{tx103(322.8,388.7,402,'warst','naRed103 naNw')}{tx103(441.4,388.7,402,'hast')}{tx103(559.9,388.7,402,'hattest','naRed103 naNw')}
  {tx103(85.5,410.1,424.5,'er/es/sie')}{tx103(203.2,410.1,424.5,'ist')}{tx103(322.8,410.1,424.5,'war','naRed103 naNw')}{tx103(441.4,410.1,424.5,'hat')}{tx103(559.9,410.1,424.5,'hatte','naRed103 naNw')}
  {tx103(85.5,432.5,446,'wir')}{tx103(203.2,432.5,446,'sind')}{tx103(322.8,432.5,446,'waren','naRed103 naNw')}{tx103(441.4,432.5,446,'haben')}{tx103(559.9,432.5,446,'hatten','naRed103 naNw')}
  {tx103(85.5,455.8,469,'ihr')}{tx103(203.2,455.8,469,'seid')}{tx103(322.8,455.8,469,'wart','naRed103 naNw')}{tx103(441.4,455.8,469,'habt')}{tx103(559.9,455.8,469,'hattet','naRed103 naNw')}
  {tx103(85.5,477.4,491.5,'sie/Sie')}{tx103(203.2,477.4,491.5,'sind')}{tx103(322.8,477.4,491.5,'waren','naRed103 naNw')}{tx103(441.4,477.4,491.5,'haben')}{tx103(559.9,477.4,491.5,'hatten','naRed103 naNw')}
  <div className="naBand103" style={{left:77.7,top:515.5,width:591.5,height:25}}/>
  {tx103(84,520.4,534,'Perfekt: nicht trennbare Verben','naBandT103 naNw',12.4)}{tx103(301,520.7,534,'L19','naLT103 naNw',12.5)}
  {tx103(83.7,542.3,557,'Infinitiv','naColH103 naNw')}{tx103(281.9,542.3,556,'Präsens (heute)','naColH103 naNw')}
  {tx103(479.2,542.3,557,'Perfekt (früher)','naColH103 naNw')}
  {tx103(481,567,581,'haben +be/ge/ver...en/t','naRedB103 naNw')}
  {tx103(82.7,585.7,599,'erkennen')}{tx103(279.5,587.4,602,'er/sie erkennt')}{mix103(478.5,591.2,180,[['er/sie '],['hat erkannt',1]])}
  {tx103(82.7,608.7,622,'bekommen')}{tx103(279.5,610.2,624,'er/sie bekommt')}{mix103(478.5,612.5,180,[['er/sie '],['hat bekommen',1]])}
  {mix103(82.7,629.7,505,[['auch so: ',4],['gefallen – gefallen, vergessen – vergessen, entschuldigen – entschuldigt,']])}
  {tx103(128,648.2,661.5,'beschweren – beschwert')}
  {mix103(82,665.2,230,[['auch so nach: ',4],['ent-, emp-, miss-, zer-']])}
  <div className="naBand103" style={{left:75.7,top:703.3,width:591.5,height:24}}/>
  {tx103(82,707.4,721,'Wünsche: Konjunktiv II','naBandT103 naNw',12.4)}{tx103(249,707.7,721,'L24','naLT103 naNw',12.5)}
  {tx103(81.7,727.6,742,'ich')}{tx103(279,727.6,742,'würde','naRed103 naNw')}
  {tx103(80.7,751.5,764.5,'du')}{tx103(280.2,751.5,764.5,'würdest','naRed103 naNw')}
  {tx103(80.7,772.8,788,'er/es/sie')}{tx103(279,772.8,788,'würde','naRed103 naNw')}
  {tx103(80.7,796.1,809,'wir')}{tx103(278,796.1,809,'würden','naRed103 naNw')}
  {tx103(80.7,818.5,831.5,'ihr')}{tx103(278,818.5,831.5,'würdet','naRed103 naNw')}
  {tx103(80.7,841.5,855,'sie/Sie')}{tx103(278,841.5,855,'würden','naRed103 naNw')}
  {mix103(475.2,783.2,190,[['gern mit dir '],['feiern',1]])}
  {text(637.2,1050.0,80,'hundertdrei','naFoot103 naNw',13)}{text(720.8,1051,4,'|','naFoot103 naNw',13)}{text(736.8,1051.1,20,'103','naFootD103 naNw',13)}
 </>}
 {page==='104'&&<>
  {text(75.9,56.9,343,'GRAMMATIKÜBERSICHT','naHead104 naNw',28.4)}
  {text(76,121.2,110,'Präpositionen','naSecH104 naNw',16.5)}
  <div className="naBand104" style={{left:77,top:153,width:592,height:21}}/>
  {tx104(80,155.2,163,'Wo? → Lokale Präpositionen mit Dativ','naBandT104 naNw',13.4)}{tx104(337.5,156.4,163,'L13','naLT104 naNw',12)}
  <svg className="naGrid104" viewBox="0 0 807 1094" aria-hidden="true">
   {[76,670].map(x=><rect key={'t1v'+x} x={x} y="174" width="1" height="213"/>)}
   {[244,373,521].map(x=><rect key={'t1vi'+x} x={x} y="174" width="1" height="174"/>)}
   {[196.5,235.5,257.5,280.5,302.5,324.5,347.5,386.5].map(y=><rect key={'t1h'+y} x="76" y={y} width="594" height="1"/>)}
  </svg>
  {tx104(80.9,178.2,187,'Nominativ','naColH104 naNw',13.9)}{tx104(378,178.2,187,'Dativ','naColH104 naNw',13.9)}
  {tx104(80,200.8,208,'Da ist....','naCell104 naNw',13)}{tx104(249,201.5,208,'Wo ist das Hotel?','naCell104 naNw',12.5)}{tx104(249,218.9,208,'Es ist...','naCell104 naNw',12.5)}
  {tx104(379,200.6,208,'definiter Artikel','naColH104 naNw',14.1)}{tx104(528,200.6,208,'indefiniter Artikel','naColH104 naNw',14.1)}
  {bul104(85,248.5,'#022a88')}{bul104(84.5,271,'#28b400')}{bul104(84.5,293.5,'#d90500')}
  {tx104(91.5,239.8,247,'der/ein Dom.','naCell104 naNw',13)}{tx104(249,239.8,247,'neben','naCell104 naNw',13)}{mix104(379,239.8,60,[['dem',1],[' Dom.']],13)}{mix104(528,239.8,70,[['einem',1],[' Dom.']],13)}
  {tx104(91.5,261.8,269,'das/ein Café.','naCell104 naNw',13)}{tx104(248,261.8,269,'neben','naCell104 naNw',13)}{mix104(379,261.8,60,[['dem',1],[' Café.']],13)}{mix104(528,261.8,70,[['einem',1],[' Café.']],13)}
  {tx104(91.5,283.8,292,'die/eine Post.','naCell104 naNw',13)}{tx104(249,283.8,292,'neben','naCell104 naNw',13)}{mix104(379,283.8,55,[['der',1],[' Post.']],13)}{mix104(528,283.8,65,[['einer',1],[' Post.']],13)}
  {tx104(80,305.8,313,'Da sind...','naCell104 naNw',13)}
  {tx104(80,328.8,336,'die / – Banken/Häuser.','naCell104 naNw',13)}{tx104(249,328.8,336,'neben','naCell104 naNw',13)}{mix104(379,328.8,132,[['den',1],[' Banken/ Häuser'],['n',1]],13)}{mix104(532,328.8,116,[['–',1],[' Banken/Häuser'],['n',1],['.']],13)}
  {mix104(82,350.2,320,[['auch so:',4],[' auf, an, vor, hinter, zwischen, über, unter, in']],13.2)}
  {tx104(84,365.5,375,'!','naGrn104 naNw',15.5)}{mix104(96,368,160,[['in dem = '],['im',1],['   an dem = '],['am',1]],12.9)}
  <div className="naBand104" style={{left:76,top:404,width:341,height:21}}/>
  {tx104(82,407.3,414,'temporale Präpositionen vor, nach, in + Dativ','naBandT104 naNw',13.1)}{tx104(376.5,408.4,414,'L16','naLT104 naNw',12)}
  <svg className="naGrid104" viewBox="0 0 807 1094" aria-hidden="true">
   {[76,132,230,418].map(x=><rect key={'t2v'+x} x={x} y="425" width="1" height="114"/>)}
   {[449,471.5,494,516,538.5].map(y=><rect key={'t2h'+y} x="76" y={y} width="342" height="1"/>)}
  </svg>
  {tx104(136.8,432.4,440,'Wann?','naColH104 naNw',14)}
  {bul104(84,462,'#022a88')}{bul104(84,480,'#28b400')}{bul104(84.5,502,'#d90500')}{bul104(84,524,'#ffee02')}
  {mix104(234,453.1,62,[['ein'],['em',1],[' Monat']],13.2)}{mix104(234,476.1,60,[['ein'],['em',1],[' Jahr']],13.2)}{mix104(234,498.1,66,[['ein'],['er',1],[' Stunde']],13.2)}{tx104(234,521.1,529,'zwei Wochen','naCell104 naNw',13.2)}
  {tx104(136.7,483,486,'vor/nach/in','naRed104 naNw',13.4)}
  <div className="naBand104" style={{left:434,top:489,width:235,height:20}}/>
  {tx104(440,492.3,499,'Präpositionen mit und ohne','naBandT104 naNw',13.4)}{tx104(623,493.4,499,'L17','naLT104 naNw',12)}
  <svg className="naGrid104" viewBox="0 0 807 1094" aria-hidden="true">
   {[433,481,571,669].map(x=><rect key={'rbv'+x} x={x} y="509" width="1" height="97"/>)}
   <rect x="433" y="550" width="236" height="1"/><rect x="433" y="605.5" width="236" height="1"/>
  </svg>
  {tx104(437,514.3,521,'ohne','naRed104 naNw',12.9)}{tx104(488,514.3,521,'+ Akkusativ','naCell104 naNw',12.9)}
  {tx104(576,514.3,521,'ohne das/','naRed104 naNw',12.9)}{mix104(577,531.3,75,[['mein',1],[' Handy']],12.9)}
  {tx104(438,553.3,560,'mit','naRed104 naNw',12.9)}{tx104(488,553.3,560,'+ Dativ','naCell104 naNw',12.9)}
  {tx104(577,554.3,560,'mit dem/','naRed104 naNw',12.9)}{tx104(577,570.3,576,'meinem','naRed104 naNw',12.9)}{tx104(577,587.3,596,'Handy','naCell104 naNw',12.9)}
  <div className="naBand104" style={{left:76,top:557,width:341,height:21}}/>
  {tx104(81,559.2,567,'temporale Präposition für + Akkusativ','naBandT104 naNw',13.4)}{tx104(335,560.4,567,'L16','naLT104 naNw',12)}
  <svg className="naGrid104" viewBox="0 0 807 1094" aria-hidden="true">
   {[76,132,230,418].map(x=><rect key={'t3v'+x} x={x} y="578" width="1" height="112"/>)}
   {[600.5,623,645.5,667.5,690].map(y=><rect key={'t3h'+y} x="76" y={y} width="342" height="1"/>)}
  </svg>
  {tx104(137.5,581.2,590,'(Für) Wie lange?','naColH104 naNw',13.1)}
  {bul104(84,614,'#022a88')}{bul104(83.5,631,'#28b400')}{bul104(83.5,653.5,'#d90500')}{bul104(83.5,675.5,'#ffee02')}
  {mix104(234,605.5,58,[['ein'],['en',1],[' Tag']],13.2)}{tx104(234,628.5,636,'ein Jahr','naCell104 naNw',13.2)}{tx104(234,650.5,658,'eine Woche','naCell104 naNw',13.2)}{tx104(234,672.5,680,'zwei Wochen','naCell104 naNw',13.2)}
  {tx104(136,632.9,641,'für','naRed104 naNw',13.4)}
  {text(74,724.2,120,'Konjunktionen','naSecH104 naNw',16.5)}{text(333.7,724.6,60,'Sätze','naSecH104 naNw',16.5)}
  <div className="naBand104" style={{left:76,top:756,width:243,height:21}}/>
  {tx104(79,759.2,767,'Konjunktion denn','naBandT104 naNw',13.55)}{tx104(207.5,759.4,767,'L23','naLT104 naNw',12)}
  {mix104(79,781.2,215,[['Es war wunderbar, '],['denn',1],[' wir hatten']],13.1)}
  {tx104(79,798.2,805,'ein Traumwetter.','naCell104 naNw',13.1)}
  <div className="naBand104" style={{left:336,top:757,width:332,height:21}}/>
  {tx104(339,759.9,767,'Modalverben im Satz','naBandT104 naNw',13.4)}{tx104(483,760.9,767,'L17/L18/L21','naLT104 naNw',12)}
  <div className="naMark104" style={{left:385,top:783,width:26,height:14}}/><div className="naMark104" style={{left:606,top:784,width:52,height:12}}/>
  <div className="naMark104" style={{left:385,top:806,width:36,height:12}}/><div className="naMark104" style={{left:606,top:806,width:56,height:14}}/>
  <div className="naMark104" style={{left:385,top:829,width:34,height:11}}/><div className="naMark104" style={{left:606,top:829,width:33,height:11}}/>
  <div className="naMark104" style={{left:385,top:850,width:29,height:13}}/><div className="naMark104" style={{left:606,top:851,width:38,height:12}}/>
  <svg className="naGrid104" viewBox="0 0 807 1094" aria-hidden="true">
   <rect x="335" y="778" width="1" height="92"/><rect x="669" y="778" width="1" height="92"/>
   {[801.5,823.5,846.5,868.5].map(y=><rect key={'mh'+y} x="335" y={y} width="334" height="1"/>)}
  </svg>
  {tx104(339.5,782.6,790,'Ich','naCell104 naNw',13.7)}{tx104(386,782.6,790,'will','naCell104 naNw',13.7)}{tx104(449,782.6,790,'Liedermacher','naCell104 naNw',13.7)}{tx104(608,782.6,790,'werden.','naCell104 naNw',13.7)}
  {tx104(339.5,804.6,812,'Du','naCell104 naNw',13.7)}{tx104(385,804.6,812,'sollst','naCell104 naNw',13.7)}{tx104(449,804.6,812,'diesen Tee','naCell104 naNw',13.7)}{tx104(608,804.6,812,'trinken.','naCell104 naNw',13.7)}
  {tx104(339.5,827.6,835,'Man','naCell104 naNw',13.7)}{tx104(386,827.6,835,'muss','naCell104 naNw',13.7)}{tx104(449,827.6,835,'in der Bibliothek leise','naCell104 naNw',13.7)}{tx104(608,827.6,835,'sein.','naCell104 naNw',13.7)}
  {tx104(339.5,849.6,857,'Man','naCell104 naNw',13.7)}{tx104(386,849.6,857,'darf','naCell104 naNw',13.7)}{tx104(449,849.6,857,'im Bus nicht','naCell104 naNw',13.7)}{tx104(608,849.6,857,'essen.','naCell104 naNw',13.7)}
  {text(72.6,862.2,90,'Adjektive','naSecH104 naNw',16.5)}
  <div className="naBand104" style={{left:75,top:893,width:420,height:20}}/>
  {tx104(81,895.3,903,'Komparation: gut, gern, viel','naBandT104 naNw',13.2)}{tx104(268,896.4,903,'L22','naLT104 naNw',12)}
  <svg className="naGrid104" viewBox="0 0 807 1094" aria-hidden="true">
   {[75,190,327,495].map(x=><rect key={'av'+x} x={x} y="913" width="1" height="114"/>)}
   {[936.5,959.5,981.5,1026].map(y=><rect key={'ah'+y} x="75" y={y} width="420" height="1"/>)}
  </svg>
  {tx104(79,918.5,926,'Positiv','naColH104 naNw',14)}{tx104(195,918.5,926,'Komparativ','naColH104 naNw',14)}{tx104(332,918.5,926,'Superlativ','naColH104 naNw',14)}
  {tx104(78,943.6,950,'+','naColH104 naNw',14)}{tx104(194,943.6,950,'++','naColH104 naNw',14)}{tx104(332,943.6,950,'+++','naColH104 naNw',14)}
  {tx104(78,962.6,969,'gut','naCell104 naNw',13.2)}{tx104(194,962.6,969,'besser','naRed104 naNw',13.2)}{tx104(332,962.6,969,'am besten','naRed104 naNw',13.2)}
  {tx104(78,984.6,991,'gern','naCell104 naNw',13.2)}{tx104(195,984.6,991,'lieber','naRed104 naNw',13.2)}{tx104(332,984.6,991,'am liebsten','naRed104 naNw',13.2)}
  {tx104(78,1006.6,1013,'viel','naCell104 naNw',13.2)}{tx104(195,1006.6,1013,'mehr','naRed104 naNw',13.2)}{tx104(332,1006.6,1013,'am meisten','naRed104 naNw',13.2)}
  {text(34.5,1048,20,'104','naFoot104 naNw',13.8)}{text(65.5,1048,6,'|','naFoot104 naNw',13.8)}{text(79.5,1048,80,'hundertvier','naFoot104 naNw',13.8)}
 </>}
 {page==='97'&&<>
  {text(71.7,54,580,'WIEDERHOLUNGSSTATION: GRAMMATIK','naHead97 naNw',28.5)}
  {art('bars',730,8,77,93)}
  {title('1',71.7,123.5,560,'Vergleichen Sie und schreiben Sie Sätze.','naRB naNw naT97')}
  {text(103.6,154.5,14,'a','naBookSerif naBk88')}{text(121.5,154.5,295,'Montag: 16° – Dienstag: 18° – Mittwoch: 22°','naBookSerif naBk88 naNw',14)}
  {rule(122,188,594)}{art('hand1a',118,165,340,27)}
  {text(103.6,202.5,14,'b','naBookSerif naBk88')}
  {text(126,200,16,'+','naBookSerif naBk88 naNw',16)}{text(278,200,30,'++','naBookSerif naBk88 naNw',16)}{text(494,200,34,'+++','naBookSerif naBk88 naNw',16)}
  {art('storm',141,195,58,39)}{art('rain',307,193,45,44)}{art('sun',526,196,49,40)}
  {text(122.5,241.5,28,'Ich','naBookSerif naBk88 naNw',14)}{field('97-1b',151.5,237,496,'1 b')}{text(654,241.5,70,'. (mögen)','naBookSerif naBk88 naNw',14)}
  {text(103.6,270.5,14,'c','naBookSerif naBk88')}
  {art('simon',108,268,72,43)}{art('daniel',292,264,53,48)}{art('tom',484,265,50,46)}
  {text(182,272,40,'Simon','naNam97 naNw',11.5)}{text(353.5,272,45,'Daniel','naNam97 naNw',11.5)}{text(540,272,30,'Tom','naNam97 naNw',11.5)}
  {field('97-1c',121.5,305.5,511,'1 c')}{text(635.5,311.5,95,'. (groß sein)','naBookSerif naBk88 naNw',14)}
  {text(103.6,337.5,14,'d','naBookSerif naBk88')}
  {art('shirt1',127,328,57,44)}{art('shirt2',306,335,55,39)}{art('shirt3',488,335,45,37)}
  {text(122.5,378.5,62,'Die Bluse','naBookSerif naBk88 naNw',14)}{field('97-1d',185.5,373.5,462,'1 d')}{text(655,378.5,70,'. (kosten)','naBookSerif naBk88 naNw',14)}
  {check('97-1',700,398,{'97-1b':'mag Schnee lieber als Wind. Am liebsten mag ich Sonne.','97-1c':'Daniel ist größer als Simon. Tom ist am größten.','97-1d':'kostet genauso viel wie das T-Shirt. Der Pullover kostet am meisten.'})}
  {title('2',71.7,423,620,'Sehen Sie den Kalender an. Lesen Sie die E-Mail und achten Sie auf die','naRB naNw naT97')}
  {text(105,445.5,320,'Ordinalzahlen. Ordnen Sie dann zu.','naTitleL97 naNw')}
  {art('calhdr',102,471,607,27)}
  {[190,277,363,450,536,622,103,708].map(x=><div key={'cv'+x} className="naCalG97" style={{left:x,top:498,width:1,height:63}}/>)}
  <div className="naCalG97" style={{left:103,top:561,width:606,height:1}}/>
  {art('cal-frei',105,497,45,40)}{art('cal-albert',365,497,85,42)}{art('cal-dr',449,497,72,40)}{art('cal-wochenende',559,500,125,52)}{art('cal-luebeck',123,530,145,28)}
  <div className="naHl97" style={{left:103,top:572.5,width:462,height:18.5}}/><div className="naStrike97" style={{left:277,top:580,width:46}}/>
  {text(104,569.9,70,'Geburtstag','naBank97 naNw',13.5)}{text(179.3,569.9,45,'Treffen','naBank97 naNw',13.5)}{text(234,569.9,34,'Reise','naBank97 naNw',13.5)}{text(276,569.9,52,'Feiertag','naBank97 naNw',13.5)}{text(333,569.9,52,'Termine','naBank97 naNw',13.5)}{text(395,569.9,96,'Zahnarzttermin','naBank97 naNw',13.5)}{text(500,569.9,62,'Maiwoche','naBank97 naNw',13.5)}
  <div className="naCard97" style={{left:104,top:606,width:552,height:200}}/>{art('scroll',638,614,34,200)}
  {text(118,623.5,200,'Liebe Franziska,','naMail97 naNw',12.05)}
  {text(118,641.5,545,'wann können wir uns in Berlin treffen? Wann hast Du Zeit im Mai? Ich schreibe Dir mal meine','naMail97 naNw',12.05)}
  {text(118,658.5,160,'Termine: Der erste Mai ist ein','naMail97 naNw',12.05)}<div className="naExRule97" style={{left:276,top:671,width:58,height:1}}/>{art('hand-feier',271,649.5,60,30.5)}{text(331.5,658.5,300,'(a) und ich mache bis zum zweiten Mai eine','naMail97 naNw',12.05)}
  {field('97-2b',116.5,670.5,160,'2 b')}{text(279.5,676.5,10,'(b)','naMail97 naNw',12)}{text(297,676.5,175,'nach Lübeck. Am vierten ist der','naMail97 naNw',12.3)}{field('97-2c',471.5,670.5,140,'2 c')}{text(615,676.5,20,'(c)','naMail97 naNw',12.05)}
  {text(118,695.5,275,'von meinem Mann und am fünften habe ich einen','naMail97 naNw',12.05)}{field('97-2d',393.5,688,161,'2 d')}{text(558,695.5,95,'(d). Die erste','naMail97 naNw',12.05)}
  {field('97-2e',116.5,704.5,160,'2 e')}{text(279.5,710.5,10,'(e)','naMail97 naNw',12)}{text(296.6,710.5,110,'ist also schlecht für','naMail97 naNw',11.7)}{text(402.8,710.5,14,'ein','naMail97 naNw',12.05)}{field('97-2f1',421.5,704.5,163,'2 f')}{text(587,710.5,60,'. Aber ab','naMail97 naNw',12.05)}
  {text(117,728.5,158,'dem sechsten habe ich keine','naMail97 naNw',12.05)}{field('97-2f2',277,724,160.5,'2 f2')}{text(441,728.5,210,'(f). Da können wir uns treffen. Hast','naMail97 naNw',12.05)}
  {text(118,749.5,60,'Du da Zeit?','naMail97 naNw',12.05)}
  {text(117,767.5,62,'Viele Grüße','naMail97 naNw',12.05)}
  {text(117,786.5,45,'Karina','naMail97 naNw',12.05)}
  {check('97-2',706,770,{'97-2b':'Reise','97-2c':'Geburtstag','97-2d':'Zahnarzttermin','97-2e':'Maiwoche','97-2f1':'Treffen','97-2f2':'Termine'})}
  {title('3',71.7,834.5,600,'Was würden die Personen gern machen? Schreiben Sie Sätze.','naRB naNw naT97')}
  <div className="naHl97" style={{left:104,top:865.5,width:364,height:19}}/><div className="naStrike97" style={{left:210,top:872.5,width:38}}/>
  {text(108,866.0,16,'im','naBank97 naNw',13.2)}{text(128,866.0,32,'Meer','naBank97 naNw',13.2)}{text(162,866.0,40,'baden','naBank97 naNw',13.2)}{text(209,866.0,48,'tanzen','naBank97 naNw',13.2)}{text(261,866.0,16,'in','naBank97 naNw',13.2)}{text(277,866.0,48,'Urlaub','naBank97 naNw',13.2)}{text(322,866.0,48,'fahren','naBank97 naNw',13.2)}{text(370,866.0,16,'am','naBank97 naNw',13.2)}{text(393,866.0,24,'See','naBank97 naNw',13.2)}{text(417,866.0,56,'grillen','naBank97 naNw',13.2)}
  {text(103.6,894.5,14,'a','naBookSerif naBk88')}{rule(122,908,398)}{art('hand3a',118,894,284,23)}
  {text(103.6,933,14,'b','naBookSerif naBk88')}{text(121.5,933,22,'Ich','naBookSerif naBk88 naNw',14)}{field('97-3b',151.5,928,366,'3 b')}
  {text(103.6,971,14,'c','naBookSerif naBk88')}{text(121.5,971,35,'Felix','naBookSerif naBk88 naNw',14)}{field('97-3c',161.5,967,356,'3 c')}
  {text(103.6,1010,14,'d','naBookSerif naBk88')}{text(121.5,1010.5,24,'Wir','naBookSerif naBk88 naNw',14)}{field('97-3d',151.5,1005.5,366,'3 d')}
  {art('photo1',533,856,70,43)}{art('photo2',533,900,70,43)}{art('photo3',532,944,70,42)}{art('photo4',532,987,70,43)}
  {check('97-3',706,998,{'97-3b':'würde gern am See grillen.','97-3c':'würde gern im Meer baden.','97-3d':'würden gern in den Urlaub fahren.'})}
  <svg className="naPipeSvg97" viewBox="0 0 807 1094"><rect key="p175.36" x={174.86} y={575} width={1} height={13}/><rect key="p228.26" x={227.76} y={575} width={1} height={13}/><rect key="p270.5" x={270.0} y={575} width={1} height={13}/><rect key="p330.5" x={330.0} y={575} width={1} height={13}/><rect key="p388.65" x={388.15} y={575} width={1} height={13}/><rect key="p494.5" x={494.0} y={575} width={1} height={13}/><rect key="p203.15" x={202.65} y={867} width={1} height={13}/><rect key="p255.16" x={254.66} y={867} width={1} height={13}/><rect key="p365.5" x={365.0} y={867} width={1} height={13}/></svg>{art('tab97',742,1050,53,17)}
  <div className="naText naFoot88" style={{left:582.8,top:1052,width:150}}>siebenundneunzig&nbsp;&nbsp;|&nbsp;&nbsp;97</div>
 </>}
 </Canvas>;
}
