import {usePageReset} from '../exercises/usePageReset';
import {useLayoutEffect,useRef,useState} from 'react';
import {PageImage} from '../components/PageImage';
import {CheckButton} from '../components/CheckButton';
import '../components/native-ab12.css';

function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\p{L}/u.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-word={w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text}>{w}</span>:w)}</>}
const normalize=(s:string)=>s.normalize('NFC').trim().toLocaleLowerCase('de').replace(/[.!?]+$/,'').replace(/\s+/g,' ');

const SC=(sel:string)=>Array.from({length:16},(_,i)=>`[data-native-ab12='${31+i}'] ${sel}`).join(',');

export function NativeAB12P31to46({page}:{page:string}){
 const W=1072, H=1449;
 const root=useRef<HTMLDivElement>(null),player=useRef<HTMLAudioElement>(null);
 const [scale,ss]=useState(.6);const key='native-ab12-'+page;
 const defaults:Record<string,string>=page==='34'?{'r4a':'einer'}:{};
 const [values,sv]=useState<Record<string,string>>(()=>{try{return {...defaults,...JSON.parse(localStorage.getItem(key)||'{}')}}catch{return {...defaults}}});
 const [results,sr]=useState<Record<string,boolean>>({});
 useLayoutEffect(()=>{if(document.fonts){['400 19.5px DroidSerif','700 19.5px DroidSerif','400 21px FiraSans','500 18px FiraSans','600 21px FiraSans','700 21px FiraSans','400 19px FiraSansCond'].forEach(f=>{try{document.fonts.load(f)}catch{}})}},[]);
 useLayoutEffect(()=>{const el=root.current!;const obs=new ResizeObserver(()=>ss(Math.min(el.clientWidth/W,(el.clientHeight-38)/H)));obs.observe(el);return ()=>obs.disconnect()},[]);
 usePageReset(page,key,()=>{sv({...defaults});sr({})});
 const set=(id:string,v:string)=>{const n={...values,[id]:v};sv(n);localStorage.setItem(key,JSON.stringify(n))};
 const text=(x:number,y:number,w:number,t:string,cls='')=><div className={'naText '+cls} style={{left:x,top:y,width:w}}><Words text={t}/></div>;
 const uml=(x:number,y:number,w:number,pre:string,post:string)=><div className='naText naNw naUmlRow' style={{left:x,top:y,width:w}}><Words text={pre}/><span className="naUmlWrap"><span className="naUmlMark">¨</span><Words text={post}/></span></div>;
 const stext=(x:number,y:number,w:number,t:string,st:Record<string,string|number>,cls='')=><div className={'naText '+cls} style={{left:x,top:y,width:w,...st}}><Words text={t}/></div>;
 const rect=(x:number,y:number,w:number,h:number,c:string)=><div style={{position:'absolute',left:x,top:y,width:w,height:h,background:c}}/>;
 const lin=(x:number,y:number,w:number,h:number,c:string)=><div style={{position:'absolute',left:x,top:y,width:w,height:h,background:c}}/>;
 const art=(name:string,x:number,y:number,w:number,h:number)=><PageImage className="naArt" src={`assets/book-crops/native-ab12-p${page}-${name}.png`} alt={'Originalillustration '+name} style={{left:x,top:y,width:w,height:h}}/>;
 const field=(id:string,x:number,y:number,w:number,label:string,cls='')=><input className={'naField '+cls} aria-label={label} data-native-field={id} style={{left:x,top:y,width:w}} value={values[id]||''} onChange={e=>set(id,e.target.value)} autoComplete="off" spellCheck={false}/>;
 const rule=(x:number,y:number,w:number)=><div className="naRule" style={{left:x,top:y,width:w}}/>;
 const dot=(id:string,value:string,x:number,y:number,label:string,checkbox=false)=><input className="naDot" type={checkbox?'checkbox':'radio'} aria-label={label} name={key+'-'+id} checked={checkbox?values[id]==='true':values[id]===value} onChange={e=>set(id,checkbox?String(e.target.checked):value)} style={{left:x,top:y}}/>;
 const check=(id:string,x:number,y:number,answers:Record<string,string>)=><div className="naCheck" data-check={id} style={{left:x,top:y}}><CheckButton onClick={()=>sr({...results,[id]:Object.entries(answers).every(([k,a])=>a.split('|').some(v=>normalize(v)===normalize(values[k]||(a==='false'?'false':''))))})}/><output aria-live="polite">{id in results?(results[id]?'✓ Richtig!':'Noch einmal'):''}</output></div>;
 const title=(n:string,x:number,y:number,w:number,t:string,cls='')=><div className={'naTitle '+cls} style={{left:x,top:y,width:w}}><b>{n}</b><Words text={t}/></div>;
 const kb=(x:number,y:number,t:string)=><div className="naKB" style={{left:x,top:y}}>{t}</div>;
 const audio=(src:string,x:number,y:number,label:string)=><button className="naAudio" style={{left:x,top:y}} aria-label={'Originalaudio '+label+' abspielen'} onClick={()=>{if(player.current){player.current.src=src;player.current.play().catch(()=>{})}}}>▶ {label}</button>;

 return <div className="nativeAB12" ref={root} data-native-ab12={page}><style>{`@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-400.woff2') format('woff2');font-weight:400}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-700.woff2') format('woff2');font-weight:700}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-500.ttf') format('truetype');font-weight:500;font-display:swap}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-600.woff2') format('woff2');font-weight:600;font-display:swap}@font-face{font-family:DroidSerif;src:url('assets/fonts/droid-serif-400.ttf') format('truetype');font-weight:400;font-display:swap}@font-face{font-family:DroidSerif;src:url('assets/fonts/droid-serif-700.woff2') format('woff2');font-weight:700;font-display:swap}@font-face{font-family:FiraSansCond;src:url('assets/fonts/firasanscond-latin-400.woff2') format('woff2');font-weight:400}${SC('.naText')},${SC('.naBold')},${SC('.naLet')},${SC('.naDlg')},${SC('.naField')}{font-family:DroidSerif,Georgia,serif!important;letter-spacing:-0.65px}[data-native-ab12='31'] .naTitle,[data-native-ab12='32'] .naTitle,[data-native-ab12='33'] .naTitle,[data-native-ab12='34'] .naTitle,[data-native-ab12='35'] .naTitle,[data-native-ab12='36'] .naTitle,[data-native-ab12='37'] .naTitle,[data-native-ab12='38'] .naTitle,[data-native-ab12='39'] .naTitle,[data-native-ab12='40'] .naTitle,[data-native-ab12='42'] .naTitle,[data-native-ab12='43'] .naTitle,[data-native-ab12='44'] .naTitle,[data-native-ab12='45'] .naTitle,[data-native-ab12='46'] .naTitle{font-family:FiraSans,sans-serif!important;letter-spacing:0!important}${SC('.naText')},${SC('.naBold')},${SC('.naLet')},${SC('.naDlg')}{font-size:20px!important}${SC('.naTitle')}{font-size:21px!important}${SC('.naText.naS20')}{font-size:18px!important}${SC('.naSmall')}{font-size:16.5px!important}${SC('.naD19')}{font-size:17.5px!important}${SC('.naField')}{font-size:19px!important}${SC('.naUrl')}{font-size:11.5px!important;font-family:Georgia,serif;color:#333;line-height:13px}[data-native-ab12='41'] .naModul{font:13px FiraSans,sans-serif!important;color:#fff!important;letter-spacing:0!important}[data-native-ab12='41'] .naCanvas .naText.naHeadline{font-family:DroidSerif,Georgia,serif!important;font-size:29px!important;letter-spacing:0.3px!important;color:#6a726f!important}[data-native-ab12='41'] .naTitle.naGB b{min-width:32px!important;height:20px!important;line-height:20px!important;font-size:15px!important;background:#72c261!important;top:-3px;font-size:19px!important;line-height:20px!important}[data-native-ab12='41'] .naTitle.naGB b::before{left:-3px;top:-2px;width:calc(100% - 2px);height:3px}[data-native-ab12='41'] .naTitle.naGB b::after{left:-3px;top:-2px;width:3px;height:calc(100% + 2px)}[data-native-ab12='41'] .naTitle{font-family:FiraSans,sans-serif!important;font-size:22px!important;letter-spacing:0!important}[data-native-ab12='41'] .naText,[data-native-ab12='41'] .naBold{font-size:17px!important}[data-native-ab12='41'] .naBold{font-weight:600}[data-native-ab12='41'] .naField{font-size:17px!important}[data-native-ab12='41'] .naGray{font-size:15px!important;color:#7c7c80!important;letter-spacing:0!important}[data-native-ab12='38'] .naS14{font-size:14px!important}[data-native-ab12='39'] .naForum{font-family:FiraSans,sans-serif!important;font-size:19px!important;color:#17141c;letter-spacing:0!important}[data-native-ab12='39'] .naForumT{font-family:FiraSans,sans-serif!important;font-weight:700;font-size:20px!important;color:#2a457f;letter-spacing:0!important}[data-native-ab12='39'] .naRedD{font-family:FiraSans,sans-serif!important;font-weight:700;font-size:18px!important;color:#a9261c;letter-spacing:0!important}[data-native-ab12='39'] .naForumB{font-size:17px!important}[data-native-ab12='39'] .naF175{font-size:17.5px!important}[data-native-ab12='39'] .naBoxFade39{position:absolute;background:linear-gradient(180deg,#efe9f7 0%,#b6c9ef 55%,#ccd5fd 100%)}[data-native-ab12='39'] .naTippBar{position:absolute;background:#bf932c;color:#fff;font:bold 10px FiraSans,sans-serif;writing-mode:vertical-rl;transform:rotate(180deg);display:flex;align-items:center;justify-content:center}[data-native-ab12='39'] .naGrIt{font-family:DroidSerif,Georgia,serif!important;font-style:italic;font-size:20px!important;color:#565a57!important;letter-spacing:0!important}[data-native-ab12='39'] .naS19{font-size:19.4px!important}[data-native-ab12='39'] .naTrain39{font-family:DroidSerif,Georgia,serif!important;font-size:29px!important;letter-spacing:0!important;color:#565a57}[data-native-ab12='39'] .naTrain39b{letter-spacing:1.2px!important}[data-native-ab12='39'] .naGrIt{font-size:19px!important}[data-native-ab12='39'] .naT39{font-family:FiraSans,sans-serif!important;font-weight:500;font-size:22px!important;letter-spacing:0!important;color:#17141c}[data-native-ab12='39'] .naT39a{font-family:FiraSans,sans-serif!important;font-weight:600;font-size:20.8px!important;letter-spacing:0.3px!important;color:#17141c}[data-native-ab12='39'] .naT39b{font-family:FiraSans,sans-serif!important;font-weight:600;font-size:21px!important;letter-spacing:0!important;color:#17141c}[data-native-ab12='39'] .naField.naFieldLite{border-bottom:1px solid #e3e6e9!important}[data-native-ab12='39'] .naMS39{font-family:DroidSerif,Georgia,serif!important;font-style:italic;font-size:14px!important;color:#666!important;letter-spacing:0!important}[data-native-ab12='39'] .naErga39{font-family:FiraSans,sans-serif!important;font-weight:400;font-size:19px!important;color:#222;letter-spacing:0!important}[data-native-ab12='39'] .naRow39{font-family:DroidSerif,Georgia,serif!important;font-size:20px!important;color:#4d4b47;letter-spacing:0!important}[data-native-ab12='39'] .naT39L{font-family:FiraSans,sans-serif!important;font-weight:600;font-size:22px!important;letter-spacing:0!important;color:#17141c;position:absolute}[data-native-ab12='39'] .naT39L1{font-size:22.5px!important}[data-native-ab12='39'] .naT39b1{font-size:21.5px!important}[data-native-ab12='39'] .naTipp39{font-family:DroidSerif,Georgia,serif!important;font-size:16.1px!important;letter-spacing:0!important;color:#2b2b2b}[data-native-ab12='39'] .naTitle.naGB b{background:#77c06c!important}[data-native-ab12='35'] .naFooter,[data-native-ab12='36'] .naFooter,[data-native-ab12='37'] .naFooter,[data-native-ab12='38'] .naFooter,[data-native-ab12='39'] .naFooter{font-family:DroidSerif,Georgia,serif!important;font-size:16.3px!important;letter-spacing:0!important;color:#252723}[data-native-ab12='36'] .naS19,[data-native-ab12='37'] .naS19{font-size:19.4px!important}[data-native-ab12='31'] .naHeadline,[data-native-ab12='32'] .naHeadline,[data-native-ab12='33'] .naHeadline,[data-native-ab12='34'] .naHeadline,[data-native-ab12='35'] .naHeadline,[data-native-ab12='36'] .naHeadline,[data-native-ab12='37'] .naHeadline,[data-native-ab12='38'] .naHeadline{font-size:30px!important;letter-spacing:0!important;color:#5f6460}[data-native-ab12='35'] .naSansB,[data-native-ab12='36'] .naSansB,[data-native-ab12='37'] .naSansB,[data-native-ab12='38'] .naSansB{font-family:FiraSans,sans-serif!important;font-weight:700;letter-spacing:0!important}[data-native-ab12='35'] .naUml,[data-native-ab12='36'] .naUml,[data-native-ab12='37'] .naUml,[data-native-ab12='38'] .naUml{font-size:72%;letter-spacing:0;margin-right:-2px}[data-native-ab12='35'] .naUmlRow{font-size:19.4px!important}[data-native-ab12='35'] .naUmlWrap{position:relative}[data-native-ab12='35'] .naUmlMark{position:absolute;left:-1px;top:5px;font-size:58%;letter-spacing:0;line-height:1}[data-native-ab12='35'] .naText:not(.naHand){color:#3d3d3d}[data-native-ab12='36'] .naF188{font-size:18.8px!important}[data-native-ab12='36'] .naF182{font-size:18.2px!important}[data-native-ab12='37'] .naF180{font-size:18px!important}[data-native-ab12='35'] .naF190{font-size:19px!important}[data-native-ab12='35'] .naMod,[data-native-ab12='36'] .naMod,[data-native-ab12='37'] .naMod,[data-native-ab12='38'] .naMod{font:13px FiraSans,sans-serif!important;color:#fff!important;letter-spacing:0!important}[data-native-ab12='38'] .naBio{font-size:17.5px!important;letter-spacing:-0.55px!important}[data-native-ab12='38'] .naJ{white-space:normal;text-align:justify;text-align-last:justify}[data-native-ab12='40'] .naFooter{font-family:DroidSerif,Georgia,serif!important;font-size:16.3px!important;letter-spacing:0!important;color:#252723}[data-native-ab12='40'] .naT40{font-family:FiraSans,sans-serif!important;font-weight:600;font-size:21px!important;letter-spacing:0!important;color:#17141c}[data-native-ab12='40'] .naTitle.naGB b{min-width:32px!important;height:20px!important;line-height:20px!important;font-size:15px!important;background:#77c06c!important}[data-native-ab12='40'] .naDot{width:17px!important;height:17px!important}[data-native-ab12='40'] .naField{border-bottom:1.5px solid #ccd1d6!important}[data-native-ab12='40'] .naBank40{font-family:FiraSansCond,FiraSans,sans-serif!important;font-size:19px!important;letter-spacing:0!important;color:#3a4c7a}[data-native-ab12='40'] .naEvalH40{font-family:FiraSans,sans-serif!important;font-weight:700;font-size:18px!important;letter-spacing:0!important}[data-native-ab12='40'] .naEvalC40{font-family:DroidSerif,Georgia,serif!important;font-size:16px!important;letter-spacing:0!important;color:#505050}[data-native-ab12='40'] .naF190{font-size:19px!important}[data-native-ab12='40'] .naF196{font-size:19.6px!important}[data-native-ab12='42'] .naText,[data-native-ab12='42'] .naBold{font-size:19.5px!important}[data-native-ab12='42'] .naBold{font-weight:600}[data-native-ab12='42'] .naField{font-size:19.5px!important;border-bottom:1px solid #b0b2ae!important}[data-native-ab12='42'] .naTitle{font-family:FiraSans,sans-serif!important;font-size:21px!important;font-weight:700;letter-spacing:0!important;color:#33342e}[data-native-ab12='42'] .naTitle.naGB b{min-width:31px!important;height:20px!important;line-height:20px!important;font-size:19px!important;background:#48a495!important;top:-3px}[data-native-ab12='42'] .naTitle.naGB b::before{left:-3px;top:-3px;width:100%;height:3px}[data-native-ab12='42'] .naTitle.naGB b::after{left:-3px;top:-3px;width:3px;height:calc(100% + 3px)}[data-native-ab12='42'] .naKB{color:#5da9dd;font-size:11px}[data-native-ab12='42'] .naSide42{color:#7a82b2;font-size:11px;letter-spacing:1px}[data-native-ab12='42'] .naBank42{font-family:FiraSansCond,FiraSans,sans-serif!important;font-size:19px!important;letter-spacing:0!important;color:#3a4c7a!important}[data-native-ab12='42'] .naDot{width:17px!important;height:17px!important;border-color:#cfcdb9!important}[data-native-ab12='42'] .naEvalC42{font-family:DroidSerif,Georgia,serif!important;font-size:16px!important;letter-spacing:0!important;color:#505050}[data-native-ab12='42'] .naFooter{font-family:DroidSerif,Georgia,serif!important;font-size:16.3px!important;letter-spacing:0!important;color:#2c2e2d}[data-native-ab12='42'] .naB42a{font-size:18.2px!important}[data-native-ab12='42'] .naB42b{font-size:19px!important}[data-native-ab12='42'] .naEx4{font-family:FiraSans,sans-serif!important;font-weight:400;letter-spacing:0!important;font-size:18.3px!important;color:#33342e}[data-native-ab12='42'] .naEx4m{font-family:FiraSans,sans-serif!important;font-weight:500;letter-spacing:0!important;font-size:18px!important;color:#33342e}[data-native-ab12='42'] .naS184{font-size:18.4px!important}[data-native-ab12='42'] .naS187{font-size:18.7px!important}[data-native-ab12='42'] .naEx4b{font-family:FiraSans,sans-serif!important;font-weight:700;letter-spacing:0!important;font-size:18.3px!important;color:#3a57a8}[data-native-ab12='42'] .naSq42{position:absolute;width:10px;height:10px;background:#213d8d}[data-native-ab12='42'] .naTri42{position:absolute;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-bottom:9px solid #4cb686}[data-native-ab12='43'] .naText,[data-native-ab12='43'] .naBold{font-size:19.5px!important}[data-native-ab12='43'] .naBold{font-weight:700}[data-native-ab12='43'] .naField{font-size:19.5px!important;border-bottom:1px solid #b0b2ae!important}[data-native-ab12='43'] .naTitle{font-family:FiraSans,sans-serif!important;font-size:21px!important;font-weight:700;letter-spacing:0!important;color:#33342e}[data-native-ab12='43'] .naTitle.naGB b{min-width:31px!important;height:20px!important;line-height:20px!important;font-size:19px!important;background:#48a495!important;top:1px}[data-native-ab12='43'] .naTitle.naGB b::before{display:none!important}[data-native-ab12='43'] .naTitle.naGB b::after{left:-3px!important;top:-4px!important;width:3px!important;height:calc(100% + 4px)!important}[data-native-ab12='43'] .naKB{color:#66b3cf;font-size:11px}[data-native-ab12='43'] .naSide43{color:#7a82b2;font-size:11px;letter-spacing:1px}[data-native-ab12='43'] .naFooter{font-family:DroidSerif,Georgia,serif!important;font-size:16.3px!important;letter-spacing:0!important;color:#2c2e2d}[data-native-ab12='43'] .naModul{font:13px FiraSans,sans-serif!important;color:#fff!important;letter-spacing:0!important}[data-native-ab12='43'] .naHeadline{font-family:DroidSerif,Georgia,serif!important;font-size:29px!important;letter-spacing:2px!important;color:#6a726f!important}[data-native-ab12='43'] .naSub43{font-family:FiraSans,sans-serif!important;font-weight:400;font-size:18.7px!important;letter-spacing:0!important;color:#33342e}[data-native-ab12='43'] .naSoup43{font-family:FiraSansCond,FiraSans,sans-serif!important;font-size:18px!important;letter-spacing:0.2px!important;color:#4e557e}[data-native-ab12='43'] .naSoup43B{font-size:17.3px!important}[data-native-ab12='43'] .naBub43{position:absolute;border:1.5px solid #e3dcc8;border-radius:50%}[data-native-ab12='43'] .naTitle{font-size:21.4px!important;font-weight:600!important}[data-native-ab12='43'] .naTitle.naGB b{margin-right:9px!important}[data-native-ab12='43'] .naBubL43{font-size:16.2px!important}[data-native-ab12='43'] .naF193{font-size:19.3px!important}[data-native-ab12='43'] .naNoRule43{border-bottom-color:transparent!important}[data-native-ab12='43'] .naTt6{font-size:22.2px!important}[data-native-ab12='43'] .naTt7{font-size:21.9px!important}[data-native-ab12='43'] .naTt8{font-size:22.1px!important}[data-native-ab12='43'] .naTt9{font-size:21.9px!important}[data-native-ab12='43'] .naT9H{font-size:17px!important}[data-native-ab12='43'] .naT9{font-size:16.5px!important}[data-native-ab12='43'] .naSide43S{font-size:10px!important;letter-spacing:0.5px!important}[data-native-ab12='43'] .naSide43W{letter-spacing:0.4px!important}[data-native-ab12='43'] .naSide43N{font-weight:600!important;color:#656d9b!important;font-size:10px!important;letter-spacing:0.5px!important}[data-native-ab12='43'] .naSide43F{font-size:13px!important}[data-native-ab12='44'] .naText,[data-native-ab12='44'] .naBold{font-size:19.5px!important}[data-native-ab12='44'] .naField{font-size:19.5px!important;border-bottom:1px solid #c5c0cf!important}[data-native-ab12='44'] .naTitle{font-family:FiraSans,sans-serif!important;font-size:21px!important;font-weight:600!important;letter-spacing:0!important;color:#33342e}[data-native-ab12='44'] .naTitle.naGB b{min-width:31px!important;height:20px!important;line-height:20px!important;font-size:19px!important;background:#48a495!important;top:1px}[data-native-ab12='44'] .naTitle.naGB b::before{display:none!important}[data-native-ab12='44'] .naTitle.naGB b::after{left:-3px!important;top:-4px!important;width:3px!important;height:calc(100% + 4px)!important;background:#c82828}[data-native-ab12='44'] .naKB{color:#66b3cf;font-size:11px}[data-native-ab12='44'] .naHeadline{font-family:DroidSerif,Georgia,serif!important;font-size:29px!important;letter-spacing:2px!important;color:#6a726f!important}[data-native-ab12='44'] .naFooter{font-family:DroidSerif,Georgia,serif!important;font-size:16.3px!important;letter-spacing:0!important;color:#2c2e2d}[data-native-ab12='44'] .naModul{font:400 12.5px FiraSansCond,FiraSans,sans-serif!important;color:#fff!important;letter-spacing:0!important}[data-native-ab12='44'] .naModul .tapWord{padding:0!important}[data-native-ab12='44'] .naBank44{font-family:FiraSansCond,FiraSans,sans-serif!important;font-size:19px!important;letter-spacing:0!important;color:#4e557e}[data-native-ab12='44'] .naS185{font-size:18.5px!important}[data-native-ab12='44'] .naCol44{font-size:17.5px!important;white-space:normal!important;text-align:justify;text-align-last:left;line-height:1.3;color:#3c3c3a!important}[data-native-ab12='44'] .naJ44{text-align-last:justify}[data-native-ab12='44'] .naCol44 .tapWord{padding:0!important}[data-native-ab12='44'] .naHl44{font-family:DroidSerif,Georgia,serif!important;font-weight:400;font-style:italic;font-size:19px!important;color:#3a3a37;letter-spacing:0!important}[data-native-ab12='44'] .naLn44{font-size:10px!important;color:#a3a3a3!important;letter-spacing:0!important}[data-native-ab12='44'] .naStmt44{font-size:19.5px!important}[data-native-ab12='44'] .naSide44{color:#656d9b;font-weight:600;font-size:10px;letter-spacing:0.5px}[data-native-ab12='44'] .naDot{width:19px!important;height:19px!important;border-color:#e4e6d8!important}[data-native-ab12='44'] .naSq44{position:absolute;width:11px;height:10px;background:#213d8d}[data-native-ab12='44'] .naLet44{font-weight:400;font-size:19px!important;letter-spacing:0!important;color:#37373c!important}[data-native-ab12='44'] .naS15{font-size:19px!important;color:#37373c!important}[data-native-ab12='44'] .naF193{font-size:19.3px!important;letter-spacing:-0.65px!important}[data-native-ab12='44'] .naDlg44{font-size:18.5px!important;letter-spacing:0!important}[data-native-ab12='44'] .naDlg44 .tapWord{padding:0!important}[data-native-ab12='44'] .naTri44{position:absolute;width:0;height:0;border-left:5.5px solid transparent;border-right:5.5px solid transparent;border-bottom:9px solid #4cb686}[data-native-ab12='45'] .naFooter{font-family:DroidSerif,Georgia,serif!important;font-size:16.3px!important;letter-spacing:0!important;color:#2c2e2d}[data-native-ab12='45'] .naModul{font:400 12.5px FiraSansCond,FiraSans,sans-serif!important;color:#fff!important;letter-spacing:0!important}[data-native-ab12='45'] .naModul .tapWord{padding:0!important}[data-native-ab12='45'] .naT45{font-family:FiraSans,sans-serif!important;font-weight:600;font-size:21px!important;letter-spacing:0.3px!important;color:#33342e}[data-native-ab12='45'] .naTitle{font-size:21px!important;font-weight:600!important;letter-spacing:0.3px!important;color:#33342e}[data-native-ab12='45'] .naTitle.naGB b{min-width:31px!important;height:20px!important;line-height:20px!important;font-size:19px!important;background:#48a495!important;top:1px;margin-right:13px!important}[data-native-ab12='45'] .naTitle.naGB b::before{left:-4px!important;top:-5px!important;width:calc(100% + 4px)!important;height:4px!important}[data-native-ab12='45'] .naTitle.naGB b::after{display:none!important}[data-native-ab12='45'] .naTitle.naSer45{font-family:DroidSerif,Georgia,serif!important;font-weight:700!important;font-size:19px!important;letter-spacing:-0.65px!important}[data-native-ab12='45'] .naLet45{font-family:DroidSerif,Georgia,serif!important;font-weight:400;font-size:19px!important;letter-spacing:0!important;color:#37373c!important}[data-native-ab12='45'] .naSatz45{font-family:DroidSerif,Georgia,serif!important;font-style:italic;font-size:17px!important;letter-spacing:0!important;color:#686d68!important}[data-native-ab12='45'] .naHl45{font-family:DroidSerif,Georgia,serif!important;font-size:17px!important;letter-spacing:0!important;color:#3a3a37!important}[data-native-ab12='45'] .naF190{font-size:19px!important}[data-native-ab12='45'] .naText,[data-native-ab12='45'] .naBold{font-size:19.5px!important}[data-native-ab12='45'] .naF185{font-size:18.5px!important}[data-native-ab12='45'] .naLs02{letter-spacing:-0.45px!important}[data-native-ab12='45'] .naTls60{letter-spacing:0.6px!important}[data-native-ab12='45'] .naAudio{background:none!important;color:#2e9e8c!important;font:600 15px FiraSans,sans-serif!important;min-height:0!important;padding:0!important}`}</style><div className="naCanvas" style={{width:W,height:H,transform:`translate(-50%,-50%) scale(${scale})`}}>
 {page==='31'&&<>
  {art('0',982,42,85,78)}
  {lin(354,107,605,6,'#a6ca03')}
  {text(107,77,240,'BASISTRAINING','naHeadline naNw')}
  {kb(78,168,'KB 6')}
  {title('5',130,160,760,'Der Fernseher ist kaputt. Schreiben Sie das Gespräch.','naGB')}
  <div className="naSide" style={{left:75,top:195}}>KOMMUNIKATION</div>
  {text(146,193,145,'Rezeptionist/in','naBold naNw')}
  {text(460,197,60,'Gast','naBold naNw')}
  {text(146,232,137,'helfen können?','naNw')}
  {art('arr-r',404,256,58,32)}
  {text(460,260,130,'Problem haben','naNw')}
  {text(460,286,150,'Fernseher kaputt','naNw')}
  {text(145,310,169,'Techniker schicken','naNw')}
  {art('arr-l',404,308,58,30)}
  {text(145,335,207,'sofort darum kümmern','naNw')}
  {art('arr-r',404,350,58,32)}
  {text(460,364,372,'Eine Bitte noch: Es gibt keine Handtücher.','naNw')}
  {art('arr-l',404,380,58,30)}
  {text(145,387,236,'sofort Handtücher bringen','naNw')}
  {art('arr-r',404,405,58,32)}
  {text(459,415,126,'Dank für Hilfe','naNw')}
  {text(697,241,240,'Kann ich Ihnen helfen?','naHand naD19 naNw')}
  {text(700,265,270,'Ja, ich habe ein Problem. ...','naHand naD19 naNw')}
  {kb(78,482,'KB 7')}
  {title('6',130,474,760,'Was ist richtig? Kreuzen Sie an.','naGB')}
  <div className="naSide" style={{left:75,top:515}}>STRUKTUREN</div>
  {text(145,516,8,'a','naNw')}
  {text(169,516,114,'Peter möchte','naNw')}
  {text(327,516,101,'nach einem','naNw')}
  {text(472,516,55,'für ein','naNw')}
  {text(549,516,267,'Jahr nach Japan gehen. Er hat','naNw')}
  {text(860,516,41,'nach','naNw')}
  {text(193,543,99,'vor einem','naNw')}
  {text(298,543,393,'Jahr schon ein Praktikum in Japan gemacht.','naNw')}
  {text(143,567,10,'b','naNw')}
  {text(168,567,116,'Anne möchte','naNw')}
  {text(328,567,26,'für','naNw')}
  {text(398,567,525,'nach ihrem Medizinstudium in Afrika als Ärztin arbeiten.','naNw')}
  {text(144,593,165,'c Barbara beginnt','naNw')}
  {text(353,593,41,'nach','naNw')}
  {text(439,593,318,'in drei Monaten mit dem Studium.','naNw')}
  {text(144,618,117,'d Moritz hat','naNw')}
  {text(304,618,17,'in','naNw')}
  {text(364,618,28,'vor','naNw')}
  {text(410,618,477,'einem halben Jahr mit seinem Ingenieur-Studium an-','naNw')}
  {text(166,642,84,'gefangen.','naNw')}
  {text(296,642,18,'In','naNw')}
  {text(359,642,524,'Für vier Jahren ist er fertig. Dann möchte er gern in einer','naNw')}
  {text(167,670,167,'Autofirma arbeiten.','naNw')}
  {text(144,697,144,'e Maria möchte','naNw')}
  {text(333,697,84,'nach dem','naNw')}
  {text(461,697,380,'für den Deutschkurs die Prüfung machen.','naNw')}
  {dot('6a1','nach einem',299,522,'6 a (1) nach einem')}
  {dot('6a1','für ein',450,522,'6 a (1) für ein')}
  {dot('6a2','nach',832,523,'6 a (2) nach')}
  {dot('6a2','vor',162,546,'6 a (2) vor')}
  {dot('6b','für',300,575,'6 b für')}
  {dot('6b','nach',362,575,'6 b nach')}
  {dot('6c','nach',324,597,'6 c nach')}
  {dot('6c','in',409,597,'6 c in')}
  {dot('6d1','in',277,621,'6 d (1) in')}
  {dot('6d1','vor',335,623,'6 d (1) vor')}
  {dot('6d2','In',265,649,'6 d (2) In')}
  {dot('6d2','Für',331,649,'6 d (2) Für')}
  {dot('6e','nach dem',305,702,'6 e nach dem')}
  {dot('6e','für den',433,702,'6 e für den')}
  {check('31-1',888,700,{'6a1':'für ein','6a2':'vor','6b':'nach','6c':'in','6d1':'vor','6d2':'In','6e':'nach dem'})}
  {kb(78,783,'KB 7')}
  {title('7',130,775,760,'Akkusativ oder Dativ? Ergänzen Sie.','naGB')}
  <div className="naSide" style={{left:75,top:815}}>STRUKTUREN</div>
  {text(143,812,155,'a für eine Woche','naNw')}
  {text(432,812,67,'d vor d','naNw')}
  {text(557,812,66,'Sitzung','naNw')}
  {text(720,812,77,'g in ein','naNw')}
  {text(854,812,57,'Woche','naNw')}
  {text(142,837,77,'b in ein','naNw')}
  {text(267,837,65,'Monat','naNw')}
  {text(432,837,80,'e für ein','naNw')}
  {text(565,837,65,'Monat','naNw')}
  {text(721,837,84,'h vor ein','naNw')}
  {text(862,837,39,'Jahr','naNw')}
  {text(143,862,99,'c nach ein','naNw')}
  {text(300,862,60,'Stunde','naNw')}
  {text(432,862,82,'f nach d','naNw')}
  {text(572,862,39,'Kurs','naNw')}
  {field('p31-7b',218,842,51,'7b')}
  {field('p31-7c',242,863,52,'7c')}
  {field('p31-7d',483,813,125,'7d')}
  {field('p31-7e',515,843,50,'7e')}
  {field('p31-7f',515,863,53,'7f')}
  {field('p31-7g',800,814,50,'7g')}
  {field('p31-7h',808,844,50,'7h')}
  {check('31-2',908,856,{'p31-7b':'em','p31-7c':'er','p31-7d':'er','p31-7e':'en','p31-7f':'em','p31-7g':'er','p31-7h':'em'})}
  {kb(78,945,'KB 7')}
  {title('8',130,937,760,'Im Chatroom. Ordnen Sie zu.','naGB')}
  <div className="naSide" style={{left:75,top:975}}>STRUKTUREN</div>
  {stext(140,980,28,'am',{color:'#2a4f9e',textDecoration:'line-through'},'naOpt naSmall naNw')}
  {text(173,980,10,'|','naOpt naNw')}
  {stext(187,980,24,'um',{color:'#7a8f0a'},'naOpt naNw')}
  {text(216,980,10,'|','naOpt naNw')}
  {stext(226,980,40,'nach',{color:'#7a8f0a'},'naOpt naNw')}
  {text(268,980,10,'|','naOpt naNw')}
  {stext(278,980,28,'am',{color:'#2a4f9e'},'naOpt naSmall naNw')}
  {text(308,980,10,'|','naOpt naNw')}
  {stext(316,980,26,'vor',{color:'#7a8f0a'},'naOpt naNw')}
  {text(348,980,10,'|','naOpt naNw')}
  {stext(357,980,24,'um',{color:'#7a8f0a'},'naOpt naNw')}
  {text(386,980,10,'|','naOpt naNw')}
  {stext(395,980,80,'von ... bis',{color:'#2a4f9e'},'naOpt naNw')}
  {text(478,980,10,'|','naOpt naNw')}
  {stext(493,980,40,'nach',{color:'#2a4f9e'},'naOpt naNw')}
  {art('chat',124,1032,878,304)}
  {stext(153,1056,60,'siri99:',{color:'#6e7fa0',fontWeight:'bold'},'naSmall naNw')}
  {text(242,1059,185,'Hi Jule, was machst du','naSmall naNw')}
  {stext(430,1062,22,'am',{color:'#2a4f9e'},'naOpt naNw')}
  {text(462,1059,20,'(a)','naSmall naNw')}
  {text(485,1059,288,'Freitag? Sehen wir uns mal wieder?','naSmall naNw')}
  {stext(153,1085,65,'Jule_m:',{color:'#b03a2e',fontWeight:'bold'},'naSmall naNw')}
  {text(241,1085,226,'Gern. Am Freitag arbeite ich','naSmall naNw')}
  {text(572,1085,62,'(b) acht','naSmall naNw')}
  {text(738,1085,134,'(c) zwei Uhr und','naSmall naNw')}
  {text(337,1109,300,'(d) der Arbeit gehe ich zum Arzt. Aber','naSmall naNw')}
  {text(740,1111,192,'(e) Abend habe ich Zeit.','naSmall naNw')}
  {stext(153,1136,60,'siri99:',{color:'#6e7fa0',fontWeight:'bold'},'naSmall naNw')}
  {text(240,1137,590,'Gehen wir ins Kino? In den neuen Film mit Angelina Jolie? Hast du Lust?','naSmall naNw')}
  {text(337,1161,112,'(f) 20:30 Uhr?','naSmall naNw')}
  {stext(153,1187,65,'Jule_m:',{color:'#b03a2e',fontWeight:'bold'},'naSmall naNw')}
  {text(240,1188,174,'Gute Idee. Wollen wir','naSmall naNw')}
  {text(517,1188,405,'(g) dem Kino noch etwas zusammen essen? Komm','naSmall naNw')}
  {text(240,1213,37,'doch','naSmall naNw')}
  {text(381,1214,347,'(h) sieben Uhr zu mir. Ich koche etwas und','naSmall naNw')}
  {text(832,1214,57,'(i) dem','naSmall naNw')}
  {text(241,1240,300,'Essen fahren wir zusammen ins Kino.','naSmall naNw')}
  {stext(153,1265,60,'siri99:',{color:'#6e7fa0',fontWeight:'bold'},'naSmall naNw')}
  {text(240,1265,360,'Super! Das ist sehr nett von dir. Bis morgen.','naSmall naNw')}
  {field('p31-8b',482,1082,84,'8b')}
  {field('p31-8c',650,1083,82,'8c')}
  {field('p31-8d',152,1106,178,'8d')}
  {field('p31-8e',642,1108,93,'8e')}
  {field('p31-8f',245,1158,87,'8f')}
  {field('p31-8g',420,1185,90,'8g')}
  {field('p31-8h',285,1209,90,'8h')}
  {field('p31-8i',734,1212,92,'8i')}
  {check('31-3',152,1344,{'p31-8b':'von','p31-8c':'bis','p31-8d':'Nach|nach','p31-8e':'am','p31-8f':'Um|um','p31-8g':'vor','p31-8h':'um','p31-8i':'nach'})}
  {text(815,1389,162,'einunddreißig | 31','naFooter')}
  {art('modul-tab',988,1384,80,32)}
 </>}
 {page==='32'&&<>
  {art('1',122,224,820,129)}
  {art('2',108,772,830,130)}
  {rect(166,740,800,44,'#faf9ce')}
  {lin(376,108,607,5,'#bdd444')}
  {lin(232,940,274,2,'#c4c4ce')}
  {lin(192,964,665,2,'#c2c3c6')}
  {lin(192,991,665,2,'#c2c3c6')}
  {lin(192,1018,665,2,'#c2c3c6')}
  {lin(192,1045,665,2,'#c2c3c6')}
  {lin(192,1072,665,2,'#c2c3c6')}
  {lin(192,1097,665,2,'#c2c3c6')}
  {text(128,78,241,'BASISTRAINING','naHeadline naNw')}
  {kb(80,163,'KB 8')}
  {title('9',130,158,760,'Einen Termin verschieben.','naGB')}
  <div className="naSide" style={{left:87,top:208,color:'#879cbb'}}>SCHREIBEN</div>
  {stext(136,199,14,'a',{color:'#4357ad'},'naBold naNw')}
  {text(169,195,210,'Ergänzen Sie die E-Mail.','naBold naNw')}
  {text(195,371,190,'Sehr geehrte Frau Winter,','naNw')}
  {text(195,397,45,'leider','naNw')}
  {text(195,421,310,'(heute um 16 Uhr nicht kommen können)','naNw')}
  {text(195,444,660,'Wir haben ein Problem mit der Internetverbindung in der Firma und ich warte auf den','naNw')}
  {text(194,469,80,'Techniker.','naNw')}
  {text(195,493,220,'(Termin verschieben können)','naNw')}
  {text(196,531,170,'(Mittwoch Zeit haben)','naNw')}
  {text(196,566,310,'(ab Freitag für eine Woche im Urlaub sein)','naNw')}
  {text(196,603,185,'Mit freundlichen Grüßen','naNw')}
  {text(196,626,70,'Peter Frei','naNw')}
  {stext(135,698,14,'b',{color:'#4357ad'},'naBold naNw')}
  {text(165,699,265,'Antworten Sie auf die E-Mail.','naBold naNw')}
  {stext(171,739,800,'kein Problem | natürlich Termin verschieben können | Mittwoch Zeit haben | passt 15 Uhr? | Grüße',{color:'#56617d'},'naSmall naNw')}
  {text(165,920,42,'Sehr','naNw')}
  {text(508,920,14,',','naNw')}
  {kb(80,1138,'KB 8')}
  {title('10',126,1140,780,'Hören Sie das Telefongespräch und ordnen Sie zu.','naGB')}
  <div className="naSide" style={{left:92,top:1196,color:'#879cbb'}}>HÖREN</div>
  {audio('assets/ab-a12-cd2-track15.mp3',64,1170,'2 15')}
  <svg style={{position:'absolute',left:0,top:0,pointerEvents:'none'}} width="1072" height="1452"><path d="M283 1179 C 360 1182, 412 1240, 500 1253" stroke="#8ba3c7" strokeWidth="1.6" fill="none"/></svg>
  {text(110,1170,14,'a','naBold naNw')}{text(140,1170,150,'Heute um elf','naNw')}
  {text(110,1195,14,'b','naBold naNw')}{text(140,1195,150,'In zwei Stunden','naNw')}
  {text(110,1220,14,'c','naBold naNw')}{text(140,1220,210,'Am Donnerstag um drei','naNw')}
  {text(110,1247,14,'d','naBold naNw')}{text(140,1247,170,'Nach der Sitzung','naNw')}
  {text(110,1272,14,'e','naBold naNw')}{text(140,1272,120,'Am Freitag','naNw')}
  {text(110,1297,14,'f','naBold naNw')}{text(140,1297,120,'Stefan hat','naNw')}
  {text(505,1170,400,'muss Stefan Kollegen am Flughafen abholen.','naNw')}
  {text(505,1195,300,'hat Nina eine Sitzung.','naNw')}
  {text(505,1220,300,'am Freitag um 14.30 Uhr Zeit.','naNw')}
  {text(505,1247,300,'hat Stefan keine Zeit.','naNw')}
  {text(505,1272,320,'muss Nina einen Kollegen anrufen.','naNw')}
  {text(505,1297,340,'hat Nina nach dem Mittagessen Zeit.','naNw')}
  {art('modul-tab',0,1384,82,32)}
  {text(97,1392,176,'32 | zweiunddreißig','naFooter')}
  {field('p32-9a1',245,393,660,'9a1')}
  {text(910,404,16,'.','naNw')}
  {field('p32-9a2',283,463,622,'9a2')}
  {text(910,474,16,'?','naNw')}
  {field('p32-9a3',195,503,710,'9a3')}
  {text(910,518,16,'?','naNw')}
  {field('p32-9a4',195,547,710,'9a4')}
  {text(910,560,16,'.','naNw')}
  {field('p32-9b',232,913,274,'9b')}
  {check('32-1',700,1110,{'p32-9a1':'kann ich heute um 16 Uhr nicht kommen','p32-9a2':'Können wir den Termin verschieben','p32-9a3':'Haben Sie am Mittwoch Zeit','p32-9a4':'Ab Freitag bin ich für eine Woche im Urlaub','p32-9b':'geehrter Herr Frei'})}
 </>}
 {page==='33'&&<>
  {art('0',982,44,85,78)}
  {art('cards',55,265,925,118)}
  {art('board',60,712,900,213)}
  {art('16',640,1225,318,71)}
  {art('modul-tab',1000,1384,71,32)}
  {lin(444,112,516,3,'#b3d33f')}
  {rect(140,377,790,7,'#c89b20')}
  {rect(140,384,13,54,'#c89b20')}
  <div className="naSide" style={{left:136,top:390,fontSize:11,letterSpacing:1,color:'#5a4a10'}}>Tipp</div>
  {lin(675,1022,286,2,'#bcd43c')}
  {text(106,84,331,'TRAINING: SPRECHEN','naHeadline naNw')}
  {title('1',109,162,640,'Wie bittet man um Hilfe? Was antwortet man?','naGB')}
  {text(147,198,781,'Schreiben Sie Bitten auf gelbe Kärtchen und Antworten auf blaue Kärtchen. (Hilfe finden','naNw')}
  {text(147,223,280,'Sie in den Lektionen 13 und 16.)','naNw')}
  {text(190,392,726,'Sie möchten besser sprechen? Lernen Sie die Fragen und Sätze in der Rubrik Kommunikation','naNw')}
  {text(190,414,639,'auf der 4. Seite jeder Lektion auswendig. Sie helfen Ihnen in vielen Situationen.','naNw')}
  {title('2',105,484,850,'Spiel: Bitten Sie eine Mitspielerin / einen Mitspieler. Sie/Er antwortet.','naGB')}
  {text(149,510,395,'Die Kärtchen in 1 können Ihnen helfen.','naBold naNw')}
  {stext(168,549,130,'Spielanleitung:',{color:'#3a6ab0'},'naS20 naBold naNw')}
  {stext(300,549,544,'Stellen Sie Ihre Spielfigur auf ein Feld und würfeln Sie. Ziehen Sie mit Ihrer',{color:'#3a6ab0'},'naEvalC40 naNw')}
  {stext(168,574,685,'Spielfigur. Formulieren Sie Bitten. Ist die Bitte richtig, bekommen Sie zwei Punkte. Spielen Sie',{color:'#3a6ab0'},'naEvalC40 naNw')}
  {stext(168,600,318,'zehn Minuten. Wer hat die meisten Punkte?',{color:'#3a6ab0'},'naEvalC40 naNw')}
  {stext(145,644,16,'■',{color:'#1a3f9e'},'naNw')}
  {text(171,644,680,'Entschuldigung, können Sie mir helfen? Die Klimaanlage funktioniert nicht.','naNw')}
  {stext(145,678,16,'▲',{color:'#2eb75b'},'naNw')}
  {text(171,678,625,'Das tut mir leid. Ich kümmere mich sofort darum.','naNw')}
  {stext(106,1001,380,'TRAINING: AUSSPRACHE',{fontSize:27,letterSpacing:2,color:'#4a4a45',fontFamily:'Georgia'},'naNw')}
  {stext(498,1003,175,'Vokale: „o“ und „u“',{color:'#787a68'},'naEvalC40 naNw')}
  {audio('assets/ab-a12-cd2-track16.mp3',42,1092,'CD2 · Track16')}
  {title('1',109,1064,400,'Sie hören jeweils vier Wörter.','naGB naNw')}
  {audio('assets/ab-a12-cd2-track17.mp3',573,1064,'CD2 · Track17')}
  {text(680,1060,288,'Hören Sie und sprechen Sie nach.','naBold naNw')}
  {text(146,1099,422,'Wie oft hören Sie „o“, wie oft „u“? Notieren Sie.','naNw')}
  {text(147,1128,8,'1','naNw')}
  {text(170,1128,10,'o','naNw')}
  {text(190,1126,40,'2t','naHand naD19 naNw')}
  {text(258,1126,40,'2t','naHand naD19 naNw')}
  {lin(184,1147,48,2,'#9aa3ab')}
  {text(238,1128,10,'u','naNw')}
  {lin(252,1147,48,2,'#9aa3ab')}
  {text(356,1128,8,'3','naNw')}
  {text(378,1128,10,'o','naNw')}
  {lin(392,1147,48,2,'#9aa3ab')}
  {text(447,1128,10,'u','naNw')}
  {lin(460,1147,48,2,'#9aa3ab')}
  {text(148,1153,8,'2','naNw')}
  {text(170,1153,10,'o','naNw')}
  {lin(184,1172,48,2,'#9aa3ab')}
  {text(239,1153,10,'u','naNw')}
  {lin(252,1172,48,2,'#9aa3ab')}
  {text(355,1153,8,'4','naNw')}
  {text(378,1153,10,'o','naNw')}
  {lin(392,1172,48,2,'#9aa3ab')}
  {text(446,1153,10,'u','naNw')}
  {lin(459,1172,48,2,'#9aa3ab')}
  {title('3',601,1129,390,'Schreiben Sie kurze Gespräche mit','naGB naNw')}
  {text(639,1148,132,'den Wörtern aus','naBold naNw')}
  {stext(809,1148,12,'2',{color:'#2a4f9e'},'naBold naNw')}
  {text(828,1148,130,'und sprechen','naBold naNw')}
  {text(639,1173,220,'Sie auch vor dem Spiegel.','naBold naNw')}
  {title('2',109,1231,400,'Ergänzen Sie „o“ oder „u“.','naGB')}
  {text(148,1273,16,'Pr','naNw')}
  {text(204,1273,80,'blem – H','naNw')}
  {text(323,1273,62,'tel – M','naNw')}
  {text(424,1273,16,'se','naNw')}
  {text(481,1273,34,'m –','naNw')}
  {text(149,1298,12,'M','naNw')}
  {text(204,1298,60,'sik – D','naNw')}
  {text(302,1298,105,'sche – Telef','naNw')}
  {text(431,1298,75,'n – Aufz','naNw')}
  {text(542,1298,28,'g –','naNw')}
  {text(149,1323,12,'M','naNw')}
  {text(204,1323,46,'nat –','naNw')}
  {text(294,1323,73,'hr – Kin','naNw')}
  {text(428,1323,55,'– Handt','naNw')}
  {text(521,1323,32,'ch','naNw')}
  {text(813,1389,169,'dreiunddreißig | 33','naFooter')}
  {field('p33-a2_1',166,1271,39,'Lücke 1')}
  {field('p33-a2_2',283,1271,38,'Lücke 2')}
  {field('p33-a2_3',362,1271,26,'Lücke 3')}
  {field('p33-a2_4',441,1271,38,'Lücke 4')}
  {field('p33-a2_5',164,1296,37,'Lücke 5')}
  {field('p33-a2_6',263,1296,36,'Lücke 6')}
  {field('p33-a2_7',405,1296,24,'Lücke 7')}
  {field('p33-a2_8',505,1296,34,'Lücke 8')}
  {field('p33-a2_9',166,1321,36,'Lücke 9')}
  {field('p33-a2_10',254,1321,36,'Lücke 10')}
  {field('p33-a2_11',367,1321,37,'Lücke 11')}
  {field('p33-a2_12',482,1321,36,'Lücke 12')}
  {check('33-1',166,1356,{'p33-a2_1':'o','p33-a2_2':'o','p33-a2_3':'u','p33-a2_4':'u','p33-a2_5':'u','p33-a2_6':'u','p33-a2_7':'o','p33-a2_8':'u','p33-a2_9':'o','p33-a2_10':'u','p33-a2_11':'o','p33-a2_12':'u'})}
 </>}
 {page==='34'&&<>
  {stext(128,76,130,'TEST',{fontSize:30,letterSpacing:5,color:'#6e6e68',fontFamily:'Georgia'},'naNw')}
  {lin(206,108,778,4,'#c2dc46')}
  {title('1',120,148,400,'Im Hotel. Ergänzen Sie.','naGB naNw')}
  <div className="naSide" style={{left:88,top:196,color:'#94a3c0'}}>WÖRTER</div>
  {text(170,196,760,'Das Hotel ist 150 Jahre alt. Es hat 45 Zimmer auf vier Stockwerken, aber leider keinen','naNw')}
  {text(169,221,21,'(a)','naNw')}
  {lin(197,240,48,2,'#9aa3ab')}
  {text(193,219,60,'Aufzug','naHand naD19 naNw')}
  {text(252,221,181,'(FUGAZU) und keine','naNw')}
  {text(456,221,22,'(b)','naNw')}
  {text(699,221,278,'(ALGALENMIAK). Im Erdgeschoss','naNw')}
  {text(169,247,258,'stehen zwei Computer mit (c)','naNw')}
  {text(738,247,237,'(DEBTGVIRENTURNENIN).','naNw')}
  {text(167,273,246,'Jedes Zimmer hat ein Radio','naNw')}
  {text(428,273,118,'und einen (d)','naNw')}
  {text(759,273,127,'(RENFEHESR).','naNw')}
  {text(169,299,248,'In jedem Bad gibt es eine (e)','naNw')}
  {text(611,299,236,'(SHEDUC) und einen Föhn.','naNw')}
  {stext(895,300,92,'_/4 Punkte',{fontStyle:'italic',fontSize:15,color:'#7a7a72',fontFamily:'Georgia'},'naNw')}
  {title('2',120,361,400,'Ergänzen Sie.','naGB naNw')}
  <div className="naSide" style={{left:88,top:407,color:'#94a3c0'}}>WÖRTER</div>
  {text(168,402,334,'a Das Radio funktioniert nicht, es ist','naNw')}
  {text(508,402,10,'k','naNw')}
  {stext(523,408,85,'aputt',{fontSize:13.5,lineHeight:'14px'},'naHand naD19 naNw')}
  {stext(580,408,4,'.',{fontSize:13.5,lineHeight:'14px'},'naHand naD19 naNw')}
  {text(167,428,350,'b Er kommt immer zu spät, er ist nie p','naNw')}
  {text(666,428,4,'.','naNw')}
  {text(168,455,351,'c Der Deutschkurs ist nicht langweilig,','naNw')}
  {text(527,455,55,'er ist l','naNw')}
  {text(690,455,4,'.','naNw')}
  {text(168,480,294,'d Heute ist es nicht heiß, es ist k','naNw')}
  {text(524,480,2,'.','naNw')}
  {stext(895,481,92,'_/3 Punkte',{fontStyle:'italic',fontSize:15,color:'#7a7a72',fontFamily:'Georgia'},'naNw')}
  {title('3',120,538,430,'Ergänzen Sie für, vor, nach und in.','naGB naNw')}
  <div className="naSide" style={{left:88,top:584,color:'#94a3c0'}}>STRUKTUREN</div>
  {stext(166,592,16,'■',{color:'#1a3f9e'},'naNw')}
  {text(191,592,355,'Wann bist du mit der Ausbildung fertig?','naNw')}
  {stext(601,592,16,'■',{color:'#1a3f9e'},'naNw')}
  {text(626,592,314,'Warst du schon einmal in England?','naNw')}
  {stext(166,618,16,'▲',{color:'#2eb75b'},'naNw')}
  {lin(183,637,24,2,'#9aa3ab')}
  {text(181,616,34,'In','naHand naD19 naNw')}
  {text(208,618,130,'(a) einem Jahr.','naNw')}
  {stext(601,618,16,'▲',{color:'#2eb75b'},'naNw')}
  {text(625,618,23,'Ja,','naNw')}
  {text(739,618,139,'(d) fünf Jahren.','naNw')}
  {stext(166,645,16,'■',{color:'#1a3f9e'},'naNw')}
  {text(191,645,170,'Und was machst du','naNw')}
  {text(452,645,56,'(b) der','naNw')}
  {stext(601,645,16,'■',{color:'#1a3f9e'},'naNw')}
  {text(626,645,210,'Wie hat es dir gefallen?','naNw')}
  {text(190,672,107,'Ausbildung?','naNw')}
  {stext(601,672,16,'▲',{color:'#2eb75b'},'naNw')}
  {text(627,672,113,'Es war super.','naNw')}
  {text(831,672,74,'(e) sechs','naNw')}
  {stext(166,698,16,'▲',{color:'#2eb75b'},'naNw')}
  {text(191,698,72,'Ich gehe','naNw')}
  {text(354,698,168,'(c) zwei Jahre nach','naNw')}
  {text(626,698,282,'Monaten habe ich wirklich sehr','naNw')}
  {text(191,725,69,'London.','naNw')}
  {text(625,725,219,'gut Englisch gesprochen.','naNw')}
  {stext(895,725,92,'_/4 Punkte',{fontStyle:'italic',fontSize:15,color:'#7a7a72',fontFamily:'Georgia'},'naNw')}
  {title('4',120,771,400,'Was ist richtig? Kreuzen Sie an.','naGB naNw')}
  <div className="naSide" style={{left:88,top:820,color:'#94a3c0'}}>STRUKTUREN</div>
  {text(166,816,8,'a','naNw')}
  {text(191,816,190,'Die U-Bahn kommt in','naNw')}
  {text(430,816,46,'einer','naNw')}
  {text(520,816,49,'einen','naNw')}
  {text(613,816,140,'einem Minute.','naNw')}
  {text(166,840,8,'b','naNw')}
  {text(191,840,55,'Nach','naNw')}
  {text(276,840,27,'das','naNw')}
  {text(348,840,28,'der','naNw')}
  {text(421,840,163,'dem Deutschkurs','naNw')}
  {text(591,840,231,'fährt Isabella in die Stadt.','naNw')}
  {text(166,868,8,'c','naNw')}
  {text(189,868,115,'Yakub ist vor','naNw')}
  {text(347,868,46,'einer','naNw')}
  {text(436,868,49,'einen','naNw')}
  {text(529,868,54,'einem','naNw')}
  {text(600,868,87,'Jahr nach','naNw')}
  {text(695,868,214,'Deutschland gekommen.','naNw')}
  {text(166,893,341,'d Christiane braucht das Auto nur für','naNw')}
  {text(556,893,27,'ein','naNw')}
  {text(627,893,49,'einen','naNw')}
  {text(719,893,88,'eine Tag.','naNw')}
  {stext(895,894,92,'_/3 Punkte',{fontStyle:'italic',fontSize:15,color:'#7a7a72',fontFamily:'Georgia'},'naNw')}
  {title('5',120,952,400,'Ergänzen Sie das Gespräch.','naGB naNw')}
  <div className="naSide" style={{left:88,top:1002,color:'#94a3c0'}}>KOMMUNIKATION</div>
  {stext(171,994,430,'Das ist | Was kann | Es gibt | Ich kümmere | Das tut',{color:'#5f5f8c'},'naBold naNw')}
  {stext(166,1036,16,'■',{color:'#1a3f9e'},'naNw')}
  {text(188,1036,207,'Können Sie mir helfen?','naNw')}
  {stext(166,1062,16,'▲',{color:'#2eb75b'},'naNw')}
  {text(210,1062,45,'Ja gern.','naNw')}
  {text(528,1062,163,'(1) ich für Sie tun?','naNw')}
  {stext(166,1088,16,'■',{color:'#1a3f9e'},'naNw')}
  {text(452,1088,256,'(2) keine Seife in der Dusche.','naNw')}
  {stext(166,1113,16,'▲',{color:'#2eb75b'},'naNw')}
  {text(188,1113,99,'Wie dumm!','naNw')}
  {text(559,1113,103,'(3) mir leid.','naNw')}
  {text(452,1140,198,'(4) mich sofort darum.','naNw')}
  {stext(166,1165,16,'■',{color:'#1a3f9e'},'naNw')}
  {text(451,1165,232,'(5) sehr nett. Vielen Dank!','naNw')}
  {stext(895,1166,92,'_/5 Punkte',{fontStyle:'italic',fontSize:15,color:'#7a7a72',fontFamily:'Georgia'},'naNw')}
  {art('score',140,1205,560,143)}
  {text(444,1365,223,'www.hueber.de/menschen/lernen','naUrl')}
  {art('modul-tab',10,1382,74,38)}
  {text(98,1386,172,'34 | vierunddreißig','naFooter')}
  {field('p34-1b',484,217,193,'1 (b)')}
  {field('p34-1c',433,242,299,'1 (c)')}
  {field('p34-1d',544,269,209,'1 (d)')}
  {field('p34-1e',423,294,182,'1 (e)')}
  {field('p34-2b',520,425,140,'2 b: p...')}
  {field('p34-2c',584,451,100,'2 c: l...')}
  {field('p34-2d',464,476,56,'2 d: k...')}
  {field('p34-3b',380,640,66,'3 (b)')}
  {field('p34-3c',284,693,66,'3 (c)')}
  {field('p34-3d',668,617,66,'3 (d)')}
  {field('p34-3e',752,671,73,'3 (e)')}
  {dot('r4a','einer',403,821,'4a einer')}
  {dot('r4a','einen',493,821,'4a einen')}
  {dot('r4a','einem',586,821,'4a einem')}
  {dot('r4b','das',251,845,'4b das')}
  {dot('r4b','der',322,845,'4b der')}
  {dot('r4b','dem',394,845,'4b dem')}
  {dot('r4c','einer',320,872,'4c einer')}
  {dot('r4c','einen',409,872,'4c einen')}
  {dot('r4c','einem',502,872,'4c einem')}
  {dot('r4d','ein',529,898,'4d ein')}
  {dot('r4d','einen',600,898,'4d einen')}
  {dot('r4d','eine',692,898,'4d eine')}
  {field('p34-5-1',263,1057,259,'5 (1)')}
  {field('p34-5-2',190,1083,256,'5 (2)')}
  {field('p34-5-3',295,1109,258,'5 (3)')}
  {field('p34-5-4',190,1135,256,'5 (4)')}
  {field('p34-5-5',190,1160,255,'5 (5)')}
  {check('34-1',1000,148,{'p34-1b':'Klimaanlage','p34-1c':'Internetverbindung','p34-1d':'Fernseher','p34-1e':'Dusche'})}
  {check('34-2',1000,361,{'p34-2b':'ünktlich|pünktlich','p34-2c':'ustig|lustig','p34-2d':'alt|kalt'})}
  {check('34-3',1000,538,{'p34-3b':'nach','p34-3c':'für','p34-3d':'vor','p34-3e':'nach|Nach'})}
  {check('34-4',1000,771,{'r4a':'einer','r4b':'dem','r4c':'einem','r4d':'einen'})}
  {check('34-5',1000,952,{'p34-5-1':'Was kann','p34-5-2':'Es gibt','p34-5-3':'Das tut','p34-5-4':'Ich kümmere','p34-5-5':'Das ist'})}
 </>}
 {page==='35'&&<>
  {art('0',934,36,133,1358)}
  {art('3',372,1240,165,77)}
  {art('tv',576,1246,224,78)}
  {lin(1063,0,8,1104,'#aeb7b2')}
  <div style={{position:'absolute',left:395,top:112,width:480,height:3,background:'linear-gradient(90deg,#afd019,#d7e98c)'}}/>
  {lin(317,249,191,2,'#d9dae0')}
  {lin(677,250,196,2,'#d9dae0')}
  {lin(317,300,191,2,'#d9dae0')}
  {lin(676,301,197,2,'#d9dae0')}
  {lin(316,326,192,2,'#d9dae0')}
  {lin(317,352,191,2,'#d9dae0')}
  {lin(676,353,197,2,'#d9dae0')}
  {lin(317,377,191,2,'#d9dae0')}
  {lin(677,378,196,2,'#d9dae0')}
  {lin(317,403,191,2,'#d9dae0')}
  {lin(317,429,191,2,'#d9dae0')}
  {lin(677,443,196,2,'#d9dae0')}
  {lin(677,469,196,2,'#d9dae0')}
  {lin(317,480,191,2,'#d9dae0')}
  {lin(330,506,178,2,'#d9dae0')}
  {lin(676,520,197,2,'#d9dae0')}
  {lin(676,546,197,2,'#d9dae0')}
  {lin(316,558,192,2,'#d9dae0')}
  {lin(676,572,197,2,'#d9dae0')}
  {lin(316,584,192,2,'#d9dae0')}
  {lin(676,597,197,2,'#d9dae0')}
  {lin(317,648,191,2,'#d9dae0')}
  {lin(676,648,197,2,'#d9dae0')}
  {lin(316,674,192,2,'#d9dae0')}
  {lin(676,700,197,2,'#d9dae0')}
  {lin(316,725,192,2,'#d9dae0')}
  {lin(676,751,197,2,'#d9dae0')}
  {lin(316,777,192,2,'#d9dae0')}
  {lin(676,803,197,2,'#d9dae0')}
  {lin(316,828,192,2,'#d9dae0')}
  {lin(676,828,197,2,'#d9dae0')}
  {lin(316,880,192,2,'#d9dae0')}
  {lin(676,880,197,2,'#d9dae0')}
  {lin(675,906,198,2,'#d9dae0')}
  {lin(316,931,192,2,'#d9dae0')}
  {lin(676,931,197,2,'#d9dae0')}
  {lin(315,957,193,2,'#d9dae0')}
  {lin(675,957,198,2,'#d9dae0')}
  {lin(315,983,193,2,'#d9dae0')}
  {lin(675,984,198,2,'#d9dae0')}
  {lin(675,1009,198,2,'#d9dae0')}
  {lin(675,1034,198,2,'#d9dae0')}
  {lin(316,1047,192,2,'#d9dae0')}
  {lin(675,1061,198,2,'#d9dae0')}
  {lin(315,1072,193,2,'#d9dae0')}
  {lin(675,1086,198,2,'#d9dae0')}
  {lin(315,1124,193,2,'#d9dae0')}
  {lin(675,1138,198,2,'#d9dae0')}
  {lin(315,1176,193,2,'#d9dae0')}
  {lin(1068,1181,2,181,'#7a7a7a')}
  {lin(143,1196,274,6,'#cfaa3f')}
  {lin(143,1196,15,88,'#cfaa3f')}
  <div style={{position:'absolute',left:146,top:1232,writingMode:'vertical-rl',fontSize:9,fontWeight:700,color:'#8a3b2e',fontFamily:'Arial,sans-serif'}}>TIPP</div>
  {text(106,81,281,'LERNWORTSCHATZ','naHeadline naNw')}
  {title('1',99,157,700,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.','naGB')}
  {text(146,198,81,'Im Hotel','naBold naNw')}
  {text(531,198,145,'verschieben, hat','naNw')}
  {text(146,223,110,'Aufzug der,','naNw naUmlRow naF190')}{art('umlmark',249,231,10,9)}{text(256,223,12,'e','naNw naUmlRow')}
  {text(543,223,98,'verschoben','naNw')}
  {stext(156,251,133,'CH/A: Lift der, -e',{color:'#8e9094'},'naNw')}
  {text(532,251,97,'passen, hat','naNw')}
  {text(146,275,122,'Dusche die, -n','naNw')}
  {text(542,275,63,'gepasst','naNw')}
  {text(146,301,136,'Fernseher der, -','naNw')}
  {text(544,301,105,'Passt es dir/','naNw')}
  {text(146,326,134,'Föhn der, -e / -s','naNw')}
  {text(544,326,61,'Ihnen?','naNw')}
  {text(146,352,85,'Gast der,','naNw naUmlRow')}{art('umlmark',224,360,10,9)}{text(232,352,12,'e','naNw naUmlRow')}
  {text(532,352,85,'pünktlich','naNw')}
  {text(146,378,135,'Handtuch das,','naNw naUmlRow')}{art('umlmark',276,386,10,9)}{text(284,378,20,'er','naNw naUmlRow')}
  {text(531,393,229,'Weitere wichtige Wörter','naSansB naNw')}
  {text(146,404,142,'Heizung die, -en','naNw')}
  {text(532,418,95,'Angst die,','naNw naUmlRow')}{art('umlmark',623,426,10,9)}{text(630,418,12,'e','naNw naUmlRow')}
  {text(146,432,109,'Klimaanlage','naNw')}
  {text(157,458,54,'die, -n','naNw')}
  {text(543,444,107,'Angst haben','naNw')}
  {text(533,470,166,'Kurs der, -e (Tanz-/','naNw')}
  {text(145,483,172,'Verbindung die, -en','naNw')}
  {text(157,510,140,'die Internetver-','naNw')}
  {text(543,495,123,'Spanischkurs)','naNw')}
  {text(532,521,84,'Leben das','naNw')}
  {text(156,536,74,'bindung','naNw')}
  {text(145,560,113,'Wecker der, -','naNw')}
  {text(531,547,136,'Sitzung die, -en','naNw')}
  {text(531,573,121,'Stunde die, -n','naNw')}
  {text(145,597,120,'Beschwerden','naBold naNw')}
  {text(542,597,80,'die halbe','naNw')}
  {text(146,623,129,'Bescheid sagen','naNw')}
  {text(542,623,60,'Stunde','naNw')}
  {text(146,648,95,'Hilfe rufen','naNw')}
  {text(531,648,145,'aus-machen, hat','naNw')}
  {text(144,674,110,'bringen, hat','naNw')}
  {text(542,674,102,'ausgemacht','naNw')}
  {text(155,700,76,'gebracht','naNw')}
  {text(531,700,170,'kennen-lernen, hat','naNw')}
  {text(145,726,164,'funktionieren, hat','naNw')}
  {text(542,726,129,'kennengelernt','naNw')}
  {text(156,752,110,'funktioniert','naNw')}
  {text(531,752,149,'mit-nehmen, hat','naNw')}
  {text(145,778,126,'kümmern, hat','naNw')}
  {text(542,778,127,'mitgenommen','naNw')}
  {text(155,803,102,'gekümmert','naNw')}
  {text(531,803,124,'tun, hat getan','naNw')}
  {text(145,829,133,'reparieren, hat','naNw')}
  {text(530,829,103,'warten, hat','naNw')}
  {text(156,856,79,'repariert','naNw')}
  {text(541,856,77,'gewartet','naNw')}
  {text(144,880,271,'schicken (einen Techniker/...),','naNw')}
  {text(530,880,55,'dumm','naNw')}
  {text(155,907,115,'hat geschickt','naNw')}
  {text(542,907,99,'Wie dumm!','naNw')}
  {text(144,932,57,'kaputt','naNw')}
  {text(530,932,33,'kalt','naNw')}
  {text(144,958,50,'sofort','naNw')}
  {text(530,958,48,'lustig','naNw')}
  {text(530,985,65,'seltsam','naNw')}
  {text(143,997,76,'Termine','naBold naNw')}
  {text(530,1011,52,'sicher','naNw')}
  {text(145,1022,67,'Lust die','naNw')}
  {text(530,1037,53,'nichts','naNw')}
  {text(156,1048,94,'Lust haben','naNw')}
  {text(530,1062,49,'selbst','naNw')}
  {text(144,1074,158,'Termine ab-sagen,','naNw')}
  {text(530,1088,126,'Sehr geehrte /','naNw')}
  {text(155,1100,108,'hat abgesagt','naNw')}
  {text(541,1114,120,'Sehr geehrter','naNw')}
  {text(155,1125,147,'vereinbaren, hat','naNw')}
  {text(530,1139,151,'Mit freundlichen','naNw')}
  {text(155,1151,93,'vereinbart','naNw')}
  {text(542,1165,64,'Grüßen','naNw')}
  {stext(541,1193,182,'CH: Freundliche Grüsse',{color:'#8e9094'},'naEvalC40 naNw')}
  {text(176,1212,192,'Schreiben Sie Zettel und','naNw')}
  {text(176,1237,165,'hängen Sie die Zettel','naNw')}
  {text(176,1259,162,'in der Wohnung auf.','naNw')}
  {title('2',99,1318,700,'Welche Wörter möchten Sie noch lernen? Notieren Sie.','naGB')}
  {art('modul-tab',988,1389,83,25)}
  {text(804,1388,140,'fünfunddreißig','naFooter')}{text(943,1388,8,'|','naFooter')}{text(964,1388,22,'35','naFooter')}
 </>}
 {page==='36'&&<>
  {art('0',142,46,837,57)}
  {art('grid',150,228,680,50)}
  {kb(85,181,'KB 3')}
  {title('1',121,178,640,'Markieren Sie die Verben und ordnen Sie zu.','naGB')}
  <div className="naSide" style={{left:92,top:230,whiteSpace:'nowrap'}}>WÖRTER</div>
  {art('6',515,1152,207,205)}
  {lin(677,316,114,2,'#7a7a7a')}
  {lin(248,393,138,2,'#7a7a7a')}
  {lin(621,393,200,2,'#c5c4c8')}
  {lin(614,587,142,2,'#b9b7c8')}
  {lin(579,613,233,2,'#b2b1b6')}
  {lin(341,665,233,2,'#c2c1ce')}
  {lin(187,846,102,2,'#7a7a7a')}
  {lin(334,872,102,2,'#7a7a7a')}
  {text(162,292,135,'a eine Anzeige','naNw')}
  {text(295,294,60,'lesen','naHand naD19 naNw')}
  {lin(295,315,52,2,'#c2c3c6')}
  {text(598,292,72,'d Angst','naNw')}
  {text(162,317,166,'b eine Ausbildung','naNw')}
  {text(598,317,139,'e eine Prüfung','naNw')}
  {text(162,343,7,'c','naNw')}
  {text(186,343,236,'sich an einer Sprachschule','naNw')}
  {text(598,343,7,'f','naNw')}
  {text(621,343,168,'einen Studienplatz','naNw')}
  {kb(85,440,'KB 3')}
  {title('2',121,437,500,'Ordnen Sie zu.','naGB')}
  <div className="naSide" style={{left:92,top:478,whiteSpace:'nowrap'}}>WÖRTER</div>
  {rect(159,473,112,33,'#fcf7dd')}
  {rect(279,473,117,33,'#fcf7dd')}
  {rect(399,473,87,33,'#fcf7dd')}
  {rect(494,473,147,33,'#fcf7dd')}
  {rect(649,473,82,33,'#fcf7dd')}
  {stext(167,476,100,'Ausbildung',{color:'#3f6491'},'naBold naNw')}
  {stext(272,476,10,'|',{color:'#3f6491'},'naNw')}
  {stext(287,476,105,'Studienplatz',{color:'#3f6491'},'naBold naNw')}
  {stext(395,476,10,'|',{color:'#3f6491'},'naNw')}
  {stext(407,476,75,'Prüfung',{color:'#3f6491'},'naBold naNw')}
  {stext(487,476,10,'|',{color:'#3f6491'},'naNw')}
  {stext(502,476,135,'Sprachenschule',{color:'#3f6491'},'naBold naNw')}
  {stext(642,476,10,'|',{color:'#3f6491'},'naNw')}
  {stext(657,476,70,'Anzeige',{color:'#3f6491'},'naBold naNw')}
  {text(163,511,337,'a Jan ist glücklich. Er hat endlich die','naNw')}
  {text(762,511,84,'geschafft.','naNw')}
  {text(652,514,100,'Prüfung','naHand naD19 naNw')}
  {text(162,537,368,'b Mike möchte Deutsch lernen. Er hat in','naNw')}
  {text(537,537,144,'der Zeitung eine','naNw')}
  {text(186,563,332,'gelesen. Jetzt möchte er sich an einer','naNw')}
  {text(762,563,92,'anmelden.','naNw')}
  {text(163,589,410,'c Morgen fängt Jos Studium an. Sie hat einen','naNw')}
  {text(818,589,117,'an der Uni in','naNw')}
  {text(188,615,151,'Basel bekommen.','naNw')}
  {text(163,641,171,'d Jule möchte eine','naNw')}
  {text(580,641,191,'als Friseurin machen.','naNw')}
  {kb(85,711,'KB 4')}
  {title('3',121,708,500,'Ergänzen Sie mit oder ohne.','naGB')}
  <div className="naSide" style={{left:92,top:776,whiteSpace:'nowrap'}}>STRUKTUREN</div>
  {text(164,748,9,'a','naNw naS19')}
  {text(187,748,250,'Cherry geht nur','naNw naS19')}
  {art('mit',324,748,44,22)}
  {text(363,748,381,'ihrer „Starbrille“ zur Aufnahmeprüfung.','naNw naS19')}
  {text(164,773,9,'b','naNw naS19')}
  {text(295,773,585,'Aufnahmeprüfung kann sie nicht an der Pop-Akademie studieren.','naNw naS19')}
  {text(164,800,9,'c','naNw naS19')}
  {text(187,800,293,'Sie möchten ein Popstar werden?','naNw naF188')}
  {text(596,800,341,'eine gute Ausbildung ist das schwierig.','naNw naS19')}
  {text(164,826,9,'d','naNw naS19')}
  {text(296,826,184,'einer Ausbildung hat','naNw naS19')}
  {text(488,828,34,'man','naHand naD19 naNw')}
  {text(530,826,159,'bessere Chancen.','naNw naS19')}
  {text(164,851,7,'e','naNw naS19')}
  {text(188,851,140,'Fabian geht nur','naNw naF182')}
  {text(443,852,332,'seiner Gitarre zur Aufnahmeprüfung.','naNw naS19')}
  {kb(85,918,'KB 4')}
  {title('4',121,915,600,'Was ist richtig? Kreuzen Sie an.','naGB')}
  <div className="naSide" style={{left:92,top:967,whiteSpace:'nowrap'}}>STRUKTUREN</div>
  {text(164,951,155,'a Ich arbeite mit','naNw')}
  <div style={{position:'absolute',left:338,top:952,width:16,height:16,border:'2px solid #c7bd8a',borderRadius:'50%'}}/>
  <div style={{position:'absolute',left:447,top:952,width:16,height:16,border:'2px solid #c7bd8a',borderRadius:'50%'}}/>
  {stext(446,947,20,'X',{color:'#335b98',fontSize:17},'naHand naNw')}
  {text(369,951,53,'meine','naNw')}
  {text(473,951,382,'meinem Mann in einem Büro zusammen.','naNw')}
  {text(163,976,69,'b Ohne','naNw')}
  {text(282,976,53,'einem','naNw')}
  {text(386,976,232,'einen Kaffee am Morgen','naNw')}
  {text(625,976,215,'kann ich nicht arbeiten.','naNw')}
  {text(164,1001,206,'c Ich frühstücke jeden','naNw')}
  {text(377,1001,102,'Morgen mit','naNw')}
  {text(530,1001,62,'meiner','naNw')}
  {text(642,1001,155,'meine Kollegin,','naNw')}
  {text(164,1027,68,'d Ohne','naNw')}
  {text(283,1027,71,'meinem','naNw')}
  {text(404,1027,203,'mein Handy gehe ich','naNw')}
  {text(615,1027,177,'nicht aus dem Haus.','naNw')}
  {text(188,1055,234,'Das nehme ich immer mit.','naNw')}
  {kb(85,1125,'KB 5')}
  {title('5',121,1122,500,'Ergänzen Sie e oder i.','naGB')}
  <div className="naSide" style={{left:84,top:1150,whiteSpace:'nowrap'}}>STRUKTUREN</div>
  <div className="naSide" style={{left:97,top:1150,whiteSpace:'nowrap'}}>ENTDECKEN</div>
  {text(164,1162,26,'ich','naNw')}
  {text(262,1162,10,'w','naNw')}
  {text(279,1164,12,'e','naHand naD19 naNw')}
  {lin(271,1183,25,1,'#ccd2d8')}
  {text(291,1162,30,'rde','naNw')}
  {text(164,1188,21,'du','naNw')}
  {text(164,1215,50,'er/sie','naNw')}
  {lin(361,1164,2,165,'#e3dfc0')}
  {text(378,1224,82,'Sängerin','naNw')}
  {text(164,1253,37,'wir','naNw')}
  {text(165,1279,26,'ihr','naNw')}
  {text(164,1305,58,'sie/Sie','naNw')}
  {art('modul-tab',0,1394,86,24)}
  {text(97,1398,18,'36','naFooter naNw')}{text(128,1398,8,'|','naFooter naNw')}{text(148,1398,148,'sechsunddreißig','naFooter naNw')}
  {text(262,1188,12,'w','naNw')}
  {lin(277,1209,17,1.2,'#9aa0a6')}
  {text(296,1188,27,'rst','naNw')}
  {text(262,1215,12,'w','naNw')}
  {lin(277,1236,17,1.2,'#9aa0a6')}
  {text(296,1215,18,'rd','naNw')}
  {text(262,1253,12,'w','naNw')}
  {lin(277,1274,17,1.2,'#9aa0a6')}
  {text(296,1253,36,'rden','naNw')}
  {text(262,1279,12,'w','naNw')}
  {lin(277,1300,17,1.2,'#9aa0a6')}
  {text(296,1279,36,'rdet','naNw')}
  {text(262,1305,12,'w','naNw')}
  {lin(277,1326,17,1.2,'#9aa0a6')}
  {text(296,1305,36,'rden','naNw')}
  {field('p36-1b',335,316,198,'1 b')}
  {field('p36-1c',171,363,213,'1 c')}
  {field('p36-1d',675,290,215,'1 d')}
  {field('p36-1e',748,316,206,'1 e')}
  {field('p36-1f',623,363,198,'1 f')}
  {field('p36-2b0',690,536,224,'2 b')}
  {field('p36-2b1',530,561,227,'2 b')}
  {field('p36-2c2',578,589,227,'2 c')}
  {field('p36-2d3',346,639,227,'2 d')}
  {field('p36-3b',186,769,105,'3 b')}
  {field('p36-3c',486,794,105,'3 c')}
  {field('p36-3d',186,820,105,'3 d')}
  {field('p36-3e',333,846,104,'3 e')}
  {dot('4b','einem',255,980,'4 b einem')}
  {dot('4b','einen',359,980,'4 b einen')}
  {dot('4c','meiner',503,1006,'4 c meiner')}
  {dot('4c','meine',615,1006,'4 c meine')}
  {dot('4d','meinem',256,1032,'4 d meinem')}
  {dot('4d','mein',377,1032,'4 d mein')}
  {field('p36-50',279,1182,15,'5 du')}
  {field('p36-51',279,1209,15,'5 er/sie')}
  {field('p36-52',279,1245,15,'5 wir')}
  {field('p36-53',279,1273,15,'5 ihr')}
  {field('p36-54',279,1297,15,'5 sie/Sie')}
  {check('36-1',171,404,{'p36-1b':'abschließen','p36-1c':'anmelden','p36-1d':'haben','p36-1e':'schaffen','p36-1f':'bekommen'})}
  {check('36-2',346,680,{'p36-2b0':'Anzeige','p36-2b1':'Sprachenschule','p36-2c2':'Studienplatz','p36-2d3':'Ausbildung'})}
  {check('36-3',1000,865,{'p36-3b':'Ohne','p36-3c':'Ohne','p36-3d':'Mit','p36-3e':'mit'})}
  {check('36-4',1000,1052,{'4b':'einen','4c':'meiner','4d':'mein'})}
  {check('36-5',279,1338,{'p36-50':'i','p36-51':'i','p36-52':'e','p36-53':'e','p36-54':'e'})}
 </>}
 {page==='37'&&<>
  {art('0',349,35,719,85)}
  {art('2',700,204,286,187)}
  {lin(513,251,116,2,'#c0bcce')}
  {lin(389,302,103,2,'#bbbcbe')}
  {lin(244,378,116,2,'#c1c2c4')}
  {lin(163,535,780,2,'#c1c2c4')}
  {lin(163,586,780,2,'#c1c2c4')}
  {lin(163,637,780,2,'#c1c2c4')}
  {lin(163,689,780,2,'#c1c2c4')}
  {lin(163,741,780,2,'#c1c2c4')}
  {text(945,516,8,'.','naNw')}
  {text(945,567,8,'.','naNw')}
  {text(945,618,8,'.','naNw')}
  {text(945,670,8,'.','naNw')}
  {text(945,722,8,'.','naNw')}
  {lin(182,1280,168,2,'#b9bcc1')}
  {text(101,83,240,'BASISTRAINING','naHeadline naNw')}
  {kb(78,161,'KB 5')}
  {title('6',130,160,760,'Urlaubswünsche. Ergänzen Sie wollen in der richtigen Form.','naGB')}
  <div className="naSide" style={{left:69,top:203,whiteSpace:'nowrap'}}>STRUKTUREN</div>
  {text(140,199,66,'a Also ich','naNw')}
  {text(240,197,32,'will','naHand naD19 naNw')}
  {text(282,199,280,'dieses Jahr zu Hause bleiben!','naNw')}
  {text(140,225,375,'b Aber meine Freunde Theresa und Boris','naNw')}
  {text(648,225,22,'im','naNw')}
  {text(165,251,271,'Urlaub nach Schweden fahren.','naNw')}
  {text(140,278,245,'c Meine Freundin Beatrice','naNw')}
  {text(498,278,177,'nach Italien fahren.','naNw')}
  {text(140,303,190,'d Aber nächstes Jahr','naNw')}
  {text(469,303,167,'wir alle zusammen','naNw')}
  {text(164,329,197,'nach Tunesien fliegen.','naNw')}
  {text(140,354,97,'e Und was','naNw')}
  {text(365,354,200,'du im Urlaub machen?','naNw')}
  {kb(78,429,'KB 6')}
  {title('7',130,420,760,'Schreiben Sie Sätze.','naGB')}
  <div className="naSide" style={{left:66,top:461,whiteSpace:'nowrap'}}>STRUKTUREN</div>
  {text(140,462,9,'a','naSmall naNw')}
  {text(160,457,300,'Cherry will unbedingt Sängerin werden.','naHand naD19 naNw')}
  {text(164,486,446,'(unbedingt / Cherry / Sängerin / werden / wollen)','naNw')}
  {text(140,508,9,'b','naNw')}
  {text(164,538,467,'(auf keinen Fall / Sara und Felix / wollen / heiraten)','naNw')}
  {text(140,565,34,'c','naEvalC40 naNw')}
  {text(164,590,563,'(meine Ausbildung / Nächstes Jahr / abschließen / ich / wollen)','naNw')}
  {text(140,611,10,'d','naNw')}
  {text(164,642,570,'(wollen / unbedingt / Wir / schaffen / die Führerscheinprüfung)','naNw')}
  {text(140,668,7,'e','naSmall naNw')}
  {text(164,693,590,'(können / wir / Dann / mit dem Motorrad / reisen / durch Europa)','naNw')}
  {text(140,714,7,'f','naNw')}
  {text(164,744,451,'(Jan / vielleicht / werden / Liedermacher / wollen)','naNw')}
  {kb(78,819,'KB 6')}
  {title('8',130,806,760,'Ergänzen Sie die Wörter.','naGB')}
  <div className="naSide" style={{left:56,top:863,whiteSpace:'nowrap'}}>WÖRTER</div>
  {art('ausbildung',402,850,140,59)}
  {text(140,848,254,'Im Sommer hat Sofia ihre (a)','naNw naS19')}
  {text(483,848,400,'(BLUGASIDNU) als Friseurin abgeschlossen.','naNw naF180')}
  {text(140,874,655,'Sie hatte große Angst vor der Prüfung. Aber zum Glück hat sie die Prüfung','naNw naS19')}
  {text(140,897,21,'(b)','naNw naS19')}
  {text(394,897,383,'(SCHEFGATF). Jetzt möchte sie endlich Geld','naNw naS19')}
  {text(140,925,20,'(c)','naNw naS19')}
  {text(393,925,443,'(DERENIVEN). Dann möchte sie mit ihrem Freund','naNw naS19')}
  {text(138,951,128,'Johnny ein (d)','naNw naS19')}
  {text(498,951,279,'(RORTOMDA) kaufen und durch','naNw naS19')}
  {text(140,977,21,'(e)','naNw naS19')}
  {text(393,977,438,'(PORUEA) fahren. Zuerst macht sie aber noch den','naNw naS19')}
  {text(140,1002,19,'(f)','naNw naS19')}
  {text(391,1002,449,'(RENFEHÜRSHIC). Sie möchten durch viele Länder','naNw naS19')}
  {text(140,1028,21,'(g)','naNw naS19')}
  {text(393,1028,324,'(SINERE), die Welt und andere junge','naNw naS19')}
  {text(140,1054,22,'(h)','naNw naS19')}
  {text(395,1054,460,'(UTELE) kennenlernen. In ein paar Jahren möchten','naNw naS19')}
  {text(137,1080,158,'sie und Johnny (i)','naNw naS19')}
  {text(527,1080,277,'(RITAHENE) und Kinder haben.','naNw')}
  {kb(78,1149,'KB 6')}
  {title('9',130,1140,580,'Was sind Ihre Wünsche? Schreiben Sie 4–5 Sätze wie in ','naGB naNw')}
  {stext(702,1140,28,'8.',{color:'#3f6491',fontWeight:700},'naTitle naNw')}
  {art('partner',30,1168,72,34)}
  {text(140,1170,412,'Ihre Partnerin / Ihr Partner ergänzt die Wörter.','naNw')}
  {text(178,1240,220,'Ich möchte gern nach China','naHand naD19 naNw')}
  {text(350,1258,115,'. (SIERNE)','naHand naD19 naNw')}
  {art('modul-tab',985,1391,87,24)}
  {text(786,1394,155,'siebenunddreißig','naFooter naNw')}{text(940,1394,8,'|','naFooter naNw')}{text(961,1394,22,'37','naFooter naNw')}
  {field('p37-6b',515,226,125,'6 b')}
  {field('p37-6c',390,279,102,'6 c')}
  {field('p37-6d',337,303,125,'6 d')}
  {field('p37-6e',243,355,115,'6 e')}
  {field('p37-8b',168,895,221,'8 b')}
  {field('p37-8c',166,921,221,'8 c')}
  {field('p37-8d',272,947,221,'8 d')}
  {field('p37-8e',167,972,220,'8 e')}
  {field('p37-8f',165,998,221,'8 f')}
  {field('p37-8g',167,1024,221,'8 g')}
  {field('p37-8h',169,1050,221,'8 h')}
  {field('p37-8i',303,1077,221,'8 i')}
  {check('37-1',1000,165,{'p37-6b':'wollen','p37-6c':'will','p37-6d':'wollen','p37-6e':'willst'})}
  {check('37-2',1000,1116,{'p37-8b':'geschafft','p37-8c':'verdienen','p37-8d':'Motorrad','p37-8e':'Europa','p37-8f':'Führerschein','p37-8g':'reisen','p37-8h':'Leute','p37-8i':'heiraten'})}
 </>}
 {page==='38'&&<>
  {art('1',845,500,117,129)}
  {art('2',840,743,124,316)}
  {lin(374,114,607,3,'#8bc78c')}
  {lin(1065,1155,7,298,'#b7bdbf')}
  {text(126,85,240,'BASISTRAINING','naHeadline naNw')}
  {kb(82,174,'KB 6')}
  {title('10',130,161,760,'Lesen Sie die Texte.','naGB')}
  <div className="naSide" style={{left:97,top:200,whiteSpace:'nowrap'}}>LESEN</div>
  {text(125,201,14,'a','naNw')}
  {text(167,201,445,'Was möchten die Leute machen? Kreuzen Sie an.','naNw')}
  {stext(503,243,65,'SUSANNE',{fontStyle:'italic'},'naS14 naNw')}
  {stext(620,243,46,'GEORG',{fontStyle:'italic'},'naS14 naNw')}
  {stext(715,243,74,'MARIANNE',{fontStyle:'italic'},'naS14 naNw')}
  {text(166,266,218,'an die Universität gehen','naNw')}
  {text(166,293,134,'Urlaub machen','naNw')}
  {text(166,318,152,'im Ausland leben','naNw')}
  {stext(182,376,340,'50 PLUS – KRISE ODER CHANCE?',{color:'#a71114',fontWeight:700},'naNw')}
  {text(181,407,503,'Ist mit 50 Jahren der schönste Teil des Lebens zu Ende?','naSansB naNw')}
  {text(181,433,498,'Was sind die Wünsche und Pläne der über 50-Jährigen?','naSansB naNw')}
  {stext(181,485,254,'Susanne M., Hausfrau, 51 Jahre alt',{fontStyle:'italic'},'naNw')}
  {text(182,511,631,'Meine Wünsche? Ich habe nur einen Wunsch: Ich will ins Ausland gehen','naNw naBio naJ')}
  {text(181,537,633,'und noch einmal eine Fremdsprache lernen. Ich habe mit 20 Jahren geheira-','naNw naBio naJ')}
  {text(181,562,632,'tet und drei Kinder bekommen. Jetzt bin ich 51, die Kinder sind groß. In','naNw naBio naJ')}
  {text(181,588,633,'VITAL habe ich einen Artikel über „Granny-Au-Pairs“ gelesen und da habe','naNw naBio naJ')}
  {text(181,614,633,'ich gedacht: Das mache ich. Ein halbes Jahr in Rio de Janeiro in einer Fami-','naNw naBio naJ')}
  {text(181,640,633,'lie leben und eine neue Kultur kennenlernen. Super, oder? Und ein bisschen','naNw naBio naJ')}
  {text(181,666,633,'Geld verdiene ich dort auch: 300 € pro Monat und für das Zimmer und Essen','naNw naBio naJ')}
  {text(181,692,137,'zahle ich nichts.','naNw naBio')}
  {stext(181,749,269,'Georg K., Mechatroniker, 58 Jahre alt',{fontStyle:'italic'},'naNw')}
  {text(182,774,631,'Ich habe gerade den Motorradführerschein gemacht und nächstes Jahr will','naNw naBio naJ')}
  {text(181,800,633,'ich sechs Wochen mit meinem Sohn mit dem Motorrad durch Kanada fah-','naNw naBio naJ')}
  {text(181,826,633,'ren. Er hat letztes Jahr schon eine Reise durch die USA gemacht. Da hat er','naNw naBio naJ')}
  {text(180,852,563,'viel fotografiert und diese wunderbare Natur hat mir sehr gefallen.','naNw naBio')}
  {stext(180,909,264,'Marianne O., Studentin, 52 Jahre alt',{fontStyle:'italic'},'naNw')}
  {text(181,935,632,'Mit 50 Jahren ist man heute doch nicht alt! Ich habe 25 Jahre als Verkäuferin','naNw naBio naJ')}
  {text(180,960,632,'gearbeitet. Vor einem Jahr habe ich einen tollen Mann kennengelernt und','naNw naBio naJ')}
  {text(181,986,633,'mich total verliebt. Er hat gesagt: „Marianne, ich verdiene genug Geld für','naNw naBio naJ')}
  {text(181,1012,631,'uns zwei. Willst du wirklich dein ganzes Leben als Verkäuferin arbeiten?“','naNw naBio naJ')}
  {text(181,1038,632,'Da habe ich sofort gewusst: Das ist meine Chance! Ich kann endlich studie-','naNw naBio naJ')}
  {text(181,1064,631,'ren! Jetzt studiere ich Arabisch und Französisch. Das spreche ich schon gut.','naNw naBio naJ')}
  {text(180,1090,378,'Als Kind habe ich 10 Jahre in Marokko gelebt.','naNw naBio')}
  {text(134,1171,401,'b Lesen Sie noch einmal und kreuzen Sie an.','naNw')}
  {stext(829,1202,120,'richtig falsch',{fontStyle:'italic'},'naS14 naNw')}
  {text(166,1223,12,'1','naNw')}
  {text(188,1223,492,'Susanne hat schon mit 20 Jahren als Au-Pair gearbeitet.','naNw')}
  {text(166,1249,12,'2','naNw')}
  {text(188,1249,485,'Sie bezahlt 300 € für Zimmer und Essen in der Familie.','naNw')}
  {text(166,1275,12,'3','naNw')}
  {text(188,1275,427,'Georgs Sohn hat letztes Jahr eine Reise gemacht.','naNw')}
  {text(166,1301,12,'4','naNw')}
  {text(188,1301,556,'Marianne hat vor 25 Jahren einen tollen Mann kennengelernt.','naNw')}
  {text(166,1327,12,'5','naNw')}
  {text(188,1327,196,'Sie ist jetzt Studentin.','naNw')}
  {art('modul-tab',0,1394,85,23)}
  {text(97,1398,18,'38','naFooter naNw')}{text(128,1398,8,'|','naFooter naNw')}{text(148,1398,142,'achtunddreißig','naFooter naNw')}
  {dot('10a-susanne','uni',523,272,'susanne uni uni')}
  {dot('10a-susanne','urlaub',523,298,'susanne urlaub urlaub')}
  {dot('10a-susanne','ausland',523,323,'susanne ausland ausland')}
  {dot('10a-georg','uni',631,272,'georg uni uni')}
  {dot('10a-georg','urlaub',631,298,'georg urlaub urlaub')}
  {dot('10a-georg','ausland',631,323,'georg ausland ausland')}
  {dot('10a-marianne','uni',740,272,'marianne uni uni')}
  {dot('10a-marianne','urlaub',740,298,'marianne urlaub urlaub')}
  {dot('10a-marianne','ausland',740,323,'marianne ausland ausland')}
  {dot('10b-1','richtig',849,1230,'10b 1 richtig richtig')}
  {dot('10b-1','falsch',916,1230,'10b 1 falsch falsch')}
  {dot('10b-2','richtig',849,1255,'10b 2 richtig richtig')}
  {dot('10b-2','falsch',916,1255,'10b 2 falsch falsch')}
  {dot('10b-3','richtig',849,1282,'10b 3 richtig richtig')}
  {dot('10b-3','falsch',916,1282,'10b 3 falsch falsch')}
  {dot('10b-4','richtig',849,1307,'10b 4 richtig richtig')}
  {dot('10b-4','falsch',916,1307,'10b 4 falsch falsch')}
  {dot('10b-5','richtig',849,1333,'10b 5 richtig richtig')}
  {dot('10b-5','falsch',916,1333,'10b 5 falsch falsch')}
  {check('38-1',1000,270,{'10a-susanne':'ausland','10a-georg':'urlaub','10a-marianne':'uni'})}
  {check('38-2',1000,1367,{'10b-1':'falsch','10b-2':'falsch','10b-3':'richtig','10b-4':'falsch','10b-5':'richtig'})}
 </>}
  {page==='39'&&<>
  {art('0',895,41,177,82)}
  {text(102,82,347,'TRAINING: SCHREIBEN','naTrain39 naNw')}
  {lin(454,113,426,4,'#8acd8a')}
  <div className='naTitle naGB' style={{left:101,top:158}}><b>1</b></div>
  {text(145,160,730,'Lesen Sie Fabios Beitrag. Lesen Sie dann die Notizen und ergänzen Sie den','naT39 naNw')}
  {text(145,187,230,'Beitrag von Alina im Forum.','naT39 naNw')}
  {art('chrA-top',146,226,816,26)}
  {art('chrA-bot',506,518,456,24)}
  {art('chrA-scroll',920,252,42,262)}
  {lin(146,252,1,258,'#d5d9d0')}
  <div className='naBoxFade39' style={{left:146,top:516,width:360,height:14}}/>
  {art('7',155,246,217,38)}
  {text(158,279,537,'Ich gehe noch zur Schule, aber ich will unbedingt Musiker werden.','naForum naNw')}
  {text(791,286,110,'Fabio, 7. Juli','naRedD naNw')}
  {text(158,304,621,'Wie ist es bei euch? Was macht ihr? Gefällt es euch? Ist das euer Traumberuf?','naForum naNw')}
  {text(158,330,531,'Was wollt ihr unbedingt noch machen? Schickt mir eure Beiträge.','naForum naNw')}
  {art('1',145,383,361,151)}
  {art('chrB-topL',146,536,636,24)}
  {art('chrB-topR',886,536,76,24)}
  {art('chrB-scroll',920,556,42,146)}
  {lin(146,560,1,140,'#d5d9d0')}
  {text(786,545,110,'Alina, 7. Juli','naRedD naNw')}
  {text(152,560,30,'Ich','naForum naForumB naNw')}
  {field('p39-1a',182,549,713,'1 Ich')}
  {text(898,560,10,'.','naForum naNw')}
  {text(152,586,90,'Das ist','naForum naForumB naNw')}
  {field('p39-1b',215,579,255,'1 Das ist')}
  {text(470,586,10,'!','naForum naForumB naNw')}
  {art('2',483,590,32,28)}
  {text(530,586,360,'Ich mache jeden Tag das Gleiche. Ich','naForum naForumB naF175 naNw')}
  {field('p39-1c',160,607,280,'1 Ich Zeile 3')}
  {text(443,612,70,'und ich','naForum naForumB naNw')}
  {field('p39-1d',507,607,231,'1 und ich')}
  {text(749,612,140,'. Eigentlich will','naForum naForumB naNw')}
  {text(152,638,25,'ich','naForum naForumB naNw')}
  {field('p39-1e',182,637,283,'1 ich')}
  {text(468,638,400,'. Ich spiele in meiner Freizeit Theater. Vielleicht','naForum naForumB naNw')}
  {text(152,664,310,'melde ich mich nächstes Jahr bei einer','naForum naForumB naNw')}
  {field('p39-1f',470,665,240,'1 bei einer')}
  {text(709,664,35,'an.','naForum naForumB naNw')}
  {check('39-1',968,640,{'p39-1a':'mache eine Ausbildung als Verkäuferin|mache eine Ausbildung als Verkaeuferin','p39-1b':'langweilig','p39-1c':'arbeite oft lange','p39-1d':'verdiene nicht viel','p39-1e':'Schauspielerin werden|eine Schauspielerin werden','p39-1f':'Schauspielschule'})}
  <div className='naTitle naGB' style={{left:93,top:741}}><b>2</b></div>
  <div className='naT39L naT39L1 naNw' style={{left:135,top:740,width:300}}><Words text='Machen Sie wie in '/><span style={{color:'#5b629d'}}>1</span><Words text=' Notizen'/></div>
  <div className='naT39L naNw' style={{left:135,top:767,width:300}}><Words text='zu den Fragen und schreiben'/></div>
  <div className='naT39L naNw' style={{left:135,top:795,width:300}}><Words text='Sie dann einen Beitrag ins'/></div>
  <div className='naT39L naNw' style={{left:135,top:823,width:300}}><Words text='Forum.'/></div>
  <div style={{position:'absolute',left:443,top:744,width:546,height:11,background:'#bf931b',clipPath:'polygon(0 0,79px 0,100% 5px,100% 11px,0 11px)'}}/>
  <div className='naTippBar' style={{left:443,top:744,width:15,height:156}}>TIPP</div>
  {text(477,752,480,'Sie haben Probleme beim Schreiben? Sammeln Sie Ideen und','naTipp39 naNw')}
  {text(477,776,480,'machen Sie Notizen. Machen Sie Sätze aus Ihren Notizen.','naTipp39 naNw')}
  {text(477,797,480,'Nach dem Schreiben: Lesen Sie Ihren Text noch dreimal und','naTipp39 naNw')}
  {text(477,819,480,'suchen Sie Fehler.','naTipp39 naNw')}
  {text(477,841,480,'1. Lesen: Steht das Verb immer an der richtigen Position?','naTipp39 naNw')}
  {text(477,863,480,'2. Lesen: Hat das Verb die richtige Form?','naTipp39 naNw')}
  {text(477,886,480,'3. Lesen: Sind die Wörter richtig geschrieben?','naTipp39 naNw')}
  {text(92,944,385,'TRAINING: AUSSPRACHE','naTrain39 naTrain39b naNw')}
  {text(485,953,195,'Internationale Wörter','naGrIt naNw')}
  {lin(695,977,250,2,'#8acd8a')}
  {audio('assets/ab-a12-track18.mp3',40,1009,'2 18')}
  <div className='naTitle naGB' style={{left:90,top:1012}}><b>1</b></div>
  {text(133,1010,460,'Hören Sie und markieren Sie den Wortakzent.','naT39a naNw')}
  {text(310,1042,280,'meine Sprache / andere Sprachen','naMS39 naNw')}
  {text(133,1066,20,'a','naRow39 naNw')}{text(155,1066,140,'international','naRow39 naNw')}
  {text(133,1091,20,'b','naRow39 naNw')}{text(155,1091,140,'komponieren','naRow39 naNw')}{field('p39-3b',307,1089,163,'1 b')}
  {text(133,1117,20,'c','naRow39 naNw')}{text(155,1117,140,'interessant','naRow39 naNw')}{field('p39-3c',307,1115,163,'1 c')}
  {text(133,1143,20,'d','naRow39 naNw')}{text(155,1143,140,'Musik','naRow39 naNw')}{field('p39-3d',307,1141,163,'1 d')}
  {text(133,1168,20,'e','naRow39 naNw')}{text(155,1168,140,'elegant','naRow39 naNw')}{field('p39-3e',307,1166,163,'1 e')}
  {text(133,1195,20,'f','naRow39 naNw')}{text(155,1195,140,'Instrument','naRow39 naNw')}{field('p39-3f',307,1194,163,'1 f')}
  {text(133,1220,20,'g','naRow39 naNw')}{text(155,1220,140,'Technik','naRow39 naNw')}{field('p39-3g',307,1218,163,'1 g')}
  {text(133,1246,20,'h','naRow39 naNw')}{text(155,1246,140,'studieren','naRow39 naNw')}{field('p39-3h',307,1244,163,'1 h')}
  {text(133,1271,20,'i','naRow39 naNw')}{text(155,1271,140,'Akademie','naRow39 naNw')}{field('p39-3i',307,1270,163,'1 i')}
  {text(133,1297,20,'j','naRow39 naNw')}{text(155,1297,140,'Familie','naRow39 naNw')}{field('p39-3j',307,1295,163,'1 j')}
  {text(133,1322,20,'k','naRow39 naNw')}{text(155,1322,140,'Politiker','naRow39 naNw')}{field('p39-3k',307,1320,163,'1 k')}
  {text(133,1349,20,'l','naRow39 naNw')}{text(155,1349,140,'Produktion','naRow39 naNw')}{field('p39-3l',307,1348,163,'1 l')}
  {lin(233,1090,46,2,'#b5490f')}
  {art('5',307,1070,84,16)}
  {text(654,1032,290,'Ergänzen Sie die Wörter in Ihrer','naErga39 naNw')}
  {text(654,1057,290,'Sprache oder in einer anderen','naErga39 naNw')}
  {text(654,1083,290,'Sprache. Markieren Sie auch','naErga39 naNw')}
  {text(654,1108,290,'hier den Wortakzent.','naErga39 naNw')}
  <div className='naTitle naGB' style={{left:610,top:1158}}><b>2</b></div>
  {text(655,1156,340,'Wie viele internationale Wörter','naT39b naT39b1 naNw')}
  {text(655,1185,340,'kennen Sie? Notieren Sie und','naT39b naNw')}
  {text(655,1211,340,'sprechen Sie die Wörter.','naT39b naNw')}
  {art('6',679,1270,73,46)}
  {field('p39-4a',679,1318,170,'2 Wörter','naFieldLite')}
  {art('modul-tab',979,1388,93,43)}
  {text(788,1396,150,'neununddreißig','naFooter')}{text(938,1396,8,'|','naFooter')}{text(958,1396,22,'39','naFooter')}
 </>}
 {page==='40'&&<>
  {art('0',129,94,851,24)}
  <div className='naTitle naGB' style={{left:127,top:167}}><b>1</b></div>
  {text(171,163,140,'Ergänzen Sie.','naT40 naNw')}
  {rect(169,204,612,60,'#fdf6e4')}
  {text(175,206,610,'Geld | Führerschein | Wunsch | Fremdsprachen | Sängerin | Prüfungen | Welt','naBank40 naNw')}
  {lin(643,218,81,1,'#3e6091')}
  {art('lab-w',96,208,16,54)}
  {text(170,241,192,'Die Klasse 12a hat alle','naF190 naNw')}
  {art('hand-pruef',369,246,88,25)}
  {text(444,241,453,'(a) geschafft. Wie geht es weiter? David möchte den','naNw')}
  {field('p40-1b',170,264,230,'1 (b)')}
  {text(407,266,546,'(b) machen und mit dem Auto durch Australien reisen. Nicole','naNw')}
  {text(161,290,41,'will','naNw')}
  {field('p40-1c',213,290,222,'1 (c)')}
  {text(447,290,245,'(c) werden. Martin will viel','naNw')}
  {field('p40-1d',705,291,225,'1 (d)')}
  {text(937,290,22,'(d)','naNw')}
  {text(168,319,130,'verdienen und','naNw')}
  {text(308,319,253,'nach ein paar Jahren um die','naNw')}
  {field('p40-1e',570,316,226,'1 (e)')}
  {text(802,319,153,'(e) segeln. Sophia','naNw')}
  {text(169,344,121,'hat nur einen','naNw')}
  {field('p40-1f',300,341,229,'1 (f)')}
  {text(535,344,25,'(f).','naNw')}
  {text(568,344,292,'Sie möchte bald heiraten. Wilson','naNw')}
  {text(169,370,101,'spricht vier','naNw')}
  {field('p40-1g',280,367,230,'1 (g)')}
  {text(516,370,307,'(g) und möchte Bücher übersetzen.','naNw')}
  {art('p6',896,383,86,14)}
  {check('40-1',986,382,{'p40-1b':'Führerschein','p40-1c':'Sängerin','p40-1d':'Geld','p40-1e':'Welt','p40-1f':'Wunsch','p40-1g':'Fremdsprachen'})}
  <div className='naTitle naGB' style={{left:126,top:439}}><b>2</b></div>
  {text(171,435,560,'Kreuzen Sie an und ergänzen Sie die Endung, wo nötig.','naT40 naNw')}
  {art('lab-s1',96,480,16,80)}
  {text(169,474,205,'a David möchte allein,','naNw')}
  {art('ring',397,478,22,22)}
  {text(425,474,29,'mit','naNw')}
  {art('ring',476,478,22,22)}
  {text(504,474,45,'ohne','naNw')}
  {text(571,474,36,'sein','naNw')}
  {art('hand-x',482,482,11,15)}
  {text(622,474,60,'Eltern,','naNw')}
  {art('hand-e',604,488,12,12)}
  {text(689,474,20,'in','naNw')}
  {text(713,474,95,'Australien','naNw')}
  {text(811,474,55,'leben.','naNw')}
  {text(168,499,518,'b Nicoles Eltern finden ihren Berufswunsch gut, aber nur','naNw')}
  {dot('r2b','mit',710,506,'2 b mit')}
  {text(734,499,32,'mit','naNw')}
  {dot('r2b','ohne',789,506,'2 b ohne')}
  {text(815,499,43,'ohne','naNw')}
  {text(192,525,27,'ein','naNw')}
  {field('p40-2b-end',224,522,36,'2 b Endung')}
  {text(264,525,104,'Ausbildung.','naNw')}
  {text(169,550,382,'c Martin kauft immer viel ein. Er geht nie','naNw')}
  {dot('r2c','mit',576,557,'2 c mit')}
  {text(602,550,32,'mit','naNw')}
  {dot('r2c','ohne',656,557,'2 c ohne')}
    {text(682,550,45,'ohne','naNw')}
  {text(748,550,36,'sein','naNw')}
  {field('p40-2c-end',789,549,34,'2 c Endung')}
  {text(829,550,135,'Kreditkarte aus','naNw')}
  {text(192,577,90,'dem Haus.','naNw')}
  {text(168,601,222,'d Sophia will zusammen','naNw')}
  {dot('r2d','mit',416,610,'2 d mit')}
  {text(440,601,32,'mit','naNw')}
  {dot('r2d','ohne',496,610,'2 d ohne')}
    {text(520,601,45,'ohne','naNw')}
  {text(587,601,28,'ihr','naNw')}
  {field('p40-2d-end',619,601,34,'2 d Endung')}
  {text(658,601,223,'Mann drei Kinder haben.','naNw')}
  {text(168,627,210,'e Man sieht Wilson nie','naNw')}
  {dot('r2e','mit',404,634,'2 e mit')}
  {text(428,627,32,'mit','naNw')}
  {dot('r2e','ohne',484,634,'2 e ohne')}
    {text(509,627,45,'ohne','naNw')}
  {text(576,627,36,'sein','naNw')}
  {field('p40-2e-end',613,626,38,'2 e Endung')}
  {text(657,627,182,'Buch, er liest immer.','naNw')}
  {art('p8',896,640,84,17)}
  {check('40-2',986,641,{'r2b':'mit','r2c':'ohne','r2d':'mit','r2e':'ohne','p40-2b-end':'er','p40-2c-end':'e','p40-2d-end':'em','p40-2e-end':''})}
  <div className='naTitle naGB' style={{left:126,top:697}}><b>3</b></div>
  {text(169,693,310,'Schreiben Sie Sätze mit wollen.','naT40 naNw')}
  {art('lab-s2',96,738,16,82)}
  {text(167,732,20,'a','naNw')}
  {art('sqn',190,740,14,14)}
  {text(215,732,385,'Tom, machst du bitte deine Hausaufgaben!','naNw')}
  {art('trg',191,769,14,13)}
  {text(216,758,45,'Nein,','naNw')}
  {art('hand-radio',269,754,148,29)}
  {text(428,758,160,'(ich/Radio hören)','naNw')}
  {text(167,784,20,'b','naNw')}
  {art('sqn',190,792,14,14)}
  {text(215,784,60,'Wann','naNw')}
  {field('p40-3b',288,781,367,'3 b')}
  {text(660,784,135,'(ihr/heiraten)?','naNw')}
  {art('trg',191,820,14,13)}
  {text(216,810,205,'Nächstes Jahr im April.','naNw')}
  {text(168,835,20,'c','naNw')}
  {art('sqn',190,843,14,14)}
  {text(215,835,190,'Welche Fremdsprache','naNw')}
  {field('p40-3c',418,833,355,'3 c')}
  {text(776,835,132,'? (Sie/lernen)','naNw')}
  {art('trg',191,871,14,13)}
  {text(216,861,73,'Dänisch.','naNw')}
  {text(167,887,20,'d','naNw')}
  {art('sqn',190,895,14,14)}
  {text(215,887,35,'Was','naNw')}
  {field('p40-3d',263,885,362,'3 d')}
  {text(630,887,123,'? (du/werden)','naNw')}
  {art('trg',190,923,14,13)}
  {text(216,914,67,'Popstar.','naNw')}
  {art('p3',896,926,83,16)}
  {check('40-3',986,927,{'p40-3b':'wollt ihr heiraten','p40-3c':'wollen Sie lernen','p40-3d':'willst du werden'})}
  <div className='naTitle naGB' style={{left:125,top:981}}><b>4</b></div>
  {text(169,978,520,'Ergänzen Sie auf keinen Fall, vielleicht oder unbedingt.','naT40 naNw')}
  {art('lab-k',96,1022,16,109)}
  {text(167,1017,501,'a Die Sitzung ist sehr wichtig. Der Chef will den Termin','naNw')}
  {field('p40-4a',676,1016,227,'4 a')}
  {text(908,1017,74,'absagen.','naNw')}
  {text(166,1042,326,'b Franz möchte Lehrer werden oder','naNw')}
  {field('p40-4b',500,1041,347,'4 b')}
  {text(853,1042,126,'auch Politiker.','naNw')}
  {text(167,1068,315,'c Ich lerne jetzt jeden Tag. Ich will','naNw')}
  {field('p40-4c',490,1067,270,'4 c')}
  {text(766,1068,189,'die Prüfung schaffen.','naNw')}
  {text(167,1094,357,'d Das Wetter ist so schlecht. Ich möchte','naNw')}
  {field('p40-4d',530,1093,260,'4 d')}
  {text(796,1094,181,'mit dem Rad fahren.','naNw')}
  {text(167,1120,153,'e Katharina will','naNw')}
  {field('p40-4e',330,1118,358,'4 e')}
  {text(694,1120,240,'Französisch lernen. Sie hat','naNw')}
  {text(191,1146,160,'einen Job in Paris.','naNw')}
  {art('p5',907,1159,72,16)}
  {check('40-4',986,1160,{'p40-4a':'auf keinen Fall','p40-4b':'vielleicht','p40-4c':'unbedingt','p40-4d':'auf keinen Fall','p40-4e':'unbedingt'})}
  {rect(162,1203,511,39,'#f2f1d8')}
  {lin(161,1203,1,136,'#f0f0ea')}
  {lin(326,1203,1,136,'#f0f0ea')}
  {lin(494,1203,1,136,'#f0f0ea')}
  {lin(673,1203,1,136,'#f0f0ea')}
  {lin(161,1242,513,1,'#f0f0ea')}
  {lin(161,1271,513,1,'#f0f0ea')}
  {lin(161,1305,513,1,'#f0f0ea')}
  {lin(161,1339,513,1,'#f0f0ea')}
  {text(168,1212,60,'Wörter','naEvalH40 naNw')}
  {text(333,1212,90,'Strukturen','naEvalH40 naNw')}
  {text(500,1212,130,'Kommunikation','naEvalH40 naNw')}
  {art('sq-red',168,1245,25,23)}
  {art('sq-red',334,1245,25,23)}
  {art('sq-red',502,1245,25,23)}
  {text(204,1249,90,'0–3 Punkte','naEvalC40 naNw')}
  {text(369,1249,90,'0–5 Punkte','naEvalC40 naNw')}
  {text(536,1249,90,'0–2 Punkte','naEvalC40 naNw')}
  {art('sq-yel',168,1280,25,21)}
  {art('sq-yel',334,1280,25,21)}
  {art('sq-yel',502,1280,25,21)}
  {text(204,1280,70,'4 Punkte','naEvalC40 naNw')}
  {text(369,1280,70,'6–8 Punkte','naEvalC40 naNw')}
  {text(536,1280,70,'3 Punkte','naEvalC40 naNw')}
  {art('sq-grn',168,1313,25,23)}
  {art('sq-grn',334,1313,25,23)}
  {art('sq-grn',502,1313,25,23)}
  {text(205,1312,90,'5–6 Punkte','naEvalC40 naNw')}
  {text(369,1312,90,'9–11 Punkte','naEvalC40 naNw')}
  {text(536,1312,90,'4–5 Punkte','naEvalC40 naNw')}
  {text(446,1349,223,'www.hueber.de/menschen/lernen','naFooter')}
  {art('modul-tab',0,1390,88,30)}
  {text(101,1400,20,'40','naFooter')}
  {text(136,1400,8,'|','naFooter')}
  {text(154,1400,60,'vierzig','naFooter')}
 </>}
 {page==='41'&&<>
  {art('0',913,4,155,1390)}
  {art('2',539,906,251,138)}
  {lin(0,0,8,462,'#d8dfe5')}
  {lin(395,111,450,2,'#97d18b')}
  {lin(312,248,189,2,'#d0d2d8')}
  {lin(312,274,189,2,'#d0d2d8')}
  {lin(312,300,189,2,'#d0d2d8')}
  {lin(313,352,191,2,'#d0d2d8')}
  {lin(671,249,196,2,'#d0d2d8')}
  {lin(671,300,196,2,'#d0d2d8')}
  {lin(672,352,172,2,'#d0d2d8')}
  {lin(313,377,190,2,'#d0d2d8')}
  {lin(313,403,190,2,'#d0d2d8')}
  {lin(672,403,196,2,'#d0d2d8')}
  {lin(313,429,191,2,'#d0d2d8')}
  {lin(673,429,196,2,'#d0d2d8')}
  {lin(313,481,191,2,'#d0d2d8')}
  {lin(673,481,196,2,'#d0d2d8')}
  {lin(313,506,191,2,'#d0d2d8')}
  {lin(673,507,196,2,'#d0d2d8')}
  {lin(673,533,196,2,'#d0d2d8')}
  {lin(313,558,191,2,'#d0d2d8')}
  {lin(313,584,191,2,'#d0d2d8')}
  {lin(673,597,196,2,'#d0d2d8')}
  {lin(313,648,191,2,'#d0d2d8')}
  {lin(673,674,196,2,'#d0d2d8')}
  {lin(314,700,190,2,'#d0d2d8')}
  {lin(313,751,191,2,'#d0d2d8')}
  {lin(673,777,196,2,'#d0d2d8')}
  {lin(313,803,191,2,'#d0d2d8')}
  {lin(673,828,196,2,'#d0d2d8')}
  {lin(673,867,196,2,'#d0d2d8')}
  {lin(313,881,190,2,'#d0d2d8')}
  {lin(313,957,191,2,'#d0d2d8')}
  {lin(314,999,190,2,'#d0d2d8')}
  {lin(313,1022,191,2,'#d0d2d8')}
  {lin(142,1164,727,2,'#b8bbbc')}
  {lin(142,1190,727,2,'#bcbfc0')}
  {lin(142,1216,727,2,'#c1bfc7')}
  {lin(142,1242,727,2,'#b5b7c0')}
  {lin(142,1268,727,2,'#b5b7bd')}
  {lin(142,1293,727,2,'#bdbcc0')}
  {lin(142,1319,727,2,'#b8b8be')}
  {lin(143,1344,727,2,'#bfc0c2')}
  {[249,274,300,352,378,403,429,481,507,558,584,648,700,752,803,881,958,997,1023].map((y,i)=>field('p41-1-l'+(i+1),314,y-19,185,'1 links Zeile '+(i+1),'naFieldBlank'))}
  {[249,300,352,404,429,481,507,533,597,674,778,829,867].map((y,i)=>field('p41-1-r'+(i+1),674,y-19,190,'1 rechts Zeile '+(i+1),'naFieldBlank'))}
  {[1164,1190,1216,1242,1268,1293,1319,1344].map((y,i)=>field('p41-2-'+(i+1),144,y-19,720,'2 Notizzeile '+(i+1),'naFieldBlank'))}
  {text(98,83,281,'LERNWORTSCHATZ','naHeadline naNw')}
  {title('1',98,164,760,'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.','naGB')}
  {text(140,201,105,'Ausbildung','naBold naNw')}
  {text(526,201,228,'Weitere wichtige Wörter','naBold naNw')}
  {text(140,227,165,'Ausbildung die, -en','naNw')}
  {text(527,227,109,'Europa (das)','naNw')}
  {text(140,253,104,'Ausland das','naNw')}
  {text(527,254,116,'Führerschein','naNw')}
  {text(141,279,122,'Chance die, -n','naNw')}
  {text(538,285,52,'der, -e','naNw')}
  {text(141,306,123,'Fremdsprache','naNw')}
  {text(528,311,100,'Instrument','naNw')}
  {text(152,336,54,'die, -n','naNw')}
  {text(538,337,53,'das, -e','naNw')}
  {text(141,356,71,'Geld das','naNw')}
  {text(528,358,100,'Kreditkarte','naNw')}
  {text(142,382,124,'Politiker der, -','naNw')}
  {text(538,388,55,'die, -n','naNw')}
  {text(142,409,141,'Prüfung die, -en','naNw')}
  {text(528,410,105,'Lied das, -er','naNw')}
  {text(152,434,199,'eine Prüfung schaffen,','naNw')}
  {text(528,435,120,'Motorrad das,','naNw')}
  {text(538,466,40,'¨er','naNw')}
  {text(153,460,112,'hat geschafft','naNw')}
  {text(141,486,109,'Sänger der, -','naNw')}
  {text(527,487,72,'Welt die','naNw')}
  {text(141,512,116,'Sängerin die,','naNw')}
  {text(527,513,129,'Wunsch der, ¨e','naNw')}
  {text(152,542,39,'-nen','naSmall naNw')}
  {text(527,550,116,'heiraten, hat','naNw')}
  {text(142,568,92,'Star der, -s','naNw')}
  {text(538,579,90,'geheiratet','naNw')}
  {text(142,601,150,'ab·schließen, hat','naNw')}
  {text(527,607,151,'laufen, du läufst,','naNw')}
  {text(153,627,121,'abgeschlossen','naNw')}
  {text(539,632,70,'er läuft,','naNw')}
  {text(153,653,141,'eine Ausbildung','naNw')}
  {text(539,656,102,'ist gelaufen','naNw')}
  {text(153,679,101,'abschließen','naNw')}
  {text(538,680,206,'A/CH: rennen, ist gerannt','naNw naGray')}
  {text(142,705,133,'an·melden, hat','naNw')}
  {text(538,705,220,'(laufen = (zu Fuss) gehen)','naNw naGray')}
  {text(153,736,101,'angemeldet','naNw')}
  {text(528,736,87,'reisen, ist','naNw')}
  {text(141,761,130,'verdienen, hat','naNw')}
  {text(538,761,59,'gereist','naNw')}
  {text(152,787,75,'verdient','naNw')}
  {text(527,787,101,'putzen, hat','naNw')}
  {text(141,813,155,'werden, du wirst,','naNw')}
  {text(538,813,66,'geputzt','naNw')}
  {text(153,839,68,'er wird,','naNw')}
  {text(528,852,42,'ohne','naNw')}
  {text(154,865,110,'ist geworden','naNw')}
  {text(141,890,143,'wollen, ich will,','naNw')}
  {text(153,916,151,'du willst, er will,','naNw')}
  {text(153,942,99,'hat gewollt','naNw')}
  {text(142,980,89,'unbedingt','naNw')}
  {text(142,1001,133,'auf keinen Fall','naNw')}
  {title('2',100,1106,760,'Welche Wörter möchten Sie noch lernen? Notieren Sie.','naGB')}
  {rect(994,1391,78,19,'#cbc3a4')}
  {stext(999,1392,68,'Modul 6',{color:'#fff',fontSize:'13px'},'naModul naNw')}
  {text(818,1392,113,'einundvierzig','naFooter')}
  {text(937,1393,10,'|','naFooter')}
  {text(964,1392,20,'41','naFooter')}
 </>}
 {page==='42'&&<>
  {art('0',15,38,927,79)}
  {lin(745,117,125,2,'#9ccccd')}
  {kb(85,184,'KB 2')}
  {title('1',125,178,760,'Lesen Sie das Telefongespräch und ergänzen Sie.','naGB')}
  <div className="naSide naSide42" style={{left:97,top:222}}>WÖRTER</div>
  {rect(169,216,494,24,'#fcf6dc')}
  {text(172,215,40,'Arme','naBank42 naNw')}{text(220,215,4,'|','naBank42 naNw')}{text(230,215,45,'bleibe','naBank42 naNw')}{text(283,215,4,'|','naBank42 naNw')}{text(293,215,46,'Fieber','naBank42 naNw')}{text(346,215,4,'|','naBank42 naNw')}{text(356,215,36,'hoch','naBank42 naNw')}{text(400,215,4,'|','naBank42 naNw')}{text(410,215,42,'huste','naBank42 naNw')}{text(458,215,4,'|','naBank42 naNw')}{text(468,215,82,'schmerzen','naBank42 naNw')}{text(558,215,4,'|','naBank42 naNw')}{text(566,215,52,'krank','naBank42 naNw naStrike')}{text(617,215,4,'|','naBank42 naNw')}{text(626,215,32,'weh','naBank42 naNw')}
  {art('1',730,176,230,156)}
  <div className="naSq42" style={{left:168,top:264}}/><div className="naTri42" style={{left:169,top:317}}/><div className="naSq42" style={{left:168,top:342}}/><div className="naTri42" style={{left:169,top:368}}/><div className="naSq42" style={{left:168,top:394}}/><div className="naTri42" style={{left:169,top:420}}/><div className="naSq42" style={{left:168,top:445}}/><div className="naTri42" style={{left:169,top:498}}/><div className="naSq42" style={{left:168,top:523}}/>
  {text(192,254,493,'Hallo Lea, ich kann heute leider nicht zum Schwimmen','naNw')}
  {text(191,280,245,'kommen. Ich muss absagen.','naNw')}
  {text(191,306,123,'Warum denn?','naNw')}
  {text(192,332,60,'Ich bin','naNw')}
  {text(191,358,197,'Oh, was hast du denn?','naNw')}
  {text(192,383,121,'Ich habe Kopf','naNw')}
  {text(474,383,66,'und ich','naNw')}
  {text(191,409,298,'Oh, das tut mir leid. Hast du auch','naNw')}
  {text(652,409,6,'?','naNw')}
  {text(190,435,170,'Ja, es ist nicht sehr','naNw')}
  {text(509,435,349,'. Aber gut geht es mir nicht. Und meine','naNw')}
  {text(351,461,173,'und Beine tun auch','naNw')}
  {text(191,487,219,'Ach Mensch! Wie schade!','naNw')}
  {text(190,513,265,'Ja, das finde ich auch. Also ich','naNw')}
  {text(627,513,125,'lieber im Bett.','naNw')}
  {art('h1',260,339,47,16)}
  {title('2',125,579,760,'Was ist das? Notieren Sie.','naGB')}
  <div className="naSide naSide42" style={{left:97,top:630}}>WÖRTER</div>
  {text(166,618,10,'a','naNw')}{text(191,618,380,'Dort können Sie Medikamente bekommen.','naNw')}
  {text(166,644,10,'b','naNw')}{text(191,644,465,'Haben Sie Kopfschmerzen? Dann können sie helfen.','naNw')}
  {text(191,670,241,'Sie sind oft klein und weiß.','naNw')}
  {text(166,697,10,'c','naNw')}{text(191,697,530,'Sie bekommen es beim Arzt und gehen damit zur Apotheke.','naNw')}
  {text(166,722,10,'d','naNw')}{text(191,722,200,'Hier arbeitet der Arzt.','naNw')}
  {text(166,750,10,'e','naNw')}{text(191,750,530,'Haben Sie Schmerzen in den Beinen? Dann kann sie helfen.','naNw')}
  {text(191,774,309,'Sie sollen sie auf keinen Fall essen.','naNw')}
  {text(166,799,10,'f','naNw')}{text(191,799,255,'Ein anderes Wort für „Arzt“.','naNw')}
  {text(166,825,10,'g','naNw')}{text(191,825,400,'So heißen Tabletten, Salben und vieles mehr.','naNw')}
  {lin(738,691,225,1,'#b0b2ae')}
  {art('h2',738,675,69,16)}
  {kb(85,896,'KB 3')}
  {title('3',124,890,760,'Was sagt der Arzt? Schreiben Sie im Imperativ.','naGB')}
  <div className="naSide naSide42" style={{left:96,top:933}}>STRUKTUREN</div>
  {text(166,928,10,'a','naNw')}{text(190,928,190,'Soll ich viel trinken?','naNw')}
  {art('h3',381,933,151,19)}
  {text(166,954,10,'b','naNw')}{text(190,954,220,'Soll ich im Bett bleiben?','naNw')}
  {text(166,980,10,'c','naNw')}{text(190,980,260,'Soll ich diese Salbe nehmen?','naNw')}
  {text(166,1006,10,'d','naNw')}{text(190,1006,460,'Soll ich die Medikamente in der Apotheke abholen?','naNw')}
  {kb(85,1078,'KB 3')}
  {title('4',124,1071,760,'Aussagen, Fragen und Imperativsätze','naGB')}
  <div className="naSide naSide42" style={{left:78,top:1118}}>STRUKTUREN</div>
  <div className="naSide naSide42" style={{left:98,top:1111}}>ENTDECKEN</div>
  {text(135,1109,14,'a','naEx4b naNw')}
  {text(167,1109,210,'Ordnen Sie die Sätze zu.','naEx4 naNw')}
  {rect(170,1151,614,21,'#fffbdd')}
  {rect(170,1172,353,23,'#fffbdd')}
  {text(173,1146,611,'Holst du das Rezept in der Praxis ab? | Ich hole das Rezept in der Praxis ab. |','naBank42 naNw')}
  {text(173,1174,346,'Holen Sie das Rezept bitte in der Praxis ab!','naBank42 naNw')}
  {text(821,1205,57,'Position 1','naEvalC42 naNw')}
  {text(911,1205,69,'Position 2','naEvalC42 naNw')}
  {text(165,1228,72,'Aussage:','naNw')}
  {text(164,1253,135,'Ja-/Nein-Frage:','naNw')}
  {text(166,1279,126,'Imperativsatz:','naNw')}
  {text(135,1329,12,'b','naEx4b naNw')}
  {text(166,1329,240,'Markieren Sie die Verben in','naEx4m naNw naS184')}
  {text(412,1329,20,'a.','naEx4b naNw')}
  {text(435,1329,390,'Kreuzen Sie dann an: Wo stehen die Verben?','naEx4m naNw naS187')}
  {art('modtab',0,1389,90,32)}
  {text(101,1398,22,'42','naFooter naNw')}
  {text(132,1398,10,'|','naFooter naNw')}
  {text(153,1399,125,'zweiundvierzig','naFooter naNw')}
  {field('p42-1-1',313,380,154,'1 Lücke 1')}
  {field('p42-1-2',547,380,154,'1 Lücke 2')}
  {field('p42-1-3',495,405,156,'1 Lücke 3')}
  {field('p42-1-4',366,431,142,'1 Lücke 4')}
  {field('p42-1-5',185,457,159,'1 Lücke 5')}
  {field('p42-1-6',530,457,156,'1 Lücke 6')}
  {field('p42-1-7',467,509,154,'1 Lücke 7')}
  {field('p42-2a',738,614,225,'2 a')}
  {field('p42-2c',738,691,225,'2 c')}
  {field('p42-2d',738,717,225,'2 d')}
  {field('p42-2e',738,769,225,'2 e')}
  {field('p42-2f',738,795,225,'2 f')}
  {field('p42-2g',738,821,225,'2 g')}
  {field('p42-3b',413,949,555,'3 b')}
  {field('p42-3c',452,975,517,'3 c')}
  {field('p42-3d',651,1001,318,'3 d')}
  {field('p42-4a-Aussage',244,1220,557,'4a Aussage')}
  {field('p42-4a-Frage',306,1246,499,'4a Frage')}
  {field('p42-4a-Imperativ',299,1272,503,'4a Imperativ')}
  {dot('4b-Aussage','Position 1',846,1231,'4b Aussage Position 1')}
  {dot('4b-Aussage','Position 2',937,1231,'4b Aussage Position 2')}
  {dot('4b-Frage','Position 1',846,1257,'4b Frage Position 1')}
  {dot('4b-Frage','Position 2',937,1257,'4b Frage Position 2')}
  {dot('4b-Imperativ','Position 1',846,1283,'4b Imperativ Position 1')}
  {dot('4b-Imperativ','Position 2',937,1283,'4b Imperativ Position 2')}
  {check('42-1',960,544,{'p42-1-1':'schmerzen','p42-1-2':'huste','p42-1-3':'Fieber','p42-1-4':'hoch','p42-1-5':'Arme','p42-1-6':'weh','p42-1-7':'bleibe'})}
  {check('42-2',972,860,{'p42-2a':'Apotheke','p42-2c':'Rezept','p42-2d':'Praxis','p42-2e':'Salbe','p42-2f':'Doktor','p42-2g':'Medikamente'})}
  {check('42-3',975,1040,{'p42-3b':'Ja, bleiben Sie im Bett.|Bleiben Sie im Bett.','p42-3c':'Ja, nehmen Sie diese Salbe.|Nehmen Sie diese Salbe.','p42-3d':'Ja, holen Sie die Medikamente in der Apotheke ab.|Holen Sie die Medikamente in der Apotheke ab.'})}
  {check('42-4',880,1316,{'p42-4a-Aussage':'Ich hole das Rezept in der Praxis ab.','p42-4a-Frage':'Holst du das Rezept in der Praxis ab?','p42-4a-Imperativ':'Holen Sie das Rezept bitte in der Praxis ab!','4b-Aussage':'Position 2','4b-Frage':'Position 1','4b-Imperativ':'Position 1'})}
 </>}
 {page==='43'&&<>
  {art('0',790,35,278,251)}
  {lin(348,111,460,2,'#5b95a9')}
  {text(101,84,260,'BASISTRAINING','naHeadline naNw')}
  {kb(59,169,'KB 3')}
  <div className='naTitle naGB' style={{left:99,top:163,width:880}}><b>5</b><Words text='Schreiben Sie Ratschläge mit '/><i>doch</i><Words text='.'/></div>
  <div className="naSide naSide43 naSide43N" style={{left:73,top:210,letterSpacing:0}}><span className="naSide43F">K</span>OMMUNIKATION</div>
  {text(143,187,600,'Ihr Nachbar arbeitet ein halbes Jahr nicht. Geben Sie Ratschläge!','naSub43 naNw')}
  <div className="naBub43" style={{left:406,top:225,width:302,height:68}}/>
  {text(465,237,220,'Soll ich um die Welt segeln oder','naBubL43 naNw')}
  {text(488,258,195,'soll ich zu Hause bleiben?','naBubL43 naNw')}
  {text(142,231,10,'a','naNw')}
  {art('2',164,232,228,28)}
  {text(166,251,210,'(durch Europa reisen)','naNw')}
  {text(142,277,10,'b','naNw')}
  {text(949,280,10,'.','naNw')}
  {text(166,302,180,'(ins Ausland gehen)','naNw')}
  {text(142,330,10,'c','naNw')}
  {text(949,331,10,'.','naNw')}
  {text(166,354,215,'(ein Instrument lernen)','naNw')}
  {text(142,382,10,'d','naNw')}
  {text(949,383,10,'.','naNw')}
  {text(166,406,325,'(den Motorradführerschein machen)','naNw')}
  {text(142,432,10,'e','naNw')}
  {text(949,434,10,'.','naNw')}
  {text(166,457,295,'(noch eine Fremdsprache lernen)','naNw')}
  {art('dots',40,534,52,36)}
  {kb(59,531,'KB 3')}
  {title('6',99,524,900,'Notieren Sie fünf Probleme und tauschen Sie mit Ihrer Partnerin / Ihrem Partner.','naGB naTt6')}
  {text(143,548,450,'Ihre Partnerin / Ihr Partner gibt Ratschläge.','naSub43 naNw')}
  {lin(427,590,0.8,79,'#e2e0d0')}
  {text(149,594,90,'Problem','naBold naNw')}
  {text(436,594,90,'Ratschlag','naBold naNw')}
  {lin(141,627,558,1,'#dcd8ce')}
  {art('mude',148,637,280,26)}
  {art('sport',435,642,181,21)}
  {kb(59,712,'KB 3')}
  <div className='naTitle naGB naTt7' style={{left:99,top:704,width:700}}><b>7</b><Words text='Ergänzen Sie '/><i>sollen</i>{'  '}<Words text='in der richtigen Form.'/></div>
  <div className="naSide naSide43 naSide43N" style={{left:68,top:747}}><span className="naSide43F">S</span>TRUKTUREN</div>
  {text(142,741,10,'a','naNw')}
  {text(166,741,350,'Ich habe seit 3 Wochen Kopfschmerzen.','naF193 naNw')}
  {text(520,741,35,'Was','naF193 naNw')}
  {art('soll',563,748,21,17)}
  {text(590,741,70,'ich tun?','naF193 naNw')}
  {text(142,767,10,'b','naNw')}
  {text(165,767,245,'Was hat der Doktor gesagt?','naF193 naNw')}
  {text(516,767,175,'du im Bett bleiben?','naF193 naNw')}
  {text(142,792,10,'c','naNw')}
  {text(166,792,250,'Die Lehrerin hat gesagt, wir','naF193 naNw')}
  {text(526,792,195,'oft Deutsch sprechen.','naF193 naNw')}
  {text(142,818,10,'d','naNw')}
  {text(166,818,75,'Und was','naF193 naNw')}
  {text(362,818,160,'ihr noch machen?','naF193 naNw')}
  {text(142,844,10,'e','naNw')}
  {text(166,844,130,'Der Techniker','naF193 naNw')}
  {text(403,844,290,'morgen die Heizung reparieren.','naF193 naNw')}
  {text(142,870,10,'f','naNw')}
  {text(166,870,160,'Der Arzt sagt, Sie','naF193 naNw')}
  {text(431,870,360,'morgen Vormittag noch einmal kommen.','naF193 naNw')}
  {kb(59,944,'KB 4')}
  {title('8',99,937,560,'Suchen Sie Körperteile, notieren und zeichnen Sie.','naGB naTt8')}
  <div className="naSide naSide43 naSide43N" style={{left:71,top:980}}><span className="naSide43F">W</span>ÖRTER</div>
  {rect(142,977,511,22,'#fbf6d6')}
  {rect(142,1002,456,23,'#fbf6d6')}
  <div className="naText naSoup43 naNw" style={{left:146,top:973,width:520}}><span style={{color:'transparent',display:'inline-block',width:31}}>Köp</span>{' | Häl | Fin | Rü | Bäu | '}<span style={{color:'transparent',display:'inline-block',width:15}}>fe</span>{' | che | me | de | ger | Bei | cken | se |'}</div>
  {text(148,999,450,'ne | Fü | ren | ße | Knie | Oh | Au | Ar | gen | ne | Hän | Zäh','naSoup43 naSoup43B naNw')}
  {art('skop',142,977,41,21)}
  {art('sfe',346,977,20,21)}
  {lin(800,962,1,78,'#e0dcc8')}
  {text(710,969,95,'Singular','naBold naNw')}
  {text(823,969,60,'Plural','naBold naNw')}
  {lin(699,1001,200,1,'#d8d8bc')}
  {art('kopf',726,1016,47,22)}
  {art('koepfe',799,1004,73,36)}
  {art('face',815,926,154,110)}
  {kb(59,1073,'KB 4')}
  <div className='naTitle naGB naTt9' style={{left:99,top:1066,width:520}}><b>9</b><Words text='Ergänzen Sie aus '/><span style={{color:'#223b8d'}}>8</span><Words text=' und vergleichen Sie.'/></div>
  {art('globe',53,1090,40,30)}
  {rect(142,1102,812,30,'linear-gradient(90deg,#ece0c7 0%,#efe9d2 60%,#f1eed7 100%)')}
  {lin(424,1102,1,236,'#dedddb')}
  {lin(570,1102,1,237,'#dedddb')}
  {lin(142,1131,812,1,'#e0d8c6')}
  {lin(142,1161,815,1,'#f5f2e9')}
  {lin(142,1191,815,1,'#f5f2e9')}
  {lin(142,1220,815,1,'#f5f2e9')}
  {lin(142,1250,815,1,'#f5f2e9')}
  {lin(142,1279,815,1,'#f5f2e9')}
  {lin(142,1309,815,1,'#f5f2e9')}
  {lin(142,1338,815,1,'#f5f2e9')}
  {text(150,1110,70,'Deutsch','naBold naT9H naNw')}
  {text(421,1110,75,'Englisch','naBold naT9H naNw')}
  {text(577,1110,320,'Meine Sprache oder andere Sprachen','naBold naT9H naNw')}
  {text(151,1136,60,'Kopf','naT9 naNw')}
  {text(422,1138,60,'head','naT9 naNw')}
  {text(422,1169,60,'arm','naT9 naNw')}
  {text(424,1197,60,'finger','naT9 naNw')}
  {text(152,1226,60,'Bein','naT9 naNw')}
  {text(423,1227,60,'leg','naT9 naNw')}
  {text(152,1257,60,'Auge','naT9 naNw')}
  {text(423,1257,60,'eye','naT9 naNw')}
  {text(423,1286,60,'knee','naT9 naNw')}
  {text(424,1315,60,'hand','naT9 naNw')}
  {rect(995,1390,76,20,'#cbc3a4')}
  {stext(999,1392,68,'Modul 6',{color:'#fff',fontSize:'13px'},'naModul naNw')}
  {text(811,1387,130,'dreiundvierzig','naFooter naNw')}
  {text(942,1387,10,'|','naFooter naNw')}
  {text(961,1387,22,'43','naFooter naNw')}
  {field('p43-5b',164,274,784,'5 b')}
  {field('p43-5c',164,325,784,'5 c')}
  {field('p43-5d',164,377,784,'5 d')}
  {field('p43-5e',164,428,784,'5 e')}
  {field('p43-7b',414,764,96,'7 b')}
  {field('p43-7c',424,790,96,'7 c')}
  {field('p43-7d',250,815,90,'7 d')}
  {field('p43-7e',301,841,97,'7 e')}
  {field('p43-7f',328,867,97,'7 f')}
  {field('p43-9arm',150,1165,260,'9 arm','naNoRule43')}
  {field('p43-9finger',150,1194,260,'9 finger','naNoRule43')}
  {field('p43-9knie',150,1283,260,'9 knie','naNoRule43')}
  {field('p43-9hand',150,1312,260,'9 hand','naNoRule43')}
  {check('43-1',962,442,{'p43-5b':'Gehen Sie doch ins Ausland.','p43-5c':'Lernen Sie doch ein Instrument.','p43-5d':'Machen Sie doch den Motorradführerschein.','p43-5e':'Lernen Sie doch noch eine Fremdsprache.'})}
  {check('43-2',962,900,{'p43-7b':'Sollst','p43-7c':'sollen','p43-7d':'sollt','p43-7e':'soll','p43-7f':'sollen'})}
  {check('43-3',962,1300,{'p43-9arm':'Arm','p43-9finger':'Finger','p43-9knie':'Knie','p43-9hand':'Hand'})}
 </>}
 {page==='44'&&<>
  {lin(372,111,605,2,'#6dadb4')}
  {text(125,84,245,'BASISTRAINING','naHeadline naNw')}
  {kb(82,168,'KB 5')}
  {title('10',119,158,860,'Was tut Ihnen weh? Notieren Sie.','naGB')}
  {text(165,203,10,'a','naLet44 naNw')}
  {text(189,202,20,'Ich','naS185 naNw')}
  {art('hwa',222,208,175,17)}
  {text(164,229,10,'b','naLet44 naNw')}
  {text(188,228,40,'Meine','naS185 naNw')}
  {art('hwb',240,234,119,17)}
  {text(164,255,10,'c','naLet44 naNw')}
  {text(189,255,20,'Ich','naS185 naNw')}
  {text(599,255,10,'.','naS185 naNw')}
  {text(165,281,10,'d','naLet44 naNw')}
  {text(188,281,30,'Mein','naS185 naNw')}
  {text(599,281,10,'.','naS185 naNw')}
  {text(165,307,10,'e','naLet44 naNw')}
  {text(189,307,20,'Ich','naS185 naNw')}
  {text(599,307,10,'.','naS185 naNw')}
  {text(165,333,10,'f','naLet44 naNw')}
  {text(189,333,40,'Meine','naS185 naNw')}
  {text(599,334,10,'.','naS185 naNw')}
  {text(600,161,12,'a','naS185 naNw')}
  {art('imga',614,167,66,83)}
  {text(728,162,12,'b','naS185 naNw')}
  {art('imgb',747,172,53,93)}
  {text(854,204,12,'c','naS185 naNw')}
  {art('imgc',873,204,56,71)}
  {text(664,276,12,'d','naS185 naNw')}
  {art('imgd',658,300,77,45)}
  {text(770,314,12,'e','naS185 naNw')}
  {art('imge',784,321,54,74)}
  {text(876,309,12,'f','naS185 naNw')}
  {art('imgf',898,332,66,42)}
  {kb(82,414,'KB 5')}
  {title('11',119,402,860,'Ergänzen Sie das Gespräch.','naGB')}
  {rect(165,449,634,22,'#fbfbdd')}
  {text(171,445,630,'hilft | viel Sport | schaffe ich nicht | einen Kräutertee | gegen Stress | einen Tipp','naBank44 naNw')}
  <div className="naTri44" style={{left:165,top:500}}/>
  {text(189,491,170,"Hallo Lina, wie geht's?",'naDlg44 naNw')}
  <div className="naSq44" style={{left:164,top:525}}/>
  {text(189,517,660,'Na ja, es geht so. Ich habe gerade Probleme im Büro und super viel Stress.','naDlg44 naNw')}
  <div className="naTri44" style={{left:165,top:551}}/>
  {text(188,543,140,'Oh je. Du Arme.','naDlg44 naNw')}
  <div className="naSq44" style={{left:164,top:577}}/>
  {text(188,570,150,'Was machst du so','naDlg44 naNw')}
  {text(633,570,10,'?','naDlg44 naNw')}
  <div className="naTri44" style={{left:164,top:603}}/>
  {text(189,594,90,'Ich mache','naDlg44 naNw')}
  {text(493,594,45,'. Das','naDlg44 naNw')}
  <div className="naSq44" style={{left:164,top:628}}/>
  {text(187,621,470,'Ja, das stimmt. Aber ich habe nur wenig Zeit. Das','naDlg44 naF193 naNw')}{text(745,593,10,'.','naDlg44 naNw')}{text(966,619,10,'.','naDlg44 naNw')}
  {text(189,646,290,'Du kennst mich ja. Hast du noch','naDlg44 naNw')}
  {text(690,646,10,'?','naDlg44 naNw')}
  <div className="naTri44" style={{left:165,top:681}}/>
  {text(189,672,315,'Hm, vielleicht kannst du am Abend','naDlg44 naNw')}
  {text(849,672,80,'trinken.','naDlg44 naNw')}
  <div className="naSq44" style={{left:164,top:706}}/>
  {text(189,698,535,'Das ist eine gute Idee. Den kaufe ich mir gleich heute Abend.','naDlg44 naNw')}
  {kb(82,776,'KB 6')}
  {title('12',119,768,900,'Was meint T. Lohmann? Lesen Sie den Text und kreuzen Sie an. Was ist richtig?','naGB')}
  <div className="naSide naSide44" style={{left:83,top:782}}>LESEN</div>
  {rect(170,827,26,14,'#bf0e0d')}
  {text(211,815,230,'Wie essen wir gesund?','naHl44 naNw')}
  {stext(170,972,26,'5',{textAlign:'right'},'naLn44 naNw')}
  {stext(170,1102,26,'10',{textAlign:'right'},'naLn44 naNw')}
  {stext(578,897,26,'15',{textAlign:'right'},'naLn44 naNw')}
  {stext(578,1026,26,'20',{textAlign:'right'},'naLn44 naNw')}
  {stext(578,1156,26,'25',{textAlign:'right'},'naLn44 naNw')}
  {text(210,852,350,'Der Ernährungswissenschaftler T. Loh-','naCol44 naJ44 naNw')}
  {text(210,878,350,'mann sagt: „Essen Sie, was Sie wollen.“ Sie','naCol44 naJ44 naNw')}
  {text(210,904,350,'haben viel zum Thema Essen gelernt und','naCol44 naJ44 naNw')}
  {text(210,930,350,'gelesen? Vergessen Sie es! Es ist nicht','naCol44 naJ44 naNw')}
  {text(210,956,350,'wichtig. Es gibt keine gesunden und auch','naCol44 naJ44 naNw')}
  {text(210,982,350,'keine ungesunden Lebensmittel. Wir sol-','naCol44 naJ44 naNw')}
  {text(210,1007,350,'len fünfmal am Tag Obst und Gemüse es-','naCol44 naJ44 naNw')}
  {text(210,1033,348,'sen? „Nicht unbedingt“, sagt T. Lohmann.','naCol44 naJ44 naNw')}
  {text(210,1060,350,'Möchten Sie Obst und Gemüse essen und','naCol44 naJ44 naNw')}
  {text(210,1085,350,'schmeckt es Ihnen? Schön, dann essen Sie','naCol44 naJ44 naNw')}
  {text(210,1111,351,'es. Sie möchten eigentlich gerade gar kein','naCol44 naJ44 naNw')}
  {text(210,1137,351,'Obst und Gemüse essen? Dann sollen Sie es','naCol44 naJ44 naNw')}
  {text(210,1162,142,'auch nicht tun.','naCol44 naNw')}
  {text(614,852,351,'Und wie essen wir dann gesund?','naCol44 naNw')}
  {text(614,878,351,'T. Lohmanns Ratschlag lautet: „Ihr Körper','naCol44 naJ44 naNw')}
  {text(614,904,351,'weiß es.“ Sie frühstücken immer morgens','naCol44 naJ44 naNw')}
  {text(614,930,351,'um 7.00 Uhr? Das sollen Sie nicht tun. Es-','naCol44 naJ44 naNw')}
  {text(614,956,351,'sen Sie nicht zu festen Zeiten! Fragen Sie','naCol44 naJ44 naNw')}
  {text(614,982,351,'immer Ihren Körper: Habe ich gerade','naCol44 naJ44 naNw')}
  {text(614,1007,82,'Hunger?','naCol44 naNw')}
  {text(614,1033,351,'Und was sollen wir essen? Auch das ist','naCol44 naJ44 naNw')}
  {text(614,1060,351,'ganz leicht. Fragen Sie sich: „Was möchte','naCol44 naJ44 naNw')}
  {text(614,1085,351,'ich gerade gern essen?“ Unser Körper','naCol44 naJ44 naNw')}
  {text(614,1111,352,'braucht viele verschiedene Nahrungsmit-','naCol44 naJ44 naNw')}
  {text(614,1137,351,'tel und kann uns immer sagen, was gut','naCol44 naJ44 naNw')}
  {text(614,1162,102,'für ihn ist.','naCol44 naNw')}
  {text(164,1240,10,'a','naS15 naNw')}
  {text(188,1239,450,'Wir sollen auf keinen Fall Obst und Gemüse essen.','naStmt44 naNw')}
  {text(164,1266,10,'b','naS15 naNw')}
  {text(188,1265,390,'Wir sollen nur gesunde Lebensmittel essen.','naStmt44 naNw')}
  {text(165,1292,10,'c','naS15 naNw')}
  {text(188,1291,515,'Wir sollen uns vor dem Essen fragen: „Habe ich Hunger?“','naStmt44 naNw')}
  {text(165,1318,10,'d','naS15 naNw')}
  {text(189,1317,485,'Der Körper kann uns sagen: „Das ist gesund für mich.“','naStmt44 naNw')}
  {rect(40,1397,44,17,'#d8d4ba')}
  {stext(41,1395,44,'Modul 6',{color:'#fff'},'naModul naNw')}
  {text(99,1396,20,'44','naFooter naNw')}
  {text(134,1396,10,'|','naFooter naNw')}
  {text(152,1396,120,'vierundvierzig','naFooter naNw')}
  {field('p44-10c',222,249,375,'10 c')}
  {field('p44-10d',238,275,359,'10 d')}
  {field('p44-10e',222,301,375,'10 e')}
  {field('p44-10f',248,326,349,'10 f')}
  {field('p44-11-1',348,559,283,'11 Lücke 1')}
  {field('p44-11-2',284,585,207,'11 Lücke 2')}
  {field('p44-11-3',538,585,206,'11 Lücke 3')}
  {field('p44-11-4',630,611,336,'11 Lücke 4')}
  {field('p44-11-5',482,637,206,'11 Lücke 5')}
  {field('p44-11-6',508,663,334,'11 Lücke 6')}
  {dot('p44-12a','true',741,1243,'12 a',true)}
  {dot('p44-12b','true',741,1269,'12 b',true)}
  {dot('p44-12c','true',741,1295,'12 c',true)}
  {dot('p44-12d','true',741,1321,'12 d',true)}
  {check('44-1',966,352,{'p44-10c':'habe Bauchschmerzen','p44-10d':'Arm tut weh','p44-10e':'habe Kopfschmerzen','p44-10f':'Augen tun weh'})}
  {check('44-2',962,712,{'p44-11-1':'gegen Stress','p44-11-2':'viel Sport','p44-11-3':'hilft','p44-11-4':'schaffe ich nicht','p44-11-5':'einen Tipp','p44-11-6':'einen Kräutertee'})}
  {check('44-3',962,1345,{'p44-12a':'false','p44-12b':'false','p44-12c':'true','p44-12d':'true'})}
 </>}
 {page==='45'&&<>
  {art('0',408,41,660,79)}
  {art('1',162,220,560,70)}
  {rect(437,221,263,55,'#e0d9c0')}
  {rect(705,221,268,62,'#e0d9c0')}
  {lin(0,627,3,115,'#7a7a7a')}
  {lin(1065,728,7,424,'#c1c0c1')}
  {lin(787,862,178,4,'#77b5aa')}
  {lin(1062,1175,5,198,'#b4b4b4')}
  {lin(0,1223,6,209,'#c2c7cd')}
  {text(121,75,280,'TRAINING: HÖREN','naHeadline naNw')}
  {title('1',119,156,240,'Ansagen am Telefon','naGB naSer45')}
  {text(162,183,766,'Lesen Sie die Antworten und die Fragen. Hören Sie dann die Ansage und kreuzen Sie an.','naNw naLs02')}
  {text(458,239,205,'Welche Zeiten hören Sie?','naHl45 naNw')}
  {text(710,233,242,'Wann möchte Klaus Schneider','naNw')}
  {text(710,255,177,'zum Termin kommen?','naNw')}
  {text(169,278,180,'Morgen, um 10.00 Uhr','naNw')}
  {text(168,310,183,'Mittwoch, um 8.00 Uhr','naNw')}
  {text(167,343,265,'Mittwoch, von 10.00 bis 12.00 Uhr','naNw naF185')}
  {text(191,395,596,'Was ist beim Hören wichtig? Lesen Sie die Fragen genau und markieren Sie','naNw')}
  {text(190,416,637,'wichtige Wörter. Lesen Sie dann die Antworten. Alle Antworten können im Text','naNw')}
  {text(189,438,391,'vorkommen, aber achten Sie genau auf die Frage.','naNw')}
  {title('2',115,503,770,'Was ist richtig? Kreuzen Sie an. Sie hören jeden Text zweimal.','naGB naTls60 naNw')}
  {text(157,548,10,'a','naLet45 naNw')}
  {text(180,544,300,'Wann kann Frau Huber vielleicht','naNw')}
  {text(548,554,7,'c','naLet45 naNw')}
  {text(572,549,212,'Was funktioniert nicht?','naNw')}
  {text(179,570,148,'wieder arbeiten?','naNw')}
  {text(598,577,108,'Der Drucker.','naNw')}
  {text(206,594,164,'Heute Nachmittag.','naNw')}
  {text(598,600,192,'Das E-Mail-Programm.','naNw')}
  {text(205,622,164,'Morgen Vormittag.','naNw')}
  {text(597,628,214,'Die Internetverbindung.','naNw')}
  {text(205,648,179,'Morgen Nachmittag.','naNw')}
  {text(154,685,10,'b','naLet45 naNw')}
  {text(178,686,340,'Wo genau treffen sich Lea und David?','naNw')}
  {text(546,690,9,'d','naLet45 naNw')}
  {text(569,691,361,'Wann können Sie in die Praxis kommen?','naNw')}
  {text(204,712,100,'An der Uni.','naNw')}
  {text(595,718,288,'Am Dienstagabend um 18.00 Uhr.','naNw')}
  {text(205,738,80,'Im Hotel.','naNw')}
  {text(594,743,321,'Am Donnerstagmorgen um 7. 00 Uhr.','naNw')}
  {text(204,764,91,'In der Bar.','naNw')}
  {text(594,770,323,'Am Mittwochvormittag um 9.00 Uhr.','naNw')}
  {text(112,830,375,'TRAINING: AUSSPRACHE','naHeadline naNw')}
  {text(503,840,275,'Satzmelodie in Imperativ-Sätzen','naSatz45 naNw')}
  {title('1',110,891,315,'Hören Sie und ergänzen Sie','naGB')}
  {title('3',604,898,360,'Hören Sie und ergänzen Sie das','naGB')}
  {text(152,916,161,'die Satzmelodie:','naBold naNw')}
  {art('arr1',313,912,58,32)}
  {text(646,923,203,'Satzzeichen: ? oder !','naBold naNw')}
  {text(152,961,10,'a','naLet45 naNw')}
  {text(175,956,166,'Trinken Sie Tee?','naNw naF190')}
  {rect(281,978,27,2,'#c96969')}
  {rule(323,978,34)}
  {text(646,963,10,'a','naLet45 naNw')}
  {text(669,963,153,'Haben Sie Husten','naNw naF190')}
  {text(176,982,206,'Nehmen Sie Vitamin C?','naNw naF190')}
  {rect(362,1004,11,2,'#c96969')}
  {rule(387,1004,32)}
  {text(646,989,10,'b','naLet45 naNw')}
  {text(669,989,225,'Probieren Sie Heilkräuter','naNw naF190')}
  {text(174,1007,172,'Trinken Sie Kaffee?','naNw naF190')}
  {rect(279,1028,58,2,'#c96969')}
  {rule(351,1029,32)}
  {text(646,1014,10,'c','naLet45 naNw')}
  {text(668,1014,143,'Schlafen Sie viel','naNw naF190')}
  {text(174,1033,154,'Arbeiten Sie viel?','naNw naF190')}
  {rect(287,1054,31,2,'#c96969')}
  {rule(333,1055,33)}
  {text(646,1042,10,'d','naLet45 naNw')}
  {text(669,1042,225,'Essen Sie regelmäßig Obst','naNw naF190')}
  {text(150,1071,10,'b','naLet45 naNw')}
  {text(173,1072,200,'Trinken Sie viel Tee!','naNw naF190')}
  {rect(280,1092,32,2,'#c96969')}
  {rule(357,1094,32)}
  {text(646,1066,10,'e','naLet45 naNw')}
  {text(668,1066,196,'Gehen Sie schwimmen','naNw naF190')}
  {text(175,1098,201,'Nehmen Sie Vitamin C!','naNw naF190')}
  {rect(361,1119,11,2,'#c96969')}
  {rule(382,1120,33)}
  {text(646,1092,10,'f','naLet45 naNw')}
  {text(668,1092,153,'Machen Sie Sport','naNw naF190')}
  {text(173,1124,233,'Trinken Sie keinen Kaffee!','naNw naF190')}
  {rect(345,1145,57,2,'#c96969')}
  {rule(412,1146,34)}
  {text(173,1149,264,'Und arbeiten Sie nicht so viel!','naNw naF190')}
  {rect(214,1168,75,2,'#c96969')}
  {rule(444,1173,33)}
  {text(645,1144,232,'Hören Sie noch einmal und','naBold naNw')}
  {text(643,1169,160,'sprechen Sie nach.','naBold naNw')}
  {title('2',107,1213,170,'Ergänzen Sie','naGB')}
  {art('arrd2',279,1214,11,16)}
  {text(300,1214,45,'oder','naT45 naNw')}
  {art('arru2',352,1214,12,16)}
  {text(365,1214,8,'.','naT45 naNw')}
  {rect(158,391,507,5,'#c29417')}
  {art('tiptab',156,385,14,70)}
  {art('regelbar',140,1236,360,20)}
  {art('regelv',145,1281,22,36)}
  {text(182,1254,270,'Die Satzmelodie geht bei Ja-/Nein-','naNw')}
  {text(182,1276,105,'Fragen nach','naNw')}
  {text(362,1276,8,',','naNw')}
  {text(370,1276,77,'bei Bitten','naNw')}
  {text(181,1298,173,'und Ratschlägen nach','naNw')}
  {text(442,1298,8,'.','naNw')}
  {rect(997,1396,66,18,'#d0c7b8')}
  {stext(999,1394,62,'Modul 6',{color:'#fff'},'naModul naNw')}
  {text(811,1394,120,'fünfundvierzig','naFooter naNw')}
  {text(946,1394,10,'|','naFooter naNw')}
  {text(964,1394,22,'45','naFooter naNw')}
  {dot('1z0','true',451,279,'Zeiten 1',true)}
  {dot('1z1','true',451,312,'Zeiten 2',true)}
  {dot('1z2','true',451,345,'Zeiten 3',true)}
  {dot('1t','0',700,279,'Termin 1 0')}
  {dot('1t','1',700,312,'Termin 2 1')}
  {dot('1t','2',700,345,'Termin 3 2')}
  {dot('2a','0',177,597,'2a 0')}
  {dot('2a','1',177,624,'2a 1')}
  {dot('2a','2',177,650,'2a 2')}
  {dot('2b','0',177,711,'2b 0')}
  {dot('2b','1',177,738,'2b 1')}
  {dot('2b','2',177,764,'2b 2')}
  {dot('2c','0',572,573,'2c 0')}
  {dot('2c','1',572,601,'2c 1')}
  {dot('2c','2',572,628,'2c 2')}
  {dot('2d','0',567,719,'2d 0')}
  {dot('2d','1',567,747,'2d 1')}
  {dot('2d','2',567,775,'2d 2')}
  {field('p45-r0',290,1283,74,'Regel 0')}
  {field('p45-r1',358,1303,82,'Regel 1')}
  {field('p45-3a',828,967,26,'3 a')}
  {field('p45-3b',900,992,26,'3 b')}
  {field('p45-3c',815,1019,26,'3 c')}
  {field('p45-3d',900,1045,26,'3 d')}
  {field('p45-3e',870,1070,26,'3 e')}
  {field('p45-3f',826,1097,26,'3 f')}
  {audio('assets/ab-a12-track19.mp3',66,153,'2 19')}
  {audio('assets/ab-a12-track20.mp3',62,501,'2 20')}
  {audio('assets/ab-a12-track21.mp3',59,889,'2 21')}
  {audio('assets/ab-a12-track22.mp3',552,897,'2 22')}
  {audio('assets/ab-a12-track23.mp3',588,1147,'2 23')}
  {check('45-1',962,390,{'1z0':'true','1z1':'true','1z2':'false','1t':'2'})}
  {check('45-2',177,792,{'2a':'2','2b':'2','2c':'0','2d':'0'})}
  {check('45-3',290,1335,{'p45-r0':'oben','p45-r1':'unten'})}
  {check('45-4',948,1104,{'p45-3a':'?','p45-3b':'!','p45-3c':'!','p45-3d':'?','p45-3e':'!','p45-3f':'?'})}
 </>}
 {page==='46'&&<>
  {art('4',382,1219,172,79)}
  {lin(191,109,778,4,'#8cc4b9')}
  {lin(293,455,361,2,'#c5c5ca')}
  {lin(653,506,173,2,'#c4c3c4')}
  {lin(266,507,157,2,'#c1c4c5')}
  {lin(417,558,409,2,'#c4c5c6')}
  {lin(264,559,131,2,'#c4c0d6')}
  {lin(233,714,90,2,'#c6c2cc')}
  {lin(199,740,90,2,'#c7c2d7')}
  {lin(631,972,323,2,'#bec1c4')}
  {lin(270,998,257,2,'#c2c3c6')}
  {lin(197,1063,451,2,'#c4c4c7')}
  {lin(313,1089,225,2,'#c4c2cb')}
  {lin(540,1089,130,2,'#7a7a7a')}
  {lin(184,1115,253,2,'#c3c3c5')}
  {lin(417,1140,403,2,'#c4c7c7')}
  {lin(1067,1242,5,207,'#c0c7cb')}
  {text(114,84,70,'TEST','naBold naNw')}
  {text(110,154,332,'1 Ergänzen Sie die Körperteile.','naBold naNw')}
  {text(157,197,441,'Ich habe eine Brust, einen B (a) und einen R','naNw')}
  {text(691,197,27,'(b),','naNw')}
  {text(156,220,116,'zwei Arme, A','naNw')}
  {text(351,220,44,'(c), B','naNw')}
  {text(474,220,45,'(d), F','naNw')}
  {text(615,220,11,'H','naNw')}
  {text(712,220,48,'(f), O','naNw')}
  {text(863,220,84,'und Knie,','naNw')}
  {text(156,249,58,'zehn F','naNw')}
  {text(311,249,177,'(h) und viele Zähne.','naNw')}
  {text(919,267,45,'PUNKTE','naSmall naNw')}
  {text(110,310,464,'2 Viele Ratschläge. Was sagen die Personen?','naNw')}
  {text(156,352,653,'a Der Arzt sagt, ich soll in die Apotheke gehen und Medikamente kaufen.','naNw')}
  {text(180,382,42,'Arzt:','naNw')}
  {text(156,404,652,'b Der Apotheker sagt, ich soll eine Tablette nehmen und viel Tee trinken.','naNw')}
  {text(180,432,96,'Apotheker:','naBold naNw')}
  {text(156,456,605,'c Der Chef sagt, ich soll zu Hause bleiben und alle Termine absagen.','naNw')}
  {text(180,483,43,'Chef:','naNw')}
  {text(156,508,507,'d Der Kollege sagt, ich soll Obst essen und Sport machen.','naNw')}
  {text(174,533,74,'Kollege:','naBold naNw')}
  {text(922,533,45,'Punkte','naBold naNw')}
  {text(158,597,409,'Ergänzen Sie sollen in der richtigen Form.','naNw')}
  {text(157,637,74,'a Wir','naNw')}
  {text(278,637,318,'viele Orangen essen. Ist das richtig?','naNw')}
  {text(679,637,212,'Ja, sie sind sehr gesund.','naNw')}
  {text(156,663,73,'b Der','naNw')}
  {text(235,663,116,'Arzt sagt, ihr','naNw')}
  {text(452,663,177,'viel Wasser trinken!','naNw')}
  {text(680,663,255,'Wir mögen aber kein Wasser!','naNw')}
  {text(157,689,8,'c','naNw')}
  {text(200,689,27,'Ich','naNw')}
  {text(328,689,297,'jeden Tag fünf Tabletten nehmen.','naNw')}
  {text(681,689,143,'Das ist aber viel!','naNw')}
  {text(157,715,34,'d','naNw')}
  {text(295,715,273,'Herr Meyer in die USA fliegen?','naNw')}
  {text(681,715,164,'Nein, Herr Herold.','naNw')}
  {text(157,741,8,'e','naNw')}
  {text(200,741,33,'Was','naNw')}
  {text(335,741,634,'Tanja und Tamara noch einkaufen? Tomaten und fünf Brötchen bitte.','naNw')}
  {text(157,767,65,'f Du','naNw')}
  {text(324,767,176,'doch im Bett liegen.','naNw')}
  {text(686,767,213,'Och, es ist so langweilig.','naNw')}
  {text(112,826,182,'4 Schreiben Sie.','naNw')}
  {text(157,871,52,'Leser S.','naNw')}
  {text(390,871,104,'Frau Dr. Hauck','naNw')}
  {text(164,896,816,'Rückenschmerzen | Tipp? viel Sport machen | Apotheke/Salbe gegen Schmerzen holen | Arzt fragen','naNw')}
  {text(168,948,456,'Leser S. aus Stuttgart: Ich habe ein Problem. Seit Monaten','naNw')}
  {text(185,975,78,'Haben Sie','naNw')}
  {text(528,975,6,'?','naNw')}
  {text(168,1013,653,'Frau Dr. Hauck: Ja, das Problem haben viele. Diese Tipps sind jetzt wichtig für Sie:','naNw')}
  {text(184,1065,129,'Gehen Sie a','naNw')}
  {text(741,1065,28,'und','naNw')}
  {text(185,1117,176,'Das hilft nichts? Dann','naNw')}
  {text(185,1142,264,'Er kann Ihnen helfen. Alles Gute.','naNw')}
  {text(153,1209,62,'Wörter','naBold naNw')}
  {text(325,1209,87,'Strukturen','naBold naNw')}
  {text(493,1209,127,'Kommunikation','naBold naNw')}
  {text(197,1245,84,'0-3 Punkte','naEvalC40 naNw')}
  {text(361,1245,27,'0-5','naEvalC40 naNw')}
  {text(563,1245,49,'Punkte','naEvalC40 naNw')}
  {text(197,1280,84,'4-5 Punkte','naEvalC40 naNw')}
  {text(362,1280,27,'6-8','naEvalC40 naNw')}
  {text(544,1280,50,'Punkte','naEvalC40 naNw')}
  {text(198,1314,82,'6-7 Punkte','naEvalC40 naNw')}
  {text(362,1314,92,'9-11 Punkte','naEvalC40 naNw')}
  {text(529,1314,84,'5-6 Punkte','naEvalC40 naNw')}
  {text(438,1355,223,'www.hueber.de/menschen/lernen','naFooter')}
  {text(94,1397,179,'46 | sechsundvierzig','naFooter')}
  {field('p46-1b',598,193,90,'1 (b)')}
  {field('p46-1c',272,220,76,'1 (c)')}
  {field('p46-1d',395,220,76,'1 (d)')}
  {field('p46-1e',521,220,54,'1 (e)')}
  {field('p46-1f',634,220,75,'1 (f)')}
  {field('p46-1g',762,218,68,'1 (g)')}
  {field('p46-1h',214,247,94,'1 (h)')}
  {field('p46-2b',282,427,533,'2 b')}
  {field('p46-2c',229,478,586,'2 c')}
  {field('p46-2d',254,528,561,'2 d')}
  {field('p46-3b',357,659,90,'3 b')}
  {field('p46-3c',233,685,90,'3 c')}
  {field('p46-3d',200,711,90,'3 d')}
  {field('p46-3e',240,738,90,'3 e')}
  {field('p46-3f',228,763,91,'3 f')}
  {check('46-1',214,290,{'p46-1b':'Rücken|ücken','p46-1c':'Augen|ugen','p46-1d':'Beine|eine','p46-1e':'Füße|üße','p46-1f':'Hände|ände','p46-1g':'Ohren|hren','p46-1h':'Finger|inger'})}
  {check('46-2',229,571,{'p46-2b':'Nehmen Sie eine Tablette und trinken Sie viel Tee.','p46-2c':'Bleiben Sie zu Hause und sagen Sie alle Termine ab.','p46-2d':'Essen Sie Obst und machen Sie Sport.'})}
  {check('46-3',200,806,{'p46-3b':'sollt','p46-3c':'soll','p46-3d':'Soll|soll','p46-3e':'sollen','p46-3f':'sollst'})}
 </>}
 </div><audio ref={player} className="naPlayer"/></div>;
}
