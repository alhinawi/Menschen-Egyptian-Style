import {PageImage} from '../components/PageImage';
import {usePageReset} from '../exercises/usePageReset';
import {useLayoutEffect,useRef,useState} from 'react';
import '../components/native-ab12.css';
import './native-ab12-p18-29.css';
import './native-ab12-p29.css';

function Words({text}:{text:string}){return <>{text.split(/(\s+)/).map((w,i)=>/\p{L}/u.test(w)?<span key={i} className="tapWord" role="button" tabIndex={0} data-word={w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu,'')} data-phrase={text}>{w}</span>:w)}</>}

// Line geometry measured from the book scan (assets/ab-a12-p29.png, 1071x1447).
const INTRO:[number,number,string,string][]=[
 [121,243,'Das ist bisher passiert:','naIntroB'],
 [121,271,'Paul und sein Hund Herr Rossmann machen Urlaub in München. Dort treffen sie Anja. Die','naIntro'],
 [120,298,'drei werden Freunde. Sie machen viele Dinge gemeinsam, aber schon bald müssen Paul und','naIntro'],
 [121,326,'Herr Rossmann wieder zurück nach Wien fahren. Zwei Wochen sind zu kurz, finden sie . . .','naIntro'],
];
const LCOL:[number,number,string][]=[
 [128,414,'‚Ist das schön hier . . .!‘, denkt Anja.'],
 [129,440,'Sie ist gerade aus der U-Bahn ausgestiegen und'],
 [139,466,'steht vor dem Schloss Schönbrunn in Wien.'],
 [128,492,'„Entschuldigen Sie, ich suche die Penzinger'],
 [139,518,'Straße“, sagt sie zu einem Mann.'],
 [129,543,'„Hm, ich bin nicht von hier. Ich kenne diese'],
 [139,569,'Straße nicht.“'],
 [129,595,'„Und Sie? Können Sie mir helfen? Wo ist die'],
 [140,621,'Penzinger Straße?“'],
 [129,648,'„Pardon?“'],
 [129,672,'‚Gibt es hier nur Touristen!?‘, denkt Anja.'],
];
const RCOL:[number,number,string][]=[
 [538,396,'Sie fragt eine alte Frau: „Entschuldigen Sie, ich suche'],
 [548,422,'die Penzinger Straße.“'],
 [538,448,'„Ja, die ist ganz in der Nähe. Gehen Sie geradeaus über'],
 [548,473,'den Platz hier. Sehen Sie die Straßenbahnstation dort?'],
 [549,499,'Da gehen Sie nach links und dann nach rechts. Die'],
 [548,525,'nächste Straße ist die Penzinger Straße.“'],
 [537,551,'„Vielen Dank!“'],
 [537,576,'Anja nimmt ihren Koffer und geht los.'],
 [537,601,'‚Hoffentlich ist Paul zu Hause‘, denkt sie. ‚Er weiß'],
 [549,627,'ja nicht, dass ich ihn besuchen komme.‘'],
 [510,683,'„Was ist denn los, Herr Rossmann?“, fragt Paul.'],
 [511,708,'Sein Hund läuft schon den ganzen Morgen in der Wohnung herum:'],
 [520,734,'zum Fenster, zur Tür, zum Fenster . . .'],
 [510,760,'„Ja, ich sehe schon, Herr Rossmann, du wartest auf einen Gast.'],
 [520,786,'Aber heute kommt uns niemand besuchen.“'],
 [511,812,'Herr Rossmann bellt.'],
 [510,838,'„Bitte, Herr Rossmann!“'],
 [511,862,'Herr Rossmann läuft zur Tür und bellt wieder.'],
 [510,888,'„Herr Rossmann, was ist . . .“'],
 [511,914,'Es klingelt. Doch ein Gast?'],
 [510,940,'Paul öffnet die Tür und . . .'],
 [510,965,'„Anja! . . . Du bist in Wien? Das ist ja eine tolle Überraschung.“'],
 [510,991,'„Ich komme dich besuchen. Kann ich reinkommen?“'],
 [510,1017,'„Ja, klar, komm rein. Ich nehme deinen Koffer.“'],
 [511,1043,'Herr Rossmann bellt.'],
 [510,1068,'„Hallo Herr Rossmann, endlich sehe ich dich wieder!“, sagt Anja'],
 [521,1094,'und streichelt den Hund.'],
 [510,1120,'„Wie geht es dir, Anja?“, fragt Paul. „Bist du müde von der Reise?'],
 [521,1145,'Möchtest du etwas essen? Oder einen Kaffee?“'],
 [510,1171,'„Oh ja, Kaffee ist gut . . . Und dann suchen wir ein Hotel für mich.“'],
 [510,1196,'„Ach was, Hotel. Du kannst hier auf dem Sofa schlafen.“'],
 [510,1223,'„Wirklich? Super, danke! Dann können wir ja gleich Wien ansehen.“'],
 [510,1249,'„Ja, den Stephansdom, das Riesenrad, das Schloss Schönbrunn . . .“'],
 [510,1274,'„Das habe ich schon gesehen“, sagt Anja und lacht. „Aber mit dem'],
 [521,1300,'Stephansdom können wir anfangen.“'],
];

export function NativeAB12P29({page}:{page:string}){
 const W=1071,H=1448;
 const root=useRef<HTMLDivElement>(null);
 const [scale,ss]=useState(.6);const key='native-ab12-'+page;
 useLayoutEffect(()=>{const el=root.current!;const obs=new ResizeObserver(()=>ss(Math.min(el.clientWidth/W,(el.clientHeight-38)/H)));obs.observe(el);return ()=>obs.disconnect()},[]);
 usePageReset(page,key,()=>{});
 return <div className="nativeAB12" ref={root} data-native-ab12={page}><style>{`@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-400.woff2') format('woff2');font-weight:400}@font-face{font-family:FiraSans;src:url('assets/fonts/firasans-latin-700.woff2') format('woff2');font-weight:700}@font-face{font-family:FiraSansCond;src:url('assets/fonts/firasanscond-latin-400.woff2') format('woff2');font-weight:400;font-display:swap}@font-face{font-family:DroidSerif;src:url('assets/fonts/droid-serif-400.ttf') format('truetype');font-weight:400;font-display:swap}@font-face{font-family:DroidSerif;src:url('assets/fonts/droid-serif-700.woff2') format('woff2');font-weight:700;font-display:swap}`}</style><div className="naCanvas" style={{width:W,height:H,marginLeft:-W/2,marginTop:-H/2,transform:`scale(${scale})`}}>
  <PageImage className="naArt naBg" src={`assets/book-crops/native-ab12-p${page}-bg.webp`} alt="Seitenhintergrund: Himmel, Illustration und Foto" style={{left:0,top:0,width:W,height:H}}/>
  <div className="naText naStory naHead" style={{left:119,top:376}}><Words text="Teil 1: Wo ist Pauls Wohnung?"/></div>
  {INTRO.map(([x,y,t,c])=><div key={y} className={'naText naStory '+c} style={{left:x,top:y}}><Words text={t}/></div>)}
  {LCOL.map(([x,y,t])=><div key={y} className="naText naStory" style={{left:x,top:y}}><Words text={t}/></div>)}
  {RCOL.map(([x,y,t])=><div key={y} className="naText naStory" style={{left:x,top:y}}><Words text={t}/></div>)}
 </div></div>;
}
