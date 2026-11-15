import {useUiLanguage} from '../ui-language';
import {useContext, useLayoutEffect, useState, useSyncExternalStore} from 'react';
import {createPortal} from 'react-dom';
import {ReaderContext} from './ReaderControls';
import {CoverSocials} from './CoverSocials';
import previews from './cover-previews.json';
import './premium-covers.css';
import {openBookCover} from '../readerTransitions';

/** A single cover treatment for all four books. Original publisher artwork stays intact. */
export function PremiumCover({src, alt}: {src: string; alt: string}) {
  const {language, t} = useUiLanguage();
  const reader = useContext(ReaderContext)!;
  const snapshot = useSyncExternalStore(reader.subscribe, reader.getSnapshot, reader.getSnapshot);
  const active = snapshot.ready && snapshot.page === '0';
  useLayoutEffect(() => {document.body.classList.toggle('fullscreenCoverActive', active); return () => document.body.classList.remove('fullscreenCoverActive');}, [active]);
  const [loaded, setLoaded] = useState(false);
  const level = src.includes('a12') ? 'A1.2' : 'A1.1';
  const book = src.includes('/ab-') ? 'Arbeitsbuch' : 'Kursbuch';
  const preview = previews[src as keyof typeof previews];
  const cover = <section className="bookCover fullscreenCover" aria-label={`${book} ${level} cover`}><div className="coverFrame premiumCover">
    <div className="premiumCoverMasthead" lang={language}><button type="button" className="coverLibrary" onClick={() => document.querySelector<HTMLButtonElement>('.lnv-pill')?.click()}>{t('☰ Library')}</button><span className="premiumCoverLevel">{level}</span></div>
    <figure className="premiumCoverArt" style={{backgroundImage: preview ? `url(${preview})` : undefined}}>
      <img className={`coverArtwork${loaded ? ' isLoaded' : ''}`} src={src} alt={alt} loading="eager" decoding="async" fetchPriority="high" onLoad={() => setLoaded(true)} ref={image => {if (image?.complete && image.naturalWidth) setLoaded(true);}}/>
    </figure>
    <div className="premiumCoverEdition" lang="de"><span>{book}</span></div>
    <div className="coverOwner" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="coverByline" style={{direction: language === 'ar' ? 'rtl' : 'ltr'}}>
      <span className="coverSmall" lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'}>{t('with')}</span>
      <h1 lang="ar" dir="rtl">هناوي</h1>
      </div>
      <div className="coverSocials" aria-label={t('Contact and social links')}><CoverSocials/></div>
    </div>
    <button type="button" className="coverOpen" onClick={e => openBookCover(e.currentTarget.closest('.fullscreenCover') as HTMLElement, () => {document.dispatchEvent(new Event('menschen:paper')); window.menschenBook?.turnToPage?.(1);})}>{t('Open book ←')}</button>
    <p className="premiumCoverAudio" lang={language}>{t('Tap any word to listen & explore')}</p>
    <div className="coverCopy" lang={language} dir="ltr">{t('Original book © Hueber Verlag')}<br/>{t('All rights belong to the original owners.')}</div>
  </div></section>;
  return <><div className="coverFrame coverPlaceholder" aria-hidden="true"><button className="coverOpen" hidden/></div>{active && createPortal(cover, document.body)}</>;
}
