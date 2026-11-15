import {normalizeEnglishKey} from './english-glosses';
// Simple learner-friendly explanations, never the original text repeated as
// a supposed translation. Missing entries stay explicitly unavailable.
export const GERMAN_GLOSSES:Record<string,string>={
 'hallo':'So begrüßt man jemanden.',
 'tschüs':'Das sagt man beim Abschied zu Freunden oder Bekannten.',
 'name':'So heißt eine Person, zum Beispiel Nicole oder Paco.',
 'vorname':'Der persönliche Name, zum Beispiel Nicole.',
 'familienname':'Der gemeinsame Name einer Familie, zum Beispiel Rodriguez.',
 'woher':'Mit diesem Wort fragt man nach der Herkunft.',
 'herkunft':'Das Land oder der Ort, aus dem jemand kommt.',
 'danke':'Das sagt man, wenn man sich bedankt.',
 'sprechen':'Mit der Stimme Wörter und Sätze sagen.',
 'hören':'Mit den Ohren einen Ton oder eine Stimme wahrnehmen.',
 'buchstabieren':'Die Buchstaben eines Wortes einzeln sagen.',
 'und wer bist du':'Die Person fragt nach deinem Namen.',
 'wie heißt du':'Die Person möchte deinen Namen wissen.',
 'woher kommst du':'Die Person fragt nach deinem Heimatland oder Heimatort.',
 'ich komme aus mexiko':'Mexiko ist mein Heimatland.',
 'gut, danke':'Mir geht es gut. Ich bedanke mich für die Frage.',
 'wie geht es ihnen':'So fragt man höflich, ob es einer Person gut geht.',
};
export function germanGloss(text:string){return GERMAN_GLOSSES[normalizeEnglishKey(text)];}
