import {CheckButton} from '../components/CheckButton';
import {usePageReset} from './usePageReset';
import {useState} from 'react';
import {LineMatching} from './LineMatching';
/** Exercise coordinates are the printed p88 matching block, cropped at (204,318). */
export function AB11LineMatching88(){
 const key='native-ab11-line-88';
 const [values,S]=useState<Record<string,string>>(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}});
 const [correct,C]=useState<boolean|undefined>();
 usePageReset(88,key,()=>{S({});C(undefined)});
 const expected=[4,2,5,0,6,3,1];
 const set=(id:string,value:string)=>{const next={...values,[id]:value};S(next);localStorage.setItem(key,JSON.stringify(next));C(undefined)};
 return <div data-ab11-line-page="88"><div style={{position:'relative',width:'100%',aspectRatio:'636/228'}}>
 <LineMatching id="ab88-1" left={['a  Wein','b  die Hausaufgaben','c  Fahrrad','d  Spanisch','e  die Zeitung','f  Freunde','g  das Zimmer']} right={['lernen','aufräumen','machen','einladen','trinken','fahren','lesen']} values={values} onMatch={set} leftX={0} rightX={278} leftWidth={205} rightWidth={220} ys={[2,31,60,89,118,147,176]} rightYs={[2,31,60,89,118,147,176]} width={636} height={228} fontSize={22} example={[0,4]}/>
 </div><div className="ab11MatchingCheck"><CheckButton type="button" onClick={()=>C(expected.every((r,i)=>i===0||values['ab88-1-'+i]===''+r))}></CheckButton><output aria-live="polite">{correct===undefined?'':correct?'✓ Richtig!':'Noch einmal'}</output></div></div>;
}
