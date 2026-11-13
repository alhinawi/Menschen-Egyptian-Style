import {usePageReset} from '../exercises/usePageReset';
import {useLayoutEffect,useRef,useState} from 'react';
import {scanData} from '../scan-data/registry';
import './native-ab11.css';
import './native-ab11-lessons45.css';
const norm=(s:string)=>s.normalize('NFC').toLocaleLowerCase('de').trim().replace(/[.,!?;:’']/g,'').replace(/\s+/g,' ');
function Words({s}:{s:string}){return <>{s.split(/(\s+)/).map((w,i)=>/\S/.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-phrase={s} data-word={w.replace(/^[.,!?„"()]+|[.,!?“"()]+$/g,'')}>{w}</span>:w)}</>}
export function NativeAB11Lesson7Close({page}:{page:string}){
 const host=useRef<HTMLDivElement>(null),audio=useRef<HTMLAudioElement>(null),[scale,SS]=useState(1),[track,T]=useState(''),[v,S]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem('native-ab11-'+page)||'{}')}catch{return {}}}),[graded,G]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{const el=host.current;if(!el)return;const measure=()=>SS(Math.min(el.clientWidth/901,el.clientHeight/1275));measure();const ro=new ResizeObserver(measure);ro.observe(el);return()=>ro.disconnect()},[]);
 usePageReset(page,'native-ab11-'+page,()=>{S({});G({})});
 const set=(id:string,value:string)=>{const next={...v,[id]:value};S(next);localStorage.setItem('native-ab11-'+page,JSON.stringify(next));G({})};
 const sy=page==='57'?.75:page==='58'?.76:.87;const Y=(y:number)=>130+(y-130)*sy;
 const txt=(x:number,y:number,w:number,s:string,cls='')=><div className={'mText '+cls} style={{left:x,top:cls==='mFooter'?y:Y(y),width:w}}><Words s={s}/></div>;
 const hints:Record<string,string>={b22:'H_________',b23:'d____',b24:'t___',b25:'V_____',b26:'g__',b27:'s____'};
 const f=(id:string,x:number,y:number,w:number,label=id)=>{const ctx=document.createElement('canvas').getContext('2d');if(ctx)ctx.font="18px 'Times New Roman'";const size=Math.max(10,Math.min(18,18*(w-5)/(ctx?.measureText(v[id]||'').width||1)));return <input placeholder={hints[id]} className="mField" data-native-field={id} aria-label={label} style={{left:x,top:Y(y),width:w,height:22*sy,fontSize:size}} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>};
 const open=(id:string,x:number,y:number,w:number,h:number,label=id)=><textarea className="mField mOpen" data-native-field={id} aria-label={label} style={{left:x,top:Y(y),width:w,height:h*sy,'--mopen-height':h*sy+'px'} as React.CSSProperties} value={v[id]||''} onChange={e=>set(id,e.target.value)}/>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><img className="mArt" alt={'Originalabbildung '+name} src={`assets/native-ab11/p${page}-${name}.png`} style={{left:x,top:Y(y),width:w,height:h*sy}}/>;
 const title=(n:string,y:number,s:string,kb='',x=132,w=700)=><>{kb&&txt(96,y+5,34,kb,'mKB')}<div className={'mNumber '+''} style={{left:x,top:Y(y)}}>{n}</div>{txt(x+35,y,w-35,s,'mTitle')}</>;
 const head=(s:string)=><>{txt(132,135,740,s,'mHeader')}<div className="mRule"/></>;
 const data=scanData['ab-a11:'+page];
 const answers=(group:string)=>Object.fromEntries(data.fields.filter(f=>f.group===group&&f.kind!=='radio'&&f.kind!=='checkbox'&&f.answer!==undefined).map(f=>[f.id,f.answer!]));
 const check=(id:string,x:number,y:number,expected=answers(id))=><div className="mCheck" data-native-task={id} style={{left:x,top:Y(y)}}><button onClick={()=>G({...graded,[id]:Object.entries(expected).every(([k,a])=>a.split('|').some(s=>norm(s)===norm(v[k]||'')))})}>Prüfen ✓</button><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const rule=(id:string,x:number,y:number,test:()=>boolean)=><div className="mCheck" data-native-task={id} style={{left:x,top:Y(y)}}><button onClick={()=>G({...graded,[id]:test()})}>Prüfen ✓</button><output aria-live="polite">{id in graded?(graded[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const listen=(n:string,x:number,y:number)=><button className="mListen" aria-label={'Originalaudio 1 '+n} style={{left:x,top:Y(y)}} onClick={()=>{T(n);if(audio.current){audio.current.src='assets/ab-cd1-track'+n+'.mp3';audio.current.play().catch(()=>{})}}}>▶ 1 {n}</button>;
 const radio=(id:string,val:string,x:number,y:number,label:string)=><input className="mRadio" type="radio" name={'native-ab11-'+page+'-'+id} aria-label={label} style={{left:x,top:Y(y)}} checked={v[id]===val} onChange={()=>set(id,val)}/>;
 const score=(y:number,rows:string[][])=><div className="mScore" style={{left:440,top:Y(y)}}><b>Wörter</b><b>Strukturen</b><b>Kommunikation</b>{rows.map((row,r)=>row.map((s,c)=><div key={r+'-'+c}><i style={{background:['#d71910','#edcf00','#3b9e24'][r]}}/>{s} Punkte</div>))}</div>;
 const markSentence=(id:string,x:number,y:number,w:number,s:string)=><button className={'mQuestion '+(v[id]==='1'?'marked':'')} style={{left:x,top:Y(y),width:w}} aria-label={'Frage markieren '+s} onClick={()=>set(id,v[id]==='1'?'0':'1')}>{s}</button>;
 const stress=(id:string,x:number,y:number,s:string)=> <div className="mStressSentence" style={{left:x,top:Y(y)}}>{s.split(' ').map((w,i)=><span key={i}><button disabled={!/[a-zäöüß]/i.test(w)} className={v[id]&&norm(v[id])===norm(w)?'stressed':''} aria-label={id+' '+w} onClick={()=>set(id,w)}>{w}</button>{' '}</span>)}</div>;
 const check57=(id:string,x:number,y:number)=>rule(id,x,y,()=>v['regel']==='wichtige-info');
 return <div className="nativeAB11 nativeAB11Module1 nativeAB11Lessons45 nativeAB11Next45 nativeAB11Lesson7Close" ref={host} data-native-ab11-page={page}><div className="nabCanvas mCanvas" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='57'&&<>
 {head('TRAINING: SCHREIBEN')}<div className="nabModule">7</div>{title('1',211,'Eine E-Mail beantworten')}
 {txt(143,253,510,'a  Markieren Sie die Fragen von Lisa.','mTitle')}{txt(546,206,280,'Sie beantworten eine E-Mail, einen Brief oder\neine SMS. Lesen Sie den Text genau. Markieren\nSie die Fragen und machen Sie dann Notizen\nfür Ihre Antwort.','mSmall mTip')}
 {txt(168,331,664,'An: Lisa Sommer\nKopie: sommercamper@uni-fs.de\nBetreff: Freizeitprogramm','mEmailHeader')}
 {txt(168,411,664,'Hallo liebe Studentinnen und Studenten der Uni Freiburg und Straßburg,\nich heiße Lisa und organisiere das Freizeitprogramm beim Sommercamp in Straßburg.\nIch möchte Euch fragen:','mSmall')}
 {txt(168,482,240,'Wie alt seid Ihr?','mQuestionExample')}{markSentence('frage-herkunft',315,482,220,'Woher kommt Ihr?')}{markSentence('frage-sprachen',540,482,286,'Welche Sprachen sprecht Ihr?')}{markSentence('frage-freizeit',168,513,445,'Was macht Ihr gern in der Freizeit?')}{markSentence('frage-hobbys',619,513,210,'Welche Hobbys habt Ihr?')}
 {txt(168,547,664,'Bitte schreibt mir kurz eine E-Mail.\n\nIch freue mich sehr auf das Sommercamp mit Euch! Wir haben bestimmt viel Spaß zusammen!\nBis bald! Viele Grüße\nLisa','mSmall')}
 {txt(143,675,340,'b  Machen Sie Notizen für Ihre Antwort an\nLisa. Arbeiten Sie auch mit dem Wörterbuch.','mTitle')}{txt(168,744,320,'Alter\nHerkunft\nSprachen\nFreizeit/Hobby: ins Kino gehen, …','mExample')}{open('eigene-notizen',168,856,325,70,'1b eigene Notizen')}
 {txt(532,675,310,'c  Schreiben Sie nun eine E-Mail an Lisa.','mTitle')}{txt(540,731,310,'Liebe Lisa,\nvielen Dank für Deine E-Mail.','mSmall')}
 {txt(540,791,113,'Mein Name ist','mSmall')}{f('mail-name',657,789,72)}{txt(733,791,100,'und ich bin','mSmall')}{f('mail-alter',540,819,57)}{txt(602,821,170,'Jahre alt.','mSmall')}
 {['Ich komme','Ich spreche','In der Freizeit'].map((s,i)=><span key={s}>{txt(540,855+i*31,112,s,'mSmall')}{f('mail-'+i,657,853+i*31,175)}</span>)}{txt(540,950,300,'Ich freue mich auch sehr auf das Sommercamp!\nViele Grüße','mSmall')}{f('mail-gruss',540,1003,291)}
 {txt(132,1080,710,'TRAINING: AUSSPRACHE','mHeader')}{txt(555,1090,280,'Wandernder Satzakzent','mSmall')}
 {title('1',1137,'Hören Sie und sprechen Sie nach.','',132,355)}{listen('34',96,1137)}
 <div className="mPrintedStress" style={{left:168,top:Y(1181)}}>{[['Spielen',''],['Schach',' spielen'],['Ich kann ','Schach',' spielen.'],['Ich kann ','gut',' Schach spielen.'],['Ich kann ','sehr',' gut Schach spielen.']].map((row,i)=><div key={i}>{row.map((s,j)=><span key={j} className={(row.length===2?j===0:j===1)?'marked':''}>{s}</span>)}</div>)}</div>
 {title('2',1330,'Lesen Sie noch einmal Übung 1 und\nkreuzen Sie an: Was ist richtig?','',132,370)}
 {txt(168,1403,320,'Der Satzakzent ist','mTitle')}{radio('regel','letztes-wort',168,1440,'immer auf dem letzten Wort')}{txt(194,1438,305,'immer auf dem letzten Wort, zum\nBeispiel: Ich kann gut singen.','mSmall')}{radio('regel','wichtige-info',168,1503,'auf der wichtigen Information')}{txt(194,1501,330,'auf der wichtigen Information: Ich\nkann gut Schach spielen. (Ich kann\nnicht gut Gitarre, Fußball … spielen.)','mSmall')}{check57('ta-2',168,1584)}
 {title('3',1137,'Hören Sie und markieren Sie den\nSatzakzent.','',532,332)}{listen('35',495,1137)}
 {['a  ▪ Was machst du in der Freizeit? ↘','   ▴ Ich höre gern Musik. ↘','b  ▪ Hörst du gern Musik? ↗','   ▴ Oh ja. ↘ Ich liebe Musik. ↘','c  ▪ Singst du gern? ↗','   ▴ Oh ja. ↘ Singen macht Spaß! ↘','   ▪ Und kannst du auch singen? ↗','   ▴ Natürlich kann ich singen! ↘ Hör zu: ↘ …'].map((s,i)=>stress('akzent-'+i,565,1206+i*39,s))}
 {listen('36',495,1549)}{txt(565,1549,270,'Hören Sie noch einmal und sprechen\nSie nach.','mSmall')}
 </>}
 {page==='58'&&<>
 {head('TEST')}{title('1',211,'Ergänzen Sie die Hobbys.')}
 {txt(168,253,390,'a  Hallo, ich heiße Eljesa. Meine Hobbys sind','mSmall')}{txt(564,253,105,'Musik hören','mExample')}{txt(676,253,160,'(kusim nöreh),','mSmall')}
 {f('b1',188,286,110)}{txt(305,288,124,'(zannte) und','mSmall')}{f('b2',434,286,105)}{f('b3',546,286,105)}{txt(658,288,180,'(rendeuf refften).','mSmall')}
 {txt(168,329,270,'b  Hallo, ich bin Jan. Meine Hobbys sind','mSmall')}{f('b4',445,327,110)}{f('b5',562,327,110)}{txt(678,329,170,'(luaßfbl elisnep)','mSmall')}{txt(188,360,40,'und','mSmall')}{f('b6',232,358,110)}{f('b7',350,358,110)}{txt(467,360,170,'(ard earnfh).','mSmall')}
 {txt(168,400,270,'c  Und wir sind Cora und Finnia. Wir','mSmall')}{f('b8',445,398,110)}{txt(562,400,67,'(senle),','mSmall')}{f('b9',634,398,115)}{txt(755,400,112,'(trorognieeaff)','mSmall')}{txt(188,431,40,'und','mSmall')}{f('b10',232,429,110)}{txt(350,431,150,'(ckaben) gern.','mSmall')}{check('test-1',168,474)}
 {title('2',519,'Was macht Niklas in seiner Freizeit? Ergänzen Sie.')}{txt(168,560,660,'sehr oft | nie | oft | manchmal','mBank')}
 {txt(168,604,325,'Mo:  Fußball spielen, im Internet surfen\nDi:   Fußball spielen\nMi:   im Internet surfen\nDo:  Fußball spielen\nFr:   ins Kino gehen','mExample')}
 {txt(520,604,320,'Niklas geht manchmal (a) ins Kino.','mSmall')}{f('b11',520,636,77)}{txt(604,638,235,'(b) surft er im Internet.','mSmall')}{txt(520,671,81,'Er spielt','mSmall')}{f('b12',608,669,75)}{txt(690,671,160,'(c) Schach, aber er','mSmall')}{txt(520,704,50,'spielt','mSmall')}{f('b13',576,702,107)}{txt(691,704,155,'(d) Fußball.','mSmall')}{check('test-2',168,751)}
 {title('3',797,'Ergänzen Sie die Verben in der richtigen Form.')}{txt(168,839,340,'a  Du kannst gut backen. (können)','mExample')}
 {txt(168,875,115,'b  Mein Sohn','mSmall')}{f('b14',289,873,78)}{txt(373,875,150,'nicht gern. (lesen)','mSmall')}{txt(168,910,22,'c','mSmall')}{f('b15',194,908,81)}{txt(281,910,230,'du gern Auto? (fahren)','mSmall')}
 {txt(540,839,22,'d','mSmall')}{f('b16',566,837,81)}{txt(652,839,205,'wir Fußball spielen? (können)','mSmall')}{txt(540,875,22,'e','mSmall')}{f('b17',566,873,81)}{txt(652,875,200,'du heute deine Freunde?','mSmall')}{txt(566,910,100,'(treffen)','mSmall')}{check('test-3',168,951)}
 {title('4',997,'Schreiben Sie Sätze.')}{txt(168,1040,330,'a  ▪ Ich kann nicht kommen.','mExample')}{txt(560,1040,280,'(kommen/nicht/ich/kann)','mSmall')}
 {['hören/Musik/ein/bisschen/wir/können','toll/wirklich/er/kochen/kann','Tennis/könnt/ihr/spielen','nicht/leider/kann/mein Freund/Ski fahren'].map((s,i)=>{const y=1075+i*36;return <span key={s}>{txt(168,y,28,String.fromCharCode(98+i)+' ▪','mSmall')}{f('b'+(18+i),203,y-2,347)}{txt(560,y,295,'('+s+')','mSmall')}</span>})}{check('test-4',168,1225,{b18:'Können wir ein bisschen Musik hören?',b19:'Er kann wirklich toll kochen.|Wirklich toll kann er kochen.|Kochen kann er wirklich toll.',b20:'Könnt ihr Tennis spielen?',b21:'Mein Freund kann leider nicht Ski fahren.|Leider kann mein Freund nicht Ski fahren.|Ski fahren kann mein Freund leider nicht.'})}
 {title('5',1271,'Komplimente machen und sich bedanken. Ergänzen Sie.')}
 {txt(168,1313,325,'a  ▪ Sie können wirklich super\n     schwimmen.','mSmall mExample')}{txt(188,1373,20,'▴','mSmall')}{f('b22',214,1371,118)}{txt(339,1373,75,'Dank!','mSmall')}
 {txt(168,1417,330,'b  ▪ Deine Augen sind so schön.','mSmall')}{txt(188,1450,58,'▴ Oh,','mSmall')}{f('b23',251,1448,108)}{txt(365,1450,15,'.','mSmall')}
 {txt(540,1313,153,'c  ▪ Wow! Du kannst','mSmall')}{f('b24',699,1311,72)}{txt(778,1313,75,'backen.','mSmall')}{txt(560,1345,20,'▴','mSmall')}{f('b25',586,1343,107)}{txt(699,1345,75,'Dank.','mSmall')}
 {txt(540,1417,175,'d  ▪ Du kannst sehr','mSmall')}{f('b26',720,1415,62)}{txt(788,1417,65,'tanzen.','mSmall')}{txt(560,1450,73,'▴ Danke','mSmall')}{f('b27',640,1448,103)}{txt(749,1450,15,'!','mSmall')}{check('test-5',168,1493)}
 {score(1510,[['0-5','0-4','0-3'],['6-7','5-6','4'],['8-10','7-8','5-6']])}
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
 </div><audio className="nabPlayer" ref={audio} controls hidden={!track} aria-label="Originalaudio Arbeitsbuch"/></div>;
}
