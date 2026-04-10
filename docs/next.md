# Next.js Conventions

> **Warning:** This project uses Next.js 16. APIs, file conventions, and behaviour differ significantly from earlier versions. Before writing any Next.js code, check `node_modules/next/dist/docs/` for the authoritative reference. Do not rely on training-data knowledge of Next.js 13–15.

## App Router Only
All routes live under `app/`. The Pages Router does not exist in this project and must never be introduced.

## Server Components by Default
Every component created under `app/` is a React Server Component (RSC) unless the file starts with `"use client"`. Only add `"use client"` when the component requires:
- `useState` / `useReducer` / `useEffect` / other React hooks
- Browser-only APIs (`window`, `document`, etc.)
- Event handlers attached in JSX (`onClick`, `onChange`, etc.)

Push `"use client"` boundaries as deep into the component tree as possible.

## Route Segments
| File | Purpose |
|---|---|
| `page.tsx` | Publicly accessible route UI |
| `layout.tsx` | Shared UI shell wrapping child segments |
| `loading.tsx` | Streaming skeleton / suspense boundary |
| `error.tsx` | Error boundary UI (`"use client"` required) |
| `not-found.tsx` | 404 UI |
| `route.ts` | API route handler (no JSX) |

## Data Fetching
- Fetch data directly in Server Components using `async/await`. Never use SWR or React Query for server-fetched data.
- Use `cache()` from React for request-level deduplication when the same data is fetched in multiple components.
- Prefer Server Actions (defined with `"use server"`) over API routes for mutations from the client.

## Server Actions
```ts
// app/dashboard/actions.ts
"use server"

import { db } from "@/db"
import { linksTable } from "@/db/schema"

export async function createShortLink(slug: string, url: string) {
  return db.insert(linksTable).values({ slug, url })
}
```
- Always mark Server Action files with `"use server"` at the top.
- Validate all inputs at the action boundary before touching the database.
- Return plain serialisable objects — no class instances, no `Error` objects across the boundary.

## Metadata
Define metadata with the `Metadata` type from `next`:
```ts
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "...",
  description: "...",
}
```
Do not use `<Head>` — it does not exist in the App Router.

## Images
Use `next/image` (`<Image>`) for all images. Never use raw `<img>` tags.

## Navigation
Use `next/link` (`<Link>`) for all internal navigation. Never use raw `<a>` tags for internal links. Programmatic navigation uses `useRouter` from `next/navigation` (not `next/router`).

## Dynamic Routes
```
app/[slug]/page.tsx   — single dynamic segment
app/[...rest]/page.tsx — catch-all segment
```
Access params via `props.params` in the page component (typed as `Promise<{ slug: string }>` in Next.js 16 — always `await` params).

## Redirects & Short-Link Resolution
Short-link resolution happens in `app/[slug]/page.tsx` (or a `route.ts` if a pure redirect is preferred). Use `redirect()` from `next/navigation` for server-side redirects.
