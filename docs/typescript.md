# TypeScript

## Compiler Settings
TypeScript is configured in `tsconfig.json` with `"strict": true`. All strict checks are enforced — do not disable individual strict flags.

## General Rules
- **No `any`** — use `unknown` and narrow the type, or define an explicit interface/type.
- **No non-null assertion (`!`)** unless you can prove the value is non-null at that point and adding a null-check would be redundant noise.
- **No type casting with `as`** unless interfacing with an untyped third-party API and the cast is unavoidable. Document why with a comment.
- Keep types as narrow as possible. Prefer `"GET" | "POST"` over `string`.

## Path Alias
Always use the `@/*` alias. See [docs/project-structure.md](./project-structure.md).

## Typing React Components
Use explicit return types only for exported components. For local sub-components, inference is fine.

```ts
// Props interface — prefer interface over type alias for object shapes
interface ShortLinkCardProps {
  slug: string
  url: string
  clickCount: number
}

export function ShortLinkCard({ slug, url, clickCount }: ShortLinkCardProps) {
  // ...
}
```

- Extend HTML element props with `React.ComponentProps<"div">` (or `React.HTMLAttributes<HTMLDivElement>`) when wrapping native elements.
- Spread `...props` to the underlying element so consumers can pass arbitrary HTML attributes.

## Drizzle Types
Infer insert/select types from the schema:

```ts
import type { InferSelectModel, InferInsertModel } from "drizzle-orm"
import { linksTable } from "@/db/schema"

type Link = InferSelectModel<typeof linksTable>
type NewLink = InferInsertModel<typeof linksTable>
```

Never define manual interfaces that duplicate Drizzle schema shapes.

## Server Action Signatures
Server Actions must only accept and return serialisable types (primitives, plain objects, arrays). Do not pass class instances, `Date` objects, or `Map`/`Set` across the Server Action boundary.

## Enums
Prefer `const` objects over TypeScript `enum`:

```ts
// preferred
export const LinkStatus = {
  Active: "active",
  Inactive: "inactive",
} as const
export type LinkStatus = (typeof LinkStatus)[keyof typeof LinkStatus]

// avoid
enum LinkStatus { Active = "active", Inactive = "inactive" }
```

## Imports
- Use `import type` for type-only imports.
- Group imports: external packages → internal `@/` aliases → relative `./ ../` (should be rare).

```ts
import { eq } from "drizzle-orm"
import type { Metadata } from "next"

import { db } from "@/db"
import { linksTable } from "@/db/schema"
import type { Link } from "@/lib/types"
```
