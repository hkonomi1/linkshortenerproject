---
description: Rules and conventions for writing server actions in this project. Read this before implementing any data mutation logic.
---

# Server Actions

All data mutations in this project **must** be performed via Next.js Server Actions. No other mutation pattern (Route Handlers, direct client-side DB calls, etc.) is permitted.

---

## Rules

1. **Server Actions only for mutations.** Any create, update, or delete operation must go through a Server Action.
2. **Called from Client Components only.** Server Actions must be invoked from components marked `"use client"`. Never call a Server Action from a Server Component.
3. **File naming and colocation.** Every Server Action file must be named `actions.ts` and placed in the same directory as the Client Component that calls it.
4. **No `FormData`.** Do not accept or use the `FormData` TypeScript type as a parameter. Define explicit TypeScript types for all inputs.
5. **Validate all inputs with Zod.** Every Server Action must validate its arguments using a Zod schema before doing anything else.
6. **Auth check before DB access.** Every Server Action must verify a logged-in user (via Clerk's `auth()`) before performing any database operation. Return early with an error object if no user is found.
7. **Use `/data` helper functions for all DB operations.** Server Actions must never call Drizzle queries directly. Delegate all database access to the typed helper functions in the `/data` directory.
8. **Never throw errors.** Server Actions must not throw. Always return a typed result object with either a `success` property or an `error` property (a user-facing message string).

---

## File Structure

```
app/
  dashboard/
    some-feature/
      SomeFeatureForm.tsx   ← "use client" component
      actions.ts            ← Server Actions for this feature
data/
  links.ts                  ← Drizzle query helpers (used by actions)
```

---

## Server Action Template

```ts
// app/dashboard/some-feature/actions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { someDataHelper } from "@/data/links";

const inputSchema = z.object({
  url: z.string().url(),
  slug: z.string().min(1).max(50),
});

type ActionInput = z.infer<typeof inputSchema>;

export async function createLinkAction(input: ActionInput) {
  // 1. Auth check
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  // 2. Validate input
  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "Invalid input" };
  }

  // 3. Delegate to /data helper — never use drizzle directly here
  try {
    const result = await someDataHelper({ ...parsed.data, userId });
    return { success: true, data: result };
  } catch {
    return { error: "Something went wrong" };
  }
}
```

---

## Checklist

| Requirement | Detail |
|---|---|
| File named `actions.ts` | Colocated with the calling Client Component |
| `"use server"` directive | At the top of every `actions.ts` file |
| Explicit TypeScript input types | No `FormData`, no `any` |
| Zod validation | Applied before any logic runs |
| Auth check via `auth()` | Before any database operation |
| DB via `/data` helpers only | No raw Drizzle queries inside actions |
| Return `{ error }` or `{ success }` | Never throw — always return a result object |
