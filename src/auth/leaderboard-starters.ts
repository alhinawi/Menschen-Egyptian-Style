import type {LeaderboardRow} from './api';
import {ANONYMOUS_AVATAR} from './anonymous-avatar';

// Presentation-only launch content. Never written into accounts or progress.
// Every real row reserves a slot, including zero-point newcomers at the end.
// Turn off at launch without deleting or changing any learner data.
export const STARTER_ENTRIES_ENABLED = true;
const NAMES = ['Ahmed Hassan','Maryam Adel','Omar Mahmoud','Nour Ahmed','Youssef Ibrahim','Sara Khaled','Karim Mostafa','Aya Mohamed','Hassan Ali','Fatma Samy'];
// Keep anonymous starters scattered without changing names, scores or ranking.
const STARTER_PHOTOS = [1,null,3,4,5,null,7,2,null,6];
const SCORES = [96,84,73,65,57,48,39,28,19,12];
export type DisplayLeaderboardRow = LeaderboardRow & {avatar: string; own: boolean};
export function leaderboardRows(top: LeaderboardRow[], me: {rank: number; points: number}|null, realCount = top.length, enabled = STARTER_ENTRIES_ENABLED): DisplayLeaderboardRow[] {
  const count = enabled ? Math.max(0,10-Math.max(realCount,top.length)) : 0;
  const real = top.map((r,i)=>({...r,avatar:r.avatar||ANONYMOUS_AVATAR,own:me?.rank===r.rank,source:i}));
  const starters = NAMES.slice(0,count).map((name,i)=>({rank:0,name,points:SCORES[i],avatar:STARTER_PHOTOS[i]?`assets/leaderboard-profile-${STARTER_PHOTOS[i]}.webp`:ANONYMOUS_AVATAR,own:false,pinned:false,source:10+i}));
  return [...real,...starters].sort((a,b)=>Number(!!b.pinned)-Number(!!a.pinned)||b.points-a.points||a.source-b.source).slice(0,10).map((r,i)=>({...r,rank:i+1}));
}
