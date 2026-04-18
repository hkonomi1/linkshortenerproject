---
description: This file describes the authentication rules for the project. Read this before implementing any authentication-related features.
---

# Authentication — Clerk

This project uses **Clerk (`@clerk/nextjs` v7)** as the sole authentication provider. No other auth method — custom sessions, JWTs, NextAuth, or otherwise — may be introduced.

---

## Rules

1. **Clerk only.** Never implement custom session logic, cookie-based auth, or any third-party auth library. Rule 8 in `AGENTS.md` is absolute.
2. **`ClerkProvider` wraps the app** in `app/layout.tsx`. Do not add a second provider or move it.
3. **Sign-in and sign-up always open as a modal.** Pass `mode="modal"` to every `<SignInButton>` and `<SignUpButton>`. Never navigate to a dedicated `/sign-in` or `/sign-up` page.
4. **`/dashboard` is a protected route.** Unauthenticated users must be redirected to sign-in before they can access it.
5. **Authenticated users visiting `/` are redirected to `/dashboard`.** Do this in `middleware.ts`.
6. **Never expose auth state to the database layer.** Keep Clerk helpers (`auth()`, `currentUser()`) in Server Components or Route Handlers — never in `@/db` modules.

---

## Middleware

Route protection and redirects are handled in a single `middleware.ts` at the project root.

```ts
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Redirect authenticated users away from the homepage
  if (userId && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect /dashboard and all sub-routes
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

---

## Modal Sign-in / Sign-up

Always use `mode="modal"` so Clerk overlays the current page instead of navigating away.

```tsx
import { SignInButton, SignUpButton } from "@clerk/nextjs";

// Correct ✅
<SignInButton mode="modal">
  <button>Sign In</button>
</SignInButton>

<SignUpButton mode="modal">
  <button>Sign Up</button>
</SignUpButton>

// Wrong ❌ — omitting mode="modal" may navigate to a full-page route
<SignInButton />
```

> The `<Show>` component from `@clerk/nextjs` conditionally renders based on auth state. Use `<Show when="signed-in">` / `<Show when="signed-out">` in place of manual `userId` checks inside JSX.

---

## Reading Auth State

| Context                          | API                                                        |
| -------------------------------- | ---------------------------------------------------------- |
| Server Component / Route Handler | `import { auth, currentUser } from "@clerk/nextjs/server"` |
| Client Component                 | `useAuth()`, `useUser()` from `@clerk/nextjs`              |

```ts
// Server Component example
import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { userId } = await auth();
  // userId is guaranteed non-null here because middleware protects this route
}
```

```ts
// Client Component example — only for UI, never for data access
"use client";
import { useUser } from "@clerk/nextjs";

export function Avatar() {
  const { user } = useUser();
  return <img src={user?.imageUrl} alt={user?.fullName ?? ""} />;
}
```

---

## What Not to Do

- Do **not** use `getServerSideProps` or `getStaticProps` — this is App Router only.
- Do **not** create `/app/sign-in/page.tsx` or `/app/sign-up/page.tsx` — auth is modal-only.
- Do **not** check `userId` in middleware and manually set cookies or headers for session management.
- Do **not** import `auth()` or `currentUser()` from the server package inside a Client Component.
