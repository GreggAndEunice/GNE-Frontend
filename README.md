# Couples App Frontend

React (JS) + Vite + Tailwind v4 + Framer Motion + TanStack Query + Axios + react-hot-toast.

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and set `VITE_API_URL` to your backend's `/api/v1` URL.
3. `npm run dev`

## How it fits together
- **Auth**: `useMe()` (TanStack Query) calls `GET /auth/me` on load. `ProtectedRoute` redirects to `/login` if it fails. Login/logout are mutations that update the `["me"]` cache directly — no manual token handling, the httpOnly cookie set by the backend does the work.
- **Caching**: messages/posts are fetched once and cached (`staleTime: 60s`). Creating/editing/deleting invalidates the relevant query so the list refetches automatically — no manual refresh needed anywhere.
- **Grouping**: messages already have `month`/`year`; posts don't, so their group is derived from `createdAt`. Grouping happens client-side in `lib/groupByMonth.js` from the already-cached list — no extra network calls.
- **"Infinite scroll"**: since the backend returns full lists (no pagination), `useLoadMore` renders a growing slice of the already-fetched, already-grouped list and grows it via an `IntersectionObserver` sentinel — so it feels like infinite scroll without needing backend pagination. If your data grows into the thousands, revisit this with real backend pagination (`?page=&limit=`).
- **Lazy images**: `LazyImage` only sets `src` once the element is within 150px of the viewport, and fades in on load — keeps big grids fast.
- **Ownership/roles**: `canManage` on each card checks `user.role === "admin" || item.userId === user.id`, matching the backend's own authorization checks — the UI hides buttons for actions that would 403 anyway, but the backend is still the real gate.

## Security notes
- Auth token lives only in an httpOnly cookie (set by the backend) — never touched by JS, so it can't be read by an XSS payload.
- All form inputs are validated client-side for a good UX, but the **backend re-validates everything** with zod — never trust the client.
- User-generated text (`title`, `content`, names) is rendered as plain React children, never `dangerouslySetInnerHTML`, so React auto-escapes it — no stored XSS from message/post content.
- Since the cookie is cross-site (`sameSite: none` in production), consider adding CSRF protection (e.g. a custom header the backend checks, like `X-Requested-With`) if you want extra hardening beyond `sameSite`/`secure` — not included here to keep things simple, but worth adding before this holds anything truly sensitive.
