import germanUi from './german-ui.json';
import {useSyncExternalStore} from 'react';

export type UiLanguage = 'ar' | 'en' | 'de';
const KEY = 'menschen-ui-language';
const listeners = new Set<() => void>();
function saved(): UiLanguage {try {const value=localStorage.getItem(KEY);return value==='en'||value==='de'?value:'ar';} catch {return 'ar';}}
let language: UiLanguage = saved();
export const getUiLanguage = () => language;
export function setUiLanguage(next: UiLanguage) {
  if (!['ar','en','de'].includes(next)) return;
  language = next;
  try {localStorage.setItem(KEY, next);} catch { /* usable even in private mode */ }
  document.documentElement.lang = next === 'ar' ? 'ar-EG' : next;
  document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dataset.uiLanguage = next;
  listeners.forEach(fn => fn());
}
export function subscribeUiLanguage(fn: () => void) {listeners.add(fn); return () => {listeners.delete(fn);};}
export function useUiLanguage() {
  const current = useSyncExternalStore(subscribeUiLanguage, getUiLanguage, getUiLanguage);
  return {language: current, t: (text: string) => uiText(text, current), setLanguage: setUiLanguage};
}

// UI copy only. Book exercises, German words and their Egyptian translations
// are learning content and must never pass through this dictionary.
export const UI_COPY: [string, string][] = [
 ['German','الألمانية'], ['German explanation is not available for this text yet.','الشرح الألماني للنص ده لسه مش جاهز.'],
 ['Follow UI','لغة الواجهة'],
 ['Translation language','لغة الترجمة'], ['Follow interface language','نفس لغة الواجهة'], ['Arabic','العربية'], ['English','الإنجليزية'],
 ['English translation is not available for this text yet.','الترجمة الإنجليزية للنص ده لسه مش جاهزة.'],
 ['Account & settings','الحساب والإعدادات'], ['Settings','الإعدادات'], ['Account','الحساب'],
 ['Sound','الصوت'], ['On','شغال'], ['Off','مقفول'], ['Feedback voices','أصوات الناس'],
 ['Voice comments on your answers','تعليقات صوتية مع نتيجة الحل'], ['Language','اللغة'],
 ['Sign out','تسجيل الخروج'], ['Sign in with Google','الدخول بحساب Google'], ['or with email','أو بالبريد'],
 ['Name','الاسم'], ['Email','البريد الإلكتروني'], ['Password','كلمة السر'], ['Password (at least 8 characters)','كلمة سر (8 أحرف على الأقل)'],
 ['One moment…','لحظة…'], ['Sign in','تسجيل الدخول'], ['Create account','إنشاء الحساب'],
 ['New here? Create an account','لسه ماعندكش حساب؟ سجّل جديد'], ['Already have an account? Sign in','عندك حساب بالفعل؟ ادخل'],
 ['Incorrect email or password','البريد أو كلمة السر مش صح'],
 ['Check your details: a name of at least 2 characters, a valid email and a password of at least 8 characters','راجع البيانات: اسم من حرفين، بريد صحيح، وكلمة سر 8 أحرف على الأقل'],
 ['Connection problem. Please try again.','حصلت مشكلة في الاتصال. جرّب تاني.'],
 ['Progress saved & synced','تقدمك محفوظ ومتزامن'], ['Syncing your progress…','بيزامن تقدمك…'], ['Sync failed - will retry','المزامنة فشلت - هنحاول تاني'],
 ['Leaderboard','المتصدرين'], ['points','نقطة'], ['You','انت'], ['No scores yet - be the first!','لسه مفيش نتايج - كون أول واحد!'],
 ['Please verify your email address','أكّد بريدك الإلكتروني لو سمحت'], ['Resend verification email','ابعت إيميل التأكيد تاني'], ['Verification email sent','إيميل التأكيد اتبعت'],
 ['Email verified','تم تأكيد بريدك الإلكتروني'], ['Verification link expired or invalid','لينك التأكيد منتهي أو غلط'],
 ['Profile photo','الصورة الشخصية'], ['Change profile photo','غيّر صورتك'], ['Upload photo','ارفع صورة'], ['Use Google photo','استخدم صورة جوجل'], ['Remove photo','امسح الصورة'], ['Choose avatar','اختار صورة رمزية'], ['Crop photo','قص الصورة'], ['Zoom','تكبير'], ['Save photo','احفظ الصورة'], ['Back','رجوع'],
 ['Library','المكتبة'], ['☰ Library','☰ المكتبة'], ['CHOOSE YOUR BOOK','اختار كتابك'], ['Close menu','اقفل القائمة'],
 ['Cover','الغلاف'], ['Guide','الدليل'], ['Imprint','بيانات النشر'], ['Inside back cover','داخل الغلاف الخلفي'], ['Inside cover','داخل الغلاف'], ['Back cover','الغلاف الخلفي'],
 ['pp.','ص'], ['All pages','كل الصفحات'], ['EXTRAS','صفحات إضافية'], ['Page navigation','التنقل بين الصفحات'],
 ['Coursebook · 24 lessons','كتاب الدروس · 24 درس'], ['Workbook · 24 lessons','كتاب التمارين · 24 درس'],
 ['Previous page','الصفحة اللي قبلها'], ['Next page','الصفحة اللي بعدها'], ['Zoom in','تكبير'], ['Zoom out','تصغير'], ['Fit page','الصفحة كاملة'], ['Fit','ملاءمة'], ['Original ↗','الأصل ↗'],
 ['Turn sound off','اقفل الصوت'], ['Turn sound on','شغّل الصوت'], ['Loading','بيحمّل'],
 ['Word','كلمة'], ['Sentence','جملة'], ['Translate: Word','ترجمة كلمة'], ['Translate: Sentence','ترجمة جملة'],
 ['Translate selection and listen','ترجم التحديد واسمعه'], ['Translate again','ترجم تاني'], ['♫ Listen','♫ اسمع'], ['Close','اقفل'],
 ['Reset all answers on this page','امسح كل إجابات الصفحة دي'], ['Reset page','مسح إجابات الصفحة'], ['Reset page answers','مسح إجابات الصفحة'],
 ['Clear all answers and results on this page only?','تمسح كل الإجابات والنتايج في الصفحة دي بس؟'], ['Cancel','إلغاء'], ['Reset','امسح'],
 ['with','مع'], ['Interactive Edition','النسخة التفاعلية'], ['An interactive edition with','نسخة تفاعلية مع'], ['Open book ←','افتح الكتاب ←'],
 ['Tap any word to listen & explore','اضغط على أي كلمة عشان تسمعها وتعرف معناها'],
 ['Interactive edition of the original book © Hueber Verlag','نسخة تفاعلية من الكتاب الأصلي © Hueber Verlag'],
 ['Original book © Hueber Verlag','الكتاب الأصلي © Hueber Verlag'], ['All rights belong to the original owners.','كل الحقوق لأصحاب الكتاب الأصلي.'],
 ['Contact and social links','التواصل وحسابات هناوي'], ['Audio player','مشغّل الصوت'], ['Playback time','وقت التشغيل'],
 ['Tap a word for its Egyptian Arabic meaning · Zoom in to read · Swipe to turn the page','اضغط على الكلمة لمعناها بالمصري · كبّر للقراءة · اسحب يمين أو شمال للتقليب'],
 ['MENSCHEN · INTERACTIVE EDITION','MENSCHEN · النسخة التفاعلية'],
 ['How to use the book','إزاي تستخدم الكتاب'], ['Turn the pages','اقلب الصفحات'],
 ['Swipe anywhere: the page follows your finger and turns like paper','اسحب من أي حتة، الصفحة هتتبع صوابعك وتتقلب زي الورق'],
 ['Hear the pronunciation','اسمع النطق'], ['Tap a sentence to hear it straight away','دوس على أي جملة تسمع نطقها على طول'],
 ['Play the audio','شغّل الصوت'], ['Tap each','اضغط على كل'], ['in the lesson to hear the book recordings','في الدرس عشان تسمع صوتيات الكتاب'],
 ['Translate any word','ترجم أي كلمة'], ['Tap a word to see its Egyptian Arabic meaning instantly','دوس على الكلمة ومعناها بالمصري هيظهر فورًا'],
 ['Translate a whole sentence','ترجم جملة كاملة'], ['Use the translation button below to switch between words and sentences','من زرار «ترجمة» اللي تحت، بدّل بين كلمة أو جملة كاملة'],
 ['Practise','اتمرن'], ['Exercises check your answers: green means correct','التمارين بتصحح نفسها، والأخضر معناه صح'],
 ['Check your answers','صحّح بنفسك'], ['After answering, tap ✓ to check the exercise','بعد ما تحل، دوس على ✓ والتمرين هيصححلك على طول'],
 ['Go to any lesson','روح لأي درس'], ['Switch lessons and books from the menu above','بدّل بين الدروس والكتب من القايمة اللي فوق'],
 ['Audio uses the original recording when available, and a generated voice otherwise.','الصوت في النسخة دي: النطق بيتشغّل بالتسجيل الأصلي لما يكون موجود، وبصوت مولّد تلقائيًا لما يكونش.'],
 ['Could not open the lesson. Please refresh the page.','تعذّر فتح الدرس. جرّب تحديث الصفحة.'],
];
const toArabic = new Map(UI_COPY), toEnglish = new Map(UI_COPY.map(([en, ar]) => [ar, en]));
export function uiText(text: string, lang: UiLanguage = language): string {
  const trimmed = text.trim();
  const aliases: Record<string,string> = {'Coursebook · 24 Lektionen':'Coursebook · 24 lessons','Workbook · 24 Lektionen':'Workbook · 24 lessons'};
  const fromGerman=new Map(Object.entries(germanUi).map(([en,de])=>[de,en]));
  const en = aliases[trimmed] ?? toEnglish.get(trimmed) ?? fromGerman.get(trimmed) ?? trimmed;
  let translated = lang === 'ar' ? toArabic.get(en) ?? en : lang === 'de' ? (germanUi as Record<string,string>)[en] ?? en : en;
  // Dynamic UI labels, never book content.
  const patterns: [RegExp, (m: RegExpMatchArray) => string][] = lang === 'ar' ? [
    [/^Choose page, current page (.+)$/, m => `اختار صفحة، الصفحة الحالية ${uiText(m[1], lang)}`],
    [/^Reset page (.+)\?$/, m => `تمسح إجابات صفحة ${m[1]}؟`],
    [/^(.+) - jump to any page$/, m => `${m[1]} - اختار أي صفحة`],
    [/^(.+) \(unnumbered\)$/, m => `${uiText(m[1], lang)} (من غير رقم)`],
    [/^(Play|Pause|Seek) (.+)$/, m => `${({Play:'تشغيل',Pause:'إيقاف مؤقت',Seek:'تقديم وتأخير'} as Record<string,string>)[m[1]]} ${m[2]}`],
  ] : lang === 'de' ? [
    [/^Choose page, current page (.+)$/,m=>`Seite wählen, aktuelle Seite ${uiText(m[1],lang)}`],
    [/^Reset page (.+)\?$/,m=>`Seite ${m[1]} zurücksetzen?`],
    [/^(.+) - jump to any page$/,m=>`${m[1]} - zu einer Seite springen`],
    [/^(.+) \(unnumbered\)$/,m=>`${uiText(m[1],lang)} (ohne Seitenzahl)`],
    [/^(Play|Pause|Seek) (.+)$/,m=>`${({Play:'Abspielen',Pause:'Pausieren',Seek:'Spulen'} as Record<string,string>)[m[1]]} ${m[2]}`],
  ] : [];
  for (const [pattern, render] of (toArabic.has(en) ? [] : patterns)) {const match = en.match(pattern); if (match) {translated = render(match); break;}}
  if (/^Lektion \d+$/.test(en)) translated = en.replace('Lektion', lang === 'ar' ? 'الدرس' : lang === 'de' ? 'Lektion' : 'Lesson');
  if (/^pp\. /.test(en)) translated = en.replace('pp.', lang === 'ar' ? 'ص' : lang === 'de' ? 'S.' : 'pp.');
  if (translated === en && lang !== 'en') {
    translated = en.replace(/(KB|AB) (A1\.[12]) · (Cover|Guide)/g, (_, book, level, label) => `${book} ${level} · ${uiText(label, lang)}`);
  }
  return text.replace(trimmed, translated);
}

/** Legacy adapters rebuild the shell between lessons and update labels on
 * flips. Localize only named UI islands, never the printed .page subtree. */
export function installUiLanguage() {
  setUiLanguage(language);
  const roots = 'header:not(.page header),.controls,.helpBanner,.lnv-overlay,.fullscreenCover,.meaningHeader,.pronounceButton,.machineRetry,.selectionMeaningAction,.readerAudioPlayer,.pageResetDialog,.howtoPage';
  const originals = new WeakMap<Node, {source: string; output: string}>();
  const attributes = new WeakMap<Element, Map<string, {source: string; output: string}>>();
  function localize() {
    for (const root of document.querySelectorAll<HTMLElement>(roots)) {
      if (root.matches('.howtoPage,.helpBanner')) {root.dir = language === 'ar' ? 'rtl' : 'ltr'; root.lang = language;}
      if (root.closest('.page') && !root.closest('.fullscreenCover,.howtoPage')) continue;
      // React profile and cover components translate their own copy.
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const parent = node.parentElement;
        if (!parent || parent.closest('.profilePanel,.fullscreenCover,script,style')) continue;
        const value = node.nodeValue || '';
        const old = originals.get(node);
        const source = old && value === old.output ? old.source : value;
        const output = uiText(source);
        originals.set(node, {source, output});
        if (value !== output) node.nodeValue = output;
      }
      for (const element of [root, ...root.querySelectorAll<HTMLElement>('*')]) {
        if (element.closest('.profilePanel,.fullscreenCover')) continue;
        let saved = attributes.get(element); if (!saved) {saved = new Map(); attributes.set(element, saved);}
        for (const attr of ['aria-label','title','placeholder']) {
          const value = element.getAttribute(attr); if (!value) continue;
          const old = saved.get(attr), source = old && value === old.output ? old.source : value;
          const output = uiText(source); saved.set(attr, {source, output});
          if (value !== output) element.setAttribute(attr, output);
        }
      }
    }
  }
  let queued = false;
  const queue = () => {if (queued) return; queued = true; queueMicrotask(() => {queued = false; localize();});};
  new MutationObserver(records => {
    if (records.some(r => {
      const el = r.target instanceof Element ? r.target : r.target.parentElement;
      return !!el && (!!el.closest(roots) || (r.type === 'childList' && [...r.addedNodes].some(n => n instanceof Element && (n.matches(roots) || n.querySelector(roots)))));
    })) queue();
  }).observe(document.body, {subtree:true, childList:true, characterData:true, attributes:true, attributeFilter:['aria-label','title','placeholder']});
  subscribeUiLanguage(queue);
  window.addEventListener('storage', event => {if (event.key === KEY || event.key === null) setUiLanguage(saved());});
  localize();
}
