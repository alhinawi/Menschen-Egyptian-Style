// Display-only owner pin. Never writes scores, progress or account data.
// Email identity is checked on the server and must already be verified.
const OWNER_EMAILS = ['alhinaawi@gmail.com','3asfuur@gmail.com'];
// A presentation floor only. Stored exercise totals are never modified.
export const OWNER_DISPLAY_BASE = 120;
export type LeaderboardAccount={id:number;name:string;email:string;email_verified:number;avatar:string|null;data:string|null};
function displayName(full: string): string {
  const parts = full.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'Learner'
  if (parts.length === 1) return parts[0]
  return `${parts[0]} ${[...parts[parts.length - 1]][0]}.`
}

function pointsOf(data: string): number {
  try {
    let n = 0
    const walk = (v: unknown) => {
      // The sync blob's top-level values are JSON strings (one per
      // localStorage key); exercise states live inside those.
      if (typeof v === 'string') {
        try {
          const inner: unknown = JSON.parse(v)
          if (typeof inner === 'object' && inner !== null) walk(inner)
        } catch {
          // plain string setting, no exercises inside
        }
        return
      }
      if (typeof v !== 'object' || v === null) return
      for (const [k, val] of Object.entries(v)) {
        if (k.startsWith('done-') && val === true) n++
        else walk(val)
      }
    }
    walk(JSON.parse(data))
    return n
  } catch {
    return 0
  }
}

export function buildLeaderboard(rows:LeaderboardAccount[],viewerId:number|null){
 const owners=rows.filter(r=>r.email_verified===1&&OWNER_EMAILS.includes(r.email.toLowerCase()));
 const owner=owners.find(r=>r.id===viewerId)||owners.find(r=>r.email.toLowerCase()===OWNER_EMAILS[0])||owners[0];
 // One owner row, not two. Prefer the caller's verified owner account.
 const board=rows.filter(r=>!owners.includes(r)||r===owner).map(r=>({id:r.id,name:r===owner?r.name:displayName(r.name),points:r===owner?Math.max(OWNER_DISPLAY_BASE,pointsOf(r.data||'{}')):pointsOf(r.data||'{}'),avatar:r===owner?r.avatar:null,pinned:r===owner}))
  .sort((a,b)=>Number(b.pinned)-Number(a.pinned)||b.points-a.points||(a.points===0?a.id-b.id:a.name.localeCompare(b.name)||a.id-b.id));
 const mine=board.findIndex(r=>r.id===viewerId);
 return {top:board.slice(0,10).map(({id,...r},i)=>({...r,rank:i+1})),me:viewerId===null?null:{rank:mine>=0?mine+1:board.length+1,points:mine>=0?board[mine].points:0}};
}
