import {ANONYMOUS_AVATAR} from '../auth/anonymous-avatar';
// Leaderboard view inside the account panel: top 10 learners by points
// (checked-off exercises from the real D1 progress rows) plus the signed-in
// learner's own rank when they are outside the top 10.

import {useEffect, useState} from 'react';
import {useUiLanguage} from '../ui-language';
import {getLeaderboard, type LeaderboardRow} from '../auth/api';
import {leaderboardRows, type DisplayLeaderboardRow} from '../auth/leaderboard-starters';

// Inline SVG medals (gold/silver/bronze): no emoji font needed on any device.
const MEDAL_COLORS = ['#c9a227', '#9aa0a6', '#b0773a'];

// While the API is unreachable (e.g. a temporary quota break), remember it
// for a few minutes so reopening the panel shows the calm note straight
// away instead of hammering the API with a request on every open.
const OUTAGE_COOLDOWN_MS = 5 * 60_000;
let boardUnavailableUntil = 0;

function MedalIcon({rank}: {rank: number}) {
  return (
    <svg className="lbMedal" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill={MEDAL_COLORS[rank - 1]} />
      <text x="10" y="14" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#fff">{rank}</text>
    </svg>
  );
}

export function LeaderboardPanel({onClose}: {onClose: () => void}) {
  const {t} = useUiLanguage();
  const [top, setTop] = useState<DisplayLeaderboardRow[] | null>(null);
  const [me, setMe] = useState<{rank: number; points: number} | null>(null);
  const [unavailable, setUnavailable] = useState(() => Date.now() < boardUnavailableUntil);

  useEffect(() => {
    if (Date.now() < boardUnavailableUntil) return;
    let live = true;
    getLeaderboard()
      .then((d) => {
        if (!live) return;
        boardUnavailableUntil = 0;
        setTop(leaderboardRows(d.top,d.me));
        setMe(d.me);
      })
      .catch(() => {
        if (!live) return;
        boardUnavailableUntil = Date.now() + OUTAGE_COOLDOWN_MS;
        setUnavailable(true);
      });
    return () => {
      live = false;
    };
  }, []);

  const row = (r: LeaderboardRow & {avatar?:string}, highlight = false) => (
    <div className={`lbRow${highlight ? ' lbRowMe' : ''}`} key={`${r.rank}-${r.name}`}>
      <span className="lbRank">{r.rank <= 3 ? <MedalIcon rank={r.rank} /> : r.rank}</span>
      <img className="lbAvatar" src={r.avatar || ANONYMOUS_AVATAR} onError={event=>{if(event.currentTarget.src!==ANONYMOUS_AVATAR)event.currentTarget.src=ANONYMOUS_AVATAR}} alt="" />
      <span className="lbName">{r.name}</span>
      <span className="lbPoints">{r.points} {t('points')}</span>
    </div>
  );

  return (
    <div className="leaderboardPanel" role="group" aria-label={t('Leaderboard')}>
      <div className="profileSection">{t('Leaderboard')}</div>
      {unavailable && <div className="lbEmpty">{t('The leaderboard is taking a short break. It will be back soon.')}</div>}
      {!unavailable && top === null && <div className="lbEmpty">{t('Loading')}</div>}
      {!unavailable && top !== null && top.length === 0 && <div className="lbEmpty">{t('No scores yet - be the first!')}</div>}
      {top?.map((r) => row(r, r.own))}
      {me && me.rank > 10 && (
        <>
          <div className="lbDivider" aria-hidden="true">···</div>
          {row({rank: me.rank, name: t('You'), points: me.points}, true)}
        </>
      )}
      <button type="button" className="authSwitch" onClick={onClose}>{t('Back')}</button>
    </div>
  );
}
