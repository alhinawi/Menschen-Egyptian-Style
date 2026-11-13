import {useState} from 'react';
import {AB12Canvas,AB12Helpers} from '../ab12-shared';
import {CheckButton} from '../CheckButton';

function NeutralCheck({id,x,y}:{id:string,x:number,y:number}){
 const [saved,setSaved]=useState(false);
 return <div className="naCheck" data-check={id} style={{left:x,top:y}}><CheckButton onClick={()=>setSaved(true)}/><output aria-live="polite">{saved?'Gespeichert':''}</output></div>;
}

function P83(h:AB12Helpers){const {line:ln,runs:rn,wl,art,field,modTab,box,rect}=h;const D='naDroid83';const V={c:'#767563'};return <>
  {art('rail',693,24,115,1011)}
  {ln(69,64,220,20,'LERNWORTSCHATZ',{c:'#363534',ls:1.5,fam:'serif'})}
  {rect(296,86,355,2,'#ae5f6e')}
  {box('1',65,121)}  {rn(100,123,420,15,[{t:'Wie heißen die Wörter in Ihrer Sprache? Übersetzen Sie.',b:1}],{fam:'fira'})}
  {ln(99,154,63,14,'Kleidung',{b:1,cls:D})}
  {ln(100,174,82,14,'Kleidung die',{cls:D})}
  {ln(100,194,79,14,'Bluse die, -n',{cls:D})}
  {ln(98,213,81,14,'Jacke die, -n',{cls:D})}
  {ln(99,233,78,14,'Gürtel der, -',{cls:D})}
  {ln(100,252,91,14,'Hemd das, -en',{cls:D})}
  {ln(100,272,75,14,'Hose die, -n',{cls:D})}
  {ln(99,292,69,14,'Hut der, -e',{cls:D})}
  {ln(100,310,84,14,'Kleid das, -er',{cls:D})}
  {ln(99,330,84,14,'Mantel der, -',{cls:D})}
  {ln(99,350,86,14,'Mütze die, -n',{cls:D})}
  {ln(107,370,93,13,'A: Haube die, -n',{...V,cls:D})}
  {ln(107,390,100,13,'CH: Kappe die, -n',{...V,cls:D})}
  {ln(99,408,91,14,'Pullover der, -',{cls:D})}
  {ln(99,427,75,14,'Rock der, -e',{cls:D})}
  {ln(107,448,113,13,'CH: auch: der Jupe, -s',{...V,cls:D})}
  {ln(99,466,84,14,'Schuh der, -e',{cls:D})}
  {ln(99,486,81,14,'Socke die, -n',{cls:D})}
  {ln(99,505,99,14,'Strumpf der, -e',{cls:D})}
  {ln(107,526,115,13,'CH: Strumpfhose die, -n oder',{...V,cls:D})}
  {ln(107,546,96,13,'Kniesocke die, -n',{...V,cls:D})}
  {ln(99,564,84,14,'Strumpfhose',{cls:D})}
  {ln(107,584,41,14,'die, -n',{cls:D})}
  {ln(98,603,89,14,'T-Shirt das, -s',{cls:D})}
  {ln(391,154,172,14,'Weitere wichtige Wörter',{b:1,cls:D})}
  {ln(391,176,71,14,'Text der, -e',{cls:D})}
  {ln(391,204,91,14,'an-haben, hat',{cls:D})}
  {ln(399,224,60,14,'angehabt',{cls:D})}
  {ln(391,243,95,14,'an-ziehen, hat',{cls:D})}
  {ln(399,266,68,14,'angezogen',{cls:D})}
  {ln(391,282,88,14,'erzählen, hat',{cls:D})}
  {ln(399,305,46,14,'erzählt',{cls:D})}
  {ln(391,331,27,14,'klug',{cls:D})}
  {ln(391,364,16,14,'als',{cls:D})}
  {ln(399,379,73,14,'schöner als',{cls:D})}
  {ln(391,399,90,14,'(genau)so wie',{cls:D})}
  {ln(391,418,99,14,'(genau)so schön',{cls:D})}
  {ln(399,442,22,14,'wie',{cls:D})}
  {ln(391,461,44,14,'zuletzt',{cls:D})}
  {ln(391,481,45,14,'zurzeit',{cls:D})}
  {ln(391,507,43,14,'Klasse!',{cls:D})}
  {ln(398,528,76,13,'A/CH: Super!',{...V,cls:D})}
  {ln(390,545,27,14,'Toll!',{cls:D})}
  {[189,208,228,247,267,286,306,325,345,364,423,442,481,501,520,598,618].map((y,i)=><div key={'rl'+y} className='naRule' style={{left:228,top:y,width:144,borderBottom:'1px solid #c6c6ce'}}/>)}
  {[189,238,277,316,355,375,394,414,453,472,491,520,560].map((y,i)=><div key={'rr'+y} className='naRule' style={{left:500,top:y,width:148,borderBottom:'1px solid #c6c6ce'}}/>)}
  {art('tipp',248,646,27,54)}
  {ln(273,653,123,13,'Schneiden Sie Bilder',{cls:D})}
  {ln(273,670,125,13,'aus und ergänzen Sie',{cls:D})}
  {ln(273,685,78,13,'die Kleidung.',{cls:D})}
  {art('schere',407,592,144,98)}
  {box('2',65,735)}  {rn(98,738,410,15,[{t:'Welche Wörter möchten Sie noch lernen? Notieren Sie.',b:1}],{fam:'fira'})}
  {[783,803,822,842,861,881,900,920,939,958,978,997,1017].map((y,i)=><div key={'r2'+y} className='naRule' style={{left:98,top:y,width:550,borderBottom:'1px solid #c6c6ce'}}/>)}
  {[189,208,228,247,267,286,306,325,345,364,423,442,481,501,520,598,618].map((y,i)=>field('p83-1-l'+(i+1),228,y-19,144,'1 links Zeile '+(i+1),'naFieldBlank'))}
  {[189,238,277,316,355,375,394,414,453,472,491,520,560].map((y,i)=>field('p83-1-r'+(i+1),500,y-19,148,'1 rechts Zeile '+(i+1),'naFieldBlank'))}
  {[783,803,822,842,861,881,900,920,939,958,978,997,1017].map((y,i)=>field('p83-2-'+(i+1),98,y-19,550,'2 Notizzeile '+(i+1),'naFieldBlank'))}
  <NeutralCheck id='n1' x={100} y={650}/>
  <NeutralCheck id='n2' x={656} y={978}/>
  {wl(1065,12,[{x:599,w:91,t:'dreiundachtzig'},{x:703,w:2,t:'|'},{x:717,w:13,t:'83'}])}
  {modTab(740,1053,'Modul 8')}
</>}

export function NativeAB12P83({page}:{page:string}){
 if(page==='83')return <AB12Canvas page={page} width={810} height={1095}>{P83}</AB12Canvas>;
 return null;
}
