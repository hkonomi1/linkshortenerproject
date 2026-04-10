# Project Structure

## Root Layout
```
app/                  # Next.js App Router — all routes live here
  globals.css         # Tailwind v4 entry point; all CSS custom properties
  layout.tsx          # Root layout: ClerkProvider, fonts, global shell
  page.tsx            # Home route (/)
components/
  ui/                 # shadcn/ui scaffolded primitives — do not hand-edit
db/
  index.ts            # Drizzle client instance (singleton export `db`)
  schema.ts           # All Drizzle table definitions
docs/                 # Agent/LLM instruction reference files (this folder)
drizzle/              # Auto-generated migration SQL (do not edit manually)
lib/
  utils.ts            # `cn()` helper only
public/               # Static assets
```

## Path Alias
`@/*` maps to the repository root. Always use `@/` imports — never relative `../` imports.

```ts
// correct
import { db } from "@/db"
import { cn } from "@/lib/utils"

// wrong
import { db } from "../../db"
```

## Naming Conventions
| Artifact | Convention | Example |
|---|---|---|
| React components | PascalCase file + export | `components/ui/button.tsx` → `Button` |
| Route segments | kebab-case directories | `app/dashboard/short-links/page.tsx` |
| Server Actions | camelCase, verb-first | `createShortLink`, `deleteShortLink` |
| DB table files | `db/schema.ts` (single file) until complexity demands splitting | — |
| Utility helpers | `lib/<domain>.ts` | `lib/utils.ts` |
| Hooks | `hooks/use-<name>.ts` | `hooks/use-short-link.ts` |

## Co-location Rule
Keep Server Actions with the route or feature they serve. Place them in a `actions.ts` file adjacent to the `page.tsx` that uses them, or in a top-level `lib/actions/` for shared mutations.

## Environment Variables
All secrets go in `.env.local` (never committed). Reference them exclusively as `process.env.VARIABLE_NAME` — do not destructure or re-export them.

Required variables:
- `DATABASE_URL` — Neon PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
