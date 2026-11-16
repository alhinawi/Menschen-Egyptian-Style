import type {LeaderboardRow} from './api';
import {presetSvg} from './avatar-presets';

// Presentation-only launch content. Never written into accounts or progress.
// Turn off at launch without deleting or changing any learner data.
export const STARTER_ENTRIES_ENABLED = true;
const NAMES = ['أحمد حسن','مريم عادل','عمر محمود','نور أحمد','يوسف إبراهيم','سارة خالد','كريم مصطفى','آية محمد','حسن علي','فاطمة سامي'];
const SCORES = [96,84,73,65,57,48,39,28,19,12];
export type DisplayLeaderboardRow = LeaderboardRow & {avatar: string; own: boolean};
export function leaderboardRows(top: LeaderboardRow[], me: {rank: number; points: number}|null, realCount = top.length, enabled = STARTER_ENTRIES_ENABLED): DisplayLeaderboardRow[] {
  const count = enabled ? Math.max(0,10-Math.max(realCount,top.length)) : 0;
  const real = top.map((r,i)=>({...r,avatar:'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(presetSvg(i)),own:me?.rank===r.rank,source:i}));
  const starters = NAMES.slice(0,count).map((name,i)=>({rank:0,name,points:SCORES[i],avatar:i<7?`assets/leaderboard-profile-${i+1}.webp`:'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(presetSvg(i+2)),own:false,source:10+i}));
  return [...real,...starters].sort((a,b)=>b.points-a.points||a.source-b.source).slice(0,10).map((r,i)=>({...r,rank:i+1}));
}
