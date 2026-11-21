// Live presence: one in-memory Durable Object per book page (room). Students
// on the same page see each other's cursor. No D1, no storage: sockets live
// under the hibernation API and each socket's identity rides in its
// attachment, so an evicted room costs nothing. Only the name/avatar already
// public on the honor list is shared, relayed from the client's own hello.
// Offline/desktop builds never connect, so this is a pure add-on for the
// web app.

type Who = { name: string; avatar: string | null };

type Hello = { type: 'hello'; name?: unknown; avatar?: unknown };
type Move = { type: 'move'; x?: unknown; y?: unknown };
type ClientMessage = Hello | Move | { type: string };

const MAX_NAME = 60;
const MAX_AVATAR = 200_000; // data-URL avatars can be large; cap anyway
const MAX_MSG = 210_000;

function cleanWho(raw: Hello): Who | null {
  if (typeof raw.name !== 'string') return null;
  const name = raw.name.trim().slice(0, MAX_NAME);
  if (!name) return null;
  const avatar = typeof raw.avatar === 'string' && raw.avatar.length <= MAX_AVATAR ? raw.avatar : null;
  return { name, avatar };
}

export class PagePresence implements DurableObject {
  constructor(private readonly ctx: DurableObjectState) {}

  async fetch(request: Request): Promise<Response> {
    if (request.headers.get('Upgrade') !== 'websocket') {
      return new Response('expected websocket', { status: 426 });
    }
    const pair = new WebSocketPair();
    const client = pair[0];
    const server = pair[1];
    const peerId = crypto.randomUUID().slice(0, 8);
    this.ctx.acceptWebSocket(server, [peerId]);
    server.serializeAttachment({ peerId, who: null });
    server.send(JSON.stringify({ type: 'welcome', id: peerId }));
    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer): Promise<void> {
    if (typeof message !== 'string' || message.length > MAX_MSG) return;
    let msg: ClientMessage;
    try {
      msg = JSON.parse(message);
    } catch {
      return;
    }
    const state = ws.deserializeAttachment() as { peerId: string; who: Who | null };

    if (msg.type === 'hello') {
      const who = cleanWho(msg as Hello);
      if (!who) return;
      const wasNamed = !!state.who;
      state.who = who;
      ws.serializeAttachment(state);
      // Tell the newcomer who is already here, then tell everyone else.
      if (!wasNamed) {
        const peers = this.peers(ws).map((p) => p.snapshot());
        ws.send(JSON.stringify({ type: 'peers', peers }));
      }
      this.broadcast(ws, JSON.stringify({ type: 'join', peer: { id: state.peerId, ...who } }));
      return;
    }

    if (msg.type === 'move' && state.who) {
      const m = msg as Move;
      if (typeof m.x !== 'number' || typeof m.y !== 'number') return;
      if (!(m.x >= -1 && m.x <= 2 && m.y >= -1 && m.y <= 2)) return;
      this.broadcast(
        ws,
        JSON.stringify({ type: 'move', id: state.peerId, x: Math.round(m.x * 10000) / 10000, y: Math.round(m.y * 10000) / 10000 }),
      );
    }
  }

  async webSocketClose(ws: WebSocket): Promise<void> {
    this.drop(ws);
  }

  async webSocketError(ws: WebSocket): Promise<void> {
    this.drop(ws);
  }

  private drop(ws: WebSocket): void {
    try {
      const state = ws.deserializeAttachment() as { peerId: string; who: Who | null } | null;
      if (state?.who) this.broadcast(ws, JSON.stringify({ type: 'leave', id: state.peerId }));
      ws.close(1000);
    } catch {
      // already gone
    }
  }

  private peers(except: WebSocket): Array<{ snapshot: () => { id: string } & Who }> {
    const out: Array<{ snapshot: () => { id: string } & Who }> = [];
    for (const socket of this.ctx.getWebSockets()) {
      if (socket === except) continue;
      const state = socket.deserializeAttachment() as { peerId: string; who: Who | null } | null;
      if (!state?.who) continue;
      const { peerId, who } = state;
      out.push({ snapshot: () => ({ id: peerId, name: who.name, avatar: who.avatar }) });
    }
    return out;
  }

  private broadcast(except: WebSocket, payload: string): void {
    for (const socket of this.ctx.getWebSockets()) {
      if (socket === except) continue;
      try {
        socket.send(payload);
      } catch {
        // hibernated or dead socket; close will clean it up
      }
    }
  }
}
