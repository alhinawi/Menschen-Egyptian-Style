import {createElement} from 'react';
import icons from './social-icons.json';
const links={whatsapp:'https://wa.me/201028928248',github:'https://github.com/alhinawi',linkedin:'https://linkedin.com/in/hinawi',facebook:'https://facebook.com/hinawi'};
export function CoverSocials(){return Object.keys(icons).map(name=><a key={name} className="coverSocial" aria-label={name[0].toUpperCase()+name.slice(1)} title={name[0].toUpperCase()+name.slice(1)} href={links[name]} target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name].map(([tag,attrs],i)=>createElement(tag,{...attrs,key:i}))}</svg></a>)}
