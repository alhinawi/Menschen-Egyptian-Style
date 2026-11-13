import {useNativeCanvas,Canvas} from './shared';
import {LineMatching} from '../exercises/LineMatching';

export function NativeAB12L24({page}:{page:string}){
 const c=useNativeCanvas(page);
 const {text,art,field,check,title,rule}=c;const set=c.set;
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
