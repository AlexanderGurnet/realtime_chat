# realtime_chat

(Click here to visit app)[https://realtime-chat-psi-six.vercel.app/]

Private, self‑destructing chat built with Next.js + Upstash Realtime + Redis.

- Frontend: Next.js (app router, React 19)
- Realtime: Upstash Realtime
- API: Elysia routes under /api
- Storage: Upstash Redis

Quick highlights

- Rooms auto-expire (TTL ~10 minutes)
- Max 2 participants per room (enforced by middleware proxy)
- Messages stored in Redis list per room and masked per-client
- Room destroy emits `chat.destroy` to clients and deletes room data

Environment

- UPSTASH_REDIS_REST_URL
- UPSTASH_REDIS_REST_TOKEN
  Add them to `.env` (example present in repo).

Important routes

- POST /api/room/create -> create room (returns roomId)
- GET /api/room/ttl?roomId=... -> remaining TTL
- DELETE /api/room?roomId=... -> destroy room (emits destroy event)
- POST /api/messages?roomId=... -> send message
- GET /api/messages?roomId=... -> fetch message history
- GET /api/realtime -> Upstash realtime handler

How auth works

- Proxy (src/proxy.ts) sets an `auth-token` cookie when visiting /room/:roomId
- Proxy enforces room membership and max 2 peers
- API auth middleware checks `meta:{roomId}.connected` for valid token

Run locally

1. Copy .env and fill Upstash values
2. npm install
3. npm run dev
4. Open http://localhost:3000

Scripts

- npm run dev
- npm run build
- npm start
- npm run lint

Deploy

- Works on Vercel (ensure Upstash env vars are configured).
- Proxy middleware relies on Next middleware support in the platform.
