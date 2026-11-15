// Leaderboard view inside the account panel: top 10 learners by points
// (checked-off exercises from the real D1 progress rows) plus the signed-in
// learner's own rank when they are outside the top 10.

import {useEffect, useState} from 'react';
import {useUiLanguage} from '../ui-language';
import {getLeaderboard, type LeaderboardRow} from '../auth/api';

const MEDALS = ['🥇', '🥈', '🥉'];

export function LeaderboardPanel({onClose}: {onClose: () => void}) {
  const {t} = useUiLanguage();
  const [top, setTop] = useState<LeaderboardRow[] | null>(null);
  const [me, setMe] = useState<{rank: number; points: number} | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let live = true;
    getLeaderboard()
      .then((d) => {
        if (!live) return;
        setTop(d.top);
        setMe(d.me);
      })
      .catch(() => live && setError(true));
    return () => {
      live = false;
    };
  }, []);

  const row = (r: LeaderboardRow, highlight = false) => (
    <div className={`lbRow${highlight ? ' lbRowMe' : ''}`} key={`${r.rank}-${r.name}`}>
      <span className="lbRank">{r.rank <= 3 ? MEDALS[r.rank - 1] : r.rank}</span>
      <span className="lbName">{r.name}</span>
      <span className="lbPoints">{r.points} {t('points')}</span>
    </div>
  );

  return (
    <div className="leaderboardPanel" role="group" aria-label={t('Leaderboard')}>
      <div className="profileSection">{t('Leaderboard')}</div>
      {error && <div className="authError" role="alert">{t('Connection problem. Please try again.')}</div>}
      {!error && top === null && <div className="lbEmpty">{t('Loading')}</div>}
      {!error && top !== null && top.length === 0 && <div className="lbEmpty">{t('No scores yet - be the first!')}</div>}
      {top?.map((r) => row(r, me?.rank === r.rank))}
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
