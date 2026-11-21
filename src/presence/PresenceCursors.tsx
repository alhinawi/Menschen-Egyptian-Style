// Live cursors: students on the same book page see each other's pointer.
// Connects to the presence Durable Object over WebSocket with the signed-in
// user's name/avatar (the same data the honor list already shows). The
// offline desktop build never mounts this; on any socket failure it stays
// silent and retries on the next page change, so the book keeps working
// without internet at the center.
import { useEffect, useRef, useState } from 'react';
import { DESKTOP } from '../desktop';
import { useAuth } from '../auth/useAuth';
import { apiBase } from '../auth/api';
import { slugFromLocation } from '../navigate';

type Peer = { id: string; name: string; avatar: string | null; x: number; y: number; at: number };

const SEND_MS = 150;
const IDLE_MS = 15000;

function roomNow(): string {
  return slugFromLocation() + '#' + (location.hash.slice(1) || 'cover');
}

export function PresenceCursors() {
  const { status, user } = useAuth();
  const [peers, setPeers] = useState<Record<string, Peer>>({});
  const liveRef = useRef(false);
  liveRef.current = status === 'authed' && !!user && !DESKTOP;

  useEffect(() => {
    if (!liveRef.current) return;
    let ws: WebSocket | null = null;
    let room = '';
    let lastSent = 0;

    const connect = () => {
      const next = roomNow();
      if (ws && next === room && ws.readyState <= WebSocket.OPEN) return;
      room = next;
      setPeers({});
      try { ws?.close(); } catch { /* ignore */ }
      const url = apiBase().replace(/^http/, 'ws') + '/api/presence?room=' + encodeURIComponent(room);
      try { ws = new WebSocket(url); } catch { ws = null; return; }
      ws.onopen = () => {
        const me = liveRef.current ? user : null;
        ws?.send(JSON.stringify({ type: 'hello', name: me?.name, avatar: me?.avatar ?? null }));
      };
      ws.onmessage = (e) => {
        let msg: { type?: string; id?: string; x?: number; y?: number; peer?: Peer; peers?: Peer[] };
        try { msg = JSON.parse(String(e.data)); } catch { return; }
        const now = Date.now();
        if (msg.type === 'peers' && Array.isArray(msg.peers)) {
          setPeers(Object.fromEntries(msg.peers.map((p) => [p.id, { ...p, x: -1, y: -1, at: now }])));
        } else if (msg.type === 'join' && msg.peer) {
          const p = msg.peer;
          setPeers((prev) => ({ ...prev, [p.id]: { ...p, x: -1, y: -1, at: now } }));
        } else if (msg.type === 'move' && msg.id && typeof msg.x === 'number' && typeof msg.y === 'number') {
          const { id, x, y } = msg as { id: string; x: number; y: number };
          setPeers((prev) => (prev[id] ? { ...prev, [id]: { ...prev[id], x, y, at: now } } : prev));
        } else if (msg.type === 'leave' && msg.id) {
          setPeers((prev) => {
            const nextPeers = { ...prev };
            delete nextPeers[msg.id as string];
            return nextPeers;
          });
        }
      };
    };

    connect();
    const watch = setInterval(() => {
      if (roomNow() !== room) connect();
      const cutoff = Date.now() - IDLE_MS;
      setPeers((prev) => {
        const alive = Object.entries(prev).filter(([, p]) => p.at >= cutoff);
        return alive.length === Object.keys(prev).length ? prev : Object.fromEntries(alive);
      });
    }, 1000);

    const onMove = (e: PointerEvent) => {
      const now = Date.now();
      if (!ws || ws.readyState !== WebSocket.OPEN || now - lastSent < SEND_MS) return;
      lastSent = now;
      ws.send(JSON.stringify({ type: 'move', x: e.clientX / innerWidth, y: e.clientY / innerHeight }));
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      clearInterval(watch);
      window.removeEventListener('pointermove', onMove);
      try { ws?.close(); } catch { /* ignore */ }
    };
  }, [status, user?.id, user?.name, user?.avatar]);

  if (!liveRef.current) return null;
  const visible = Object.values(peers).filter((p) => p.x >= 0 && p.y >= 0);
  if (!visible.length) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden" aria-hidden="true">
      {visible.map((p) => (
        <div
          key={p.id}
          className="absolute flex items-center gap-1.5 transition-[left,top] duration-150 ease-linear"
          style={{ left: p.x * innerWidth, top: p.y * innerHeight }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" className="drop-shadow" fill="#6d3b47" stroke="#fff" strokeWidth="1.2">
            <path d="M4 3l7 17 2.5-7.5L21 10z" />
          </svg>
          <span className="flex items-center gap-1 rounded-full bg-[#6d3b47] py-0.5 pl-1 pr-2 text-[11px] font-semibold text-white shadow">
            {p.avatar ? (
              <img src={p.avatar} alt="" className="h-4 w-4 rounded-full object-cover" />
            ) : null}
            {p.name}
          </span>
        </div>
      ))}
    </div>
  );
}
