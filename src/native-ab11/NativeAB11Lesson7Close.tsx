import {CheckButton} from '../components/CheckButton';
import {PageImage} from '../components/PageImage';
import {usePageReset} from '../exercises/usePageReset';
import {useLayoutEffect,useRef,useState} from 'react';
import {scanData} from '../scan-data/registry';
import './native-ab11.css';
import './native-ab11-lessons45.css';
const norm=(s:string)=>s.normalize('NFC').toLocaleLowerCase('de').trim().replace(/[.,!?;:’']/g,'').replace(/\s+/g,' ');
function Words({s}:{s:string}){return <>{s.split(/(\s+)/).map((w,i)=>w==='▪'||w==='▴'?<i key={i} className={w==='▪'?'mSq':'mTri'} aria-hidden="true"/>:/\S/.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-phrase={s} data-word={w.replace(/^[.,!?„"()]+|[.,!?“"()]+$/g,'')}>{w}</span>:w)}</>}
export function NativeAB11Lesson7Close({page}:{page:string}){
 const host=useRef<HTMLDivElement>(null),audio=useRef<HTMLAudioElement>(null),[scale,SS]=useState(1),[,T]=useState(''),[v,S]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem('native-ab11-'+page)||'{}')}catch{return {}}}),[graded,G]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const measure=()=>SS(Math.min(el.clientWidth/901,el.clientHeight/1275));measure();const ro=new ResizeObserver(measure);ro.observe(el);return()=>ro.disconnect()},[]);
 usePageReset(page,'native-ab11-'+page,()=>{S({});G({})});
 const set=(id:string,value:string)=>{const next={...v,[id]:value};S(next);localStorage.setItem('native-ab11-'+page,JSON.stringify(next));G({})};
 const sy=page==='57'?.75:page==='58'?.76:.87;const Y=(y:number)=>130+(y-130)*sy;const C=(p:number)=>130+(p-130)/sy;
 const ink=(name:string,x:number,y:number,w:number,h:number,alt:string)=><PageImage className="mHelp" alt={alt} src={`assets/native-ab11/${name}.png`} style={{left:x,top:Y(y),width:w,height:h}}/>;
 const txt=(x:number,y:number,w:number,s:string,cls='')=><div className={'mText '+cls} style={{left:x,top:cls==='mFooter'?y:Y(y),width:w}}><Words s={s}/></div>;
 const hints:Record<string,string>={};
 const f=(id:string,x:number,y:number,w:number,label=id)=>{const ctx=document.createElement('canvas').getContext('2d');if(ctx)ctx.font="18px 'Times New Roman'";const size=Math.max(10,Math.min(18,18*(w-5)/(ctx?.measureText(v[id]||'').width||1)));return <input placeholder={hints[id]} className="mField" data-native-field={id} aria-label={label} style={{left:x,top:Y(y),width:w,height:22*sy,fontSize:size}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>};
 const open=(id:string,x:number,y:number,w:number,h:number,label=id)=><textarea className="mField mOpen" data-native-field={id} aria-label={label} style={{left:x,top:Y(y),width:w,height:h*sy,'--mopen-height':h*sy+'px'} as React.CSSProperties} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="mArt" alt={'Originalabbildung '+name} src={`assets/native-ab11/p${page}-${name}.png`} style={{left:x,top:Y(y),width:w,height:h*sy}}/>;
 const title=(n:string,y:number,s:string,kb='',x=132,w=700)=><>{kb&&txt(96,y+5,34,kb,'mKB')}<div className={'mNumber '+''} style={{left:x,top:Y(y)}}>{n}</div>{txt(x+35,y,w-35,s,'mTitle')}</>;
 const head=(s:string,y=135)=><>{txt(132,y,740,s,'mHeader')}<div className="mRule"/></>;
 const data=scanData['ab-a11:'+page];
 const answers=(group:string)=>Object.fromEntries(data.fields.filter(f=>f.group===group&&f.kind!=='radio'&&f.kind!=='checkbox'&&f.answer!==undefined).map(f=>[f.id,f.answer!]));
 const check=(id:string,x:number,y:number,expected=answers(id))=><div className="mCheck" data-native-task={id} style={{left:x,top:Y(y)}}><CheckButton onClick={()=>G({...graded,[id]:Object.entries(expected).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}></CheckButton><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const rule=(id:string,x:number,y:number,test:()=>boolean)=><div className="mCheck" data-native-task={id} style={{left:x,top:Y(y)}}><CheckButton onClick={()=>G({...graded,[id]:test()})}></CheckButton><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const listen=(n:string,x:number,y:number,t?:string)=><button className="mListen" data-task={t} aria-label={'Originalaudio 1 '+n} style={{left:x,top:Y(y)}} onClick={()=>{T(n);if(audio.current){audio.current.src='assets/ab-cd1-track'+n+'.mp3';audio.current.play().catch(()=>{})}}}>▶ 1 {n}</button>;
 const radio=(id:string,val:string,x:number,y:number,label:string)=><input className="mRadio" type="radio" data-value={val} data-native-radio={page==='57'&&id==='regel'?(val==='letztes-wort'?'r1':'r2'):undefined} name={'native-ab11-'+page+'-'+id} aria-label={label} style={{left:x,top:Y(y)}} checked={v[id]===val} onChange={()=>set(id,val)}/>;
 const score=(y:number,rows:string[][],x=440)=><div className="mScore" style={{left:x,top:Y(y)}}><b>Wörter</b><b>Strukturen</b><b>Kommunikation</b>{rows.map((row,r)=>row.map((s,c)=><div key={r+'-'+c}><i style={{background:['#d71910','#edcf00','#3b9e24'][r]}}/>{s} Punkte</div>))}</div>;
 const markSentence=(id:string,x:number,y:number,w:number,s:string)=><button className={'mQuestion '+(v[id]==='1'?'marked':'')} style={{left:x,top:Y(y),width:w}} aria-label={'Frage markieren '+s} onClick={()=>set(id,v[id]==='1'?'0':'1')}>{s}</button>;
 const qInline=(id:string,s:string)=><button className={'mQInline '+(v[id]==='1'?'marked':'')} aria-label={'Frage markieren '+s} onClick={()=>set(id,v[id]==='1'?'0':'1')}>{s}</button>;
 const stress=(id:string,x:number,y:number,s:string)=> <div className="mStressSentence" style={{left:x,top:Y(y)}}>{s.split(' ').map((w,i)=>w==='▪'||w==='▴'?<span key={i}><i className={w==='▪'?'mSq':'mTri'} aria-hidden="true"/>{' '}</span>:<span key={i}><button disabled={!/[a-zäöüß]/i.test(w)} className={v[id]&&norm(v[id])===norm(w)?'stressed':''} aria-label={id+' '+w} onClick={()=>set(id,w)}>{w}</button>{' '}</span>)}</div>;
 const check57=(id:string,x:number,y:number)=>rule(id,x,y,()=>v['regel']==='wichtige-info');
 return <div className="nativeAB11 nativeAB11Module1 nativeAB11Lessons45 nativeAB11Next45 nativeAB11Lesson7Close" ref={host} data-native-ab11-page={page}><div className="nabCanvas mCanvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='57'&&<>
 {head('TRAINING: SCHREIBEN')}<div className="nabModule">7</div>{title('1',211,'Eine E-Mail beantworten')}
 {txt(143,253,510,'a  Markieren Sie die Fragen von Lisa.','mTitle')}{txt(546,206,280,'Sie beantworten eine E-Mail, einen Brief oder\neine SMS. Lesen Sie den Text genau. Markieren\nSie die Fragen und machen Sie dann Notizen\nfür Ihre Antwort.','mSmall mTip')}
 <div className="mText mEmailHeader" style={{left:185,top:Y(331),width:650}}><div><b>An:</b> Lisa Sammer</div><div><b>Kopie:</b> sommercamper@uni-fs.de</div><div><b>Betreff:</b> Freizeitprogramm</div></div>{ink('p57-signatur',719,376,106,12,'Signatur: Arbeit')}
 <div className="mText mEmailBody" style={{left:185,top:Y(420),width:650}}>Hallo liebe Studentinnen und Studenten der Uni Freiburg und Straßburg,<br/>ich heiße Lisa und organisiere das Freizeitprogramm beim Sommercamp in Straßburg. Ich möchte Euch fragen: <span className="mQuestionExample">Wie alt seid Ihr?</span> {qInline('frage-herkunft','Woher kommt Ihr und welche Sprachen sprecht Ihr?')} {qInline('frage-freizeit','Was macht Ihr gern in der Freizeit?')} {qInline('frage-hobbys','Welche Hobbys habt Ihr?')}<br/>Bitte schreibt mir kurz eine E-Mail.<br/><br/>Ich freue mich sehr auf das Sommercamp mit Euch! Wir haben bestimmt viel Spaß zusammen! Bis bald!<br/>Viele Grüße<br/>Lisa</div>
 {txt(143,675,340,'b  Machen Sie Notizen für Ihre Antwort an\nLisa. Arbeiten Sie auch mit dem Wörterbuch.','mTitle')}{ink('p57-notizen-ink',200,730,282,75,'Alter: Herkunft: Sprachen: Freizeit/Hobbys: ins Kino gehen, …')}{open('eigene-notizen',168,856,325,70,'1b eigene Notizen')}
 {txt(532,675,310,'c  Schreiben Sie nun eine E-Mail an Lisa.','mTitle')}{txt(540,731,310,'Liebe Lisa,\nvielen Dank für Deine E-Mail.','mSmall')}
 {txt(540,791,113,'Mein Name ist','mSmall')}{f('mail-name',657,789,72)}{txt(733,791,100,'und ich bin','mSmall')}{f('mail-alter',540,819,57)}{txt(602,821,170,'Jahre alt.','mSmall')}
 {['Ich komme','Ich spreche','In der Freizeit'].map((s,i)=><span key={s}>{txt(540,855+i*31,112,s,'mSmall')}{f('mail-'+i,657,853+i*31,175)}</span>)}{txt(540,950,300,'Ich freue mich auch sehr auf das Sommercamp!\nViele Grüße','mSmall')}{f('mail-gruss',540,1003,291)}
 {txt(132,1080,710,'TRAINING: AUSSPRACHE','mHeader')}{txt(555,1090,280,'Wandernder Satzakzent','mSmall')}
 {title('1',1137,'Hören Sie und sprechen Sie nach.','',132,355)}{listen('34',96,1137,'1')}
 <div className="mPrintedStress" style={{left:168,top:Y(1181)}}>{[['Spielen',''],['Schach',' spielen'],['Ich kann ','Schach',' spielen.'],['Ich kann ','gut',' Schach spielen.'],['Ich kann ','sehr',' gut Schach spielen.']].map((row,i)=><div key={i}>{row.map((s,j)=><span key={j} className={(row.length===2?j===0:j===1)?'marked':''}>{s}</span>)}</div>)}</div>
 <div className="mNumber" style={{left:132,top:Y(1330)}}>2</div>{txt(167,1330,335,'Lesen Sie noch einmal Übung 1 und\nkreuzen Sie an: Was ist richtig?','mTitle mTitle20')}
 {txt(168,1403,320,'Der Satzakzent ist','mRuleTitle')}{radio('regel','letztes-wort',168,1440,'immer auf dem letzten Wort')}{txt(194,1438,305,'immer auf dem letzten Wort, zum\nBeispiel: Ich kann gut singen.','mSmall')}{radio('regel','wichtige-info',168,1503,'auf der wichtigen Information')}{txt(194,1501,330,'auf der wichtigen Information: Ich\nkann gut Schach spielen. (Ich kann\nnicht gut Gitarre, Fußball … spielen.)','mSmall')}{check57('ta-2',168,1584)}
 {title('3',1137,'Hören Sie und markieren Sie den\nSatzakzent.','',532,332)}{listen('35',495,1137,'1')}
 {['a  ▪ Was machst du in der Freizeit? ↘','   ▴ Ich höre gern Musik. ↘','b  ▪ Hörst du gern Musik? ↗','   ▴ Oh ja. ↘ Ich liebe Musik. ↘','c  ▪ Singst du gern? ↗','   ▴ Oh ja. ↘ Singen macht Spaß! ↘','   ▪ Und kannst du auch singen? ↗','   ▴ Natürlich kann ich singen! ↘ Hör zu: ↘ …'].map((s,i)=>stress('akzent-'+i,565,[1206,1235,1276,1305,1346,1375,1404,1433][i],s))}
 {listen('36',510,1487,'1')}{txt(575,1487,320,'Hören Sie noch einmal und sprechen Sie nach.','mSmall mStrong')}
 </>}
 {page==='58'&&<>
 {head('TEST',154)}{title('1',C(214),'Ergänzen Sie die Hobbys.','',108)}
 {txt(143,C(232),330,'a  Hallo, ich heiße Eljesa. Meine Hobbys sind','mSmall')}{ink('p58-musik-ink',468,C(230),80,20,'Musik hören')}{txt(550,C(232),130,'(kusim nöher),','mSmall')}
 {f('b1',143,C(257)-2,122)}{txt(273,C(257),105,'(zannte) und','mSmall')}{f('b2',372,C(257)-2,58)}{f('b3',440,C(257)-2,116)}{txt(564,C(257),170,'(rendeuf refften).','mSmall')}
 {txt(143,C(290),300,'b  Hallo, ich bin Jan. Meine Hobbys sind','mSmall')}{f('b4',440,C(290)-2,105)}{f('b5',550,C(290)-2,100)}{txt(658,C(290),170,'(luaßfbl elisnep)','mSmall')}
 {txt(165,C(314),40,'und','mSmall')}{f('b6',195,C(314)-2,105)}{f('b7',305,C(314)-2,105)}{txt(418,C(314),170,'(ard earnfh).','mSmall')}
 {txt(143,C(338),290,'c  Und wir sind Cora und Finnia. Wir','mSmall')}{f('b8',420,C(338)-2,112)}{txt(539,C(338),67,'(senle),','mSmall')}{f('b9',590,C(338)-2,110)}{txt(704,C(338),120,'(trorognieeaff)','mSmall')}
 {txt(166,C(370),40,'und','mSmall')}{f('b10',220,C(370)-2,85)}{txt(309,C(370),150,'(ckaben) gern.','mSmall')}{txt(743,C(354),90,'_/7 Punkte','mTiny')}
 {check('test-1',166,C(392))}
 {title('2',C(424),'Was macht Niklas in seiner Freizeit? Ergänzen Sie.','',113)}
 <div className="mText mBank" style={{left:150,top:Y(C(462)),width:212}}>sehr oft | nie | oft | <span style={{background:'#f8f9c0'}}>manchmal</span></div>
 {txt(160,C(491),40,'Mo:\nDi:\nMi:\nDo:\nFr:','mSmall p58Day')}{ink('p58-woche-ink',190,C(484),212,122,'Mo: Fußball spielen, im Internet surfen. Di: Fußball spielen. Mi: im Internet surfen. Do: Fußball spielen. Fr: ins Kino gehen')}
 {txt(458,C(482),90,'Niklas geht','mSmall')}{ink('p58-manchmal-ink',547,C(482),59,25,'manchmal')}{txt(609,C(482),110,'(a) ins Kino.','mSmall')}
 {f('b11',465,C(506)-2,80)}{txt(550,C(506),190,'(b) surft er im Internet.','mSmall')}
 {txt(465,C(530),70,'Er spielt','mSmall')}{f('b12',530,C(530)-2,80)}{txt(616,C(530),150,'(c) Schach, aber er','mSmall')}
 {txt(467,C(554),50,'spielt','mSmall')}{f('b13',512,C(554)-2,72)}{txt(590,C(554),100,'(d) Fußball.','mSmall')}{txt(750,C(568),90,'_/3 Punkte','mTiny')}
 {check('test-2',166,C(612))}
 {title('3',C(634),'Ergänzen Sie die Verben in der richtigen Form.','',122)}
 {txt(157,C(676),50,'a  Du','mSmall')}{ink('p58-kannst-ink',193,C(669),48,23,'kannst')}{txt(241,C(676),220,'gut backen. (können)','mSmall')}
 {txt(156,C(700),90,'b  Mein Sohn','mSmall')}{f('b14',244,C(700)-2,76)}{txt(326,C(700),150,'nicht gern. (lesen)','mSmall')}
 {txt(158,C(724),22,'c','mSmall')}{f('b15',170,C(724)-2,60)}{txt(234,C(724),180,'du gern Auto? (fahren)','mSmall')}
 {txt(512,C(660),22,'d','mSmall')}{f('b16',525,C(660)-2,66)}{txt(597,C(660),230,'wir Fußball spielen? (können)','mSmall')}
 {txt(513,C(692),22,'e','mSmall')}{f('b17',520,C(692)-2,72)}{txt(597,C(692),190,'du heute deine Freunde?','mSmall')}{txt(531,C(708),80,'(treffen)','mSmall')}{txt(754,C(700),90,'_/4 Punkte','mTiny')}
 {check('test-3',166,C(744))}
 {title('4',C(772),'Schreiben Sie Sätze.','',125)}
 {txt(155,C(814),22,'a','mSmall')}<div className="mText" style={{left:176,top:Y(C(814)),fontSize:17}}><i className="mSq"/></div><div style={{position:'absolute',left:176,top:Y(C(826)),width:380,borderBottom:'1px solid #aaa'}}/>{ink('p58-komm-ink',188,C(806),150,19,'Ich kann nicht kommen.')}{txt(495,C(814),210,'(kommen/nicht/ich/kann)','mSmall')}
 {['hören/Musik/ein/bisschen/wir/können','toll/wirklich/er/kochen/kann','Tennis/könnt/ihr/spielen','nicht/leider/kann/mein Freund/Ski fahren'].map((s,i)=>{const y=C(838+i*24);return <span key={s}>{txt(155,y,40,String.fromCharCode(98+i)+' ▪','mSmall')}{f('b'+(18+i),176,y-2,278)}{txt(456,y,14,['?','.','?','.'][i],'mSmall')}{txt(495,y,340,'('+s+')','mSmall')}</span>})}{txt(760,C(926),90,'_/4 Punkte','mTiny')}
 {check('test-4',166,C(934),{b18:'Können wir ein bisschen Musik hören?',b19:'Er kann wirklich toll kochen.|Wirklich toll kann er kochen.|Kochen kann er wirklich toll.',b20:'Könnt ihr Tennis spielen?',b21:'Mein Freund kann leider nicht Ski fahren.|Leider kann mein Freund nicht Ski fahren.|Ski fahren kann mein Freund leider nicht.'})}
 {title('5',C(942),'Komplimente machen und sich bedanken. Ergänzen Sie.','',131)}
 {txt(166,C(990),185,'a ▪ Sie können wirklich','mSmall')}{ink('p58-super-ink',348,C(987),42,26,'super')}
 {txt(202,C(1006),95,'schwimmen.','mSmall')}
 {txt(188,C(1038),30,'▴ H','mSmall')}{f('b22',218,C(1038)-2,72)}{txt(294,C(1038),60,'Dank!','mSmall')}
 {txt(168,C(1070),240,'b ▪ Deine Augen sind so schön.','mSmall')}
 {txt(188,C(1086),52,'▴ Oh, d','mSmall')}{f('b23',242,C(1086)-2,28)}{txt(272,C(1086),15,'.','mSmall')}
 {txt(487,C(974),170,'c ▪ Wow! Du kannst t','mSmall')}{f('b24',655,C(974)-2,67)}{txt(726,C(974),70,'backen.','mSmall')}
 {txt(492,C(1006),30,'▴ V','mSmall')}{f('b25',520,C(1006)-2,88)}{txt(612,C(1006),60,'Dank.','mSmall')}
 {txt(489,C(1038),155,'d ▪ Du kannst sehr g','mSmall')}{f('b26',644,C(1038)-2,36)}{txt(684,C(1038),70,'tanzen.','mSmall')}
 {txt(492,C(1054),70,'▴ Danke s','mSmall')}{f('b27',560,C(1054)-2,44)}{txt(607,C(1054),15,'!','mSmall')}{txt(765,C(1070),90,'_/6 Punkte','mTiny')}
 {check('test-5',166,C(1106))}
 {score(1451,[['0-5','0-4','0-3'],['6-7','5-6','4'],['8-10','7-8','5-6']],410)}
 </>}
 {page==='59'&&<>
 {head('LERNWORTSCHATZ')}<div className="nabModule">7</div>{art('strip',790,181,111,1000)}{title('1',210,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.','',132,654)}
 {txt(168,254,260,'Freizeit und Hobbys','mTitle')}
 {['Ausflug der, ¨e','Film der, -e','Freizeit die','Hobby das, -s','Kino das, -s','Lieblings-\n  Lieblingsfilm der, -e','backen','besuchen','treffen, du\n  triffst, er trifft','fotografieren','kochen','lesen, du\n  liest, er liest','lieben','malen','Musik die\n  Musik hören','Rad fahren,\n  du fährst Rad,\n  er fährt Rad\n  CH: Velo fahren','schwimmen','singen','spazieren gehen','spielen\n  Fußball/Tennis/\n  Gitarre spielen','tanzen'].map((s,i)=>{const y=[287,314,341,368,395,422,477,504,531,586,613,640,695,722,749,804,912,939,966,993,1074][i];return <span key={s}>{txt(168,y,179,s,'mVocabText')}{f('vocab-freizeit-'+i,350,y-2,130,'Übersetzung '+s)}</span>})}
 {txt(510,254,270,'Wie oft?','mTitle')}{['(fast) immer','oft','manchmal','nie'].map((s,i)=><span key={s}>{txt(510,287+i*27,130,s)}{f('vocab-oft-'+i,649,285+i*27,120,'Übersetzung '+s)}</span>)}
 {txt(510,424,270,'Danken','mTitle')}{['Vielen Dank /','Herzlichen Dank!'].map((s,i)=><span key={s}>{txt(510,457+i*27,132,s)}{f('vocab-dank-'+i,649,455+i*27,120,'Übersetzung '+s)}</span>)}
 {txt(510,540,270,'Auf eine Bitte reagieren','mTitle')}{['klar','natürlich','leider /\n  das geht\n  leider nicht','leidtun: tut\n  mir leid'].map((s,i)=>{const y=[574,601,628,710][i];return <span key={s}>{txt(510,y,132,s)}{f('vocab-bitte-'+i,649,y-2,120,'Übersetzung '+s)}</span>})}
 {txt(510,790,270,'Weitere wichtige Wörter','mTitle')}{['Auto das, -s','Gespräch das, -e','Internet das\n  im Internet\n  surfen','Natur die','Spaß machen','können','rauchen','gern\n  nicht so (gut)\n  Wie oft?'].map((s,i)=>{const y=[824,851,878,960,987,1014,1041,1081][i];return <span key={s}>{txt(510,y,132,s)}{f('vocab-weiter-'+i,649,y-2,120,'Übersetzung '+s)}</span>})}
 {txt(168,1131,305,'Lernen Sie Nomen und\nVerb zusammen.','mSmall mTip')}{txt(330,1181,310,'Spaß machen\nFreunde treffen/besuchen','mExample')}
 {title('2',1243,'Welche Wörter möchten Sie noch lernen? Notieren Sie.','',132,650)}{open('eigene-woerter',168,1289,600,115,'2 eigene Wörter')}
 </>}
 {txt(Number(page)%2?704:48,1254,Number(page)%2?190:400,(Number(page)%2?'':'Modul 3   ')+page+' | '+({'57':'siebenundfünfzig','58':'achtundfünfzig','59':'neunundfünfzig'} as Record<string,string>)[page]+(Number(page)%2?'  Modul 3':''),'mFooter')}
 </div><audio className="nabPlayer" ref={audio} controls hidden aria-label="Originalaudio Arbeitsbuch"/></div>;
}
