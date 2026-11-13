import {useNativeCanvas,Canvas,Words} from './shared';
import {LineMatching} from '../exercises/LineMatching';

export function NativeAB12L24({page}:{page:string}){
 const c=useNativeCanvas(page);
 const {text,art,field,check,title,rule}=c;const set=c.set;
 const conf98=(id:string,y:number)=><>{[0,1,2].map(cc=>c.dot(id,''+cc,650+cc*29.5,y,'Selbsteinschätzung '+id+' '+['gut','mittel','noch nicht'][cc],false,'naDot98'))}</>;
 const sect98=(y:number,t:string,tag:string)=><div className="naText naSect98" style={{left:78,top:y}}><Words text={t}/> <span className="naTag98">{tag}</span></div>;
 const conf99=(id:string,y:number)=><>{[0,1,2].map(cc=>c.dot(id,''+cc,646.6+cc*28.9,y,'Selbsteinschätzung '+id+' '+['gut','mittel','noch nicht'][cc],false,'naDot99'))}</>;
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
  <LineMatching id="96-3l" left={['','','','']} right={['schneit.','sonnig.','windig und neblig.','warm.']} values={c.values} onMatch={set} leftX={131} rightX={239} leftWidth={117} rightWidth={185} ys={[748.5,768.5,816.5,837.5]} rightYs={[743.5,764.5,812.5,835.5]} rightXs={[276,276,276,276]} leftDotYs={[756.5,776.5,824.5,845.5]} rightDotXs={[264,264,264,264]} rightDotYs={[757,778.5,827,850]} dotR={4} width={807} height={1094} fontSize={14} itemHeights={[19,19,19,19]} lineHeight={19} className="lmScanFont lm96"/>
  <LineMatching id="96-3r" left={['','','','']} right={['27 Grad.','Wolken.','neblig und\nbewölkt.','donnert und blitzt.']} values={c.values} onMatch={set} leftX={464} rightX={586} leftWidth={140} rightWidth={190} ys={[748.5,770.5,818.5,856.5]} rightYs={[752.5,770.5,815,854.5]} rightXs={[621,621,621,621]} leftDotYs={[756.5,778.5,826.5,864.5]} rightDotXs={[618,618,618,618]} rightDotYs={[757.5,776,839.5,864]} dotR={3} rightFontSizes={[13,13.5,13,14.3]} width={807} height={1094} fontSize={13} itemHeights={[19,19,19,19]} rightHeights={[19,19,37,19]} multiline={true} lineHeight={18.5} className="lmScanFont lm96"/>
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
