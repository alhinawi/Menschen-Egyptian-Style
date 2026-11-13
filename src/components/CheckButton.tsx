import type {ButtonHTMLAttributes} from 'react';
import './check-button.css';
export function CheckButton({className='',...props}:ButtonHTMLAttributes<HTMLButtonElement>){
 return <button {...props} className={'compactCheckButton '+className} aria-label="Prüfen" title="Prüfen">✓</button>;
}
