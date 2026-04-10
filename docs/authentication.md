# Authentication

## Provider
**Clerk v7** (`@clerk/nextjs`). Do not introduce any other auth library.

## Setup
`<ClerkProvider>` wraps the entire app in `app/layout.tsx`. It must remain at the root layout level and must not be moved or duplicated.

## Conditional UI Rendering
Use the `<Show>` component from `@clerk/nextjs` to conditionally render UI based on auth state. Do not write manual boolean guards for auth state in JSX.

```tsx
import { Show } from "@clerk/nextjs"

// Only renders when the user is signed in
<Show when="signed-in">
  <UserButton />
</Show>

// Only renders when the user is signed out
<Show when="signed-out">
  <SignInButton />
  <SignUpButton />
</Show>
```

## Protecting Routes
Protect routes using Clerk middleware. Create or update `middleware.ts` at the project root following the Clerk v7 middleware pattern (check `node_modules/@clerk/nextjs` for the current API — it may differ from earlier versions).

```ts
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/"],
}
```

## Accessing the Current User
In **Server Components and Server Actions**, use `auth()` or `currentUser()` from `@clerk/nextjs/server`:

```ts
import { auth } from "@clerk/nextjs/server"

const { userId } = await auth()
if (!userId) redirect("/sign-in")
```

In **Client Components**, use the `useAuth()` or `useUser()` hooks from `@clerk/nextjs`.

## User Identity in the Database
Store the Clerk `userId` (a `varchar` string like `user_abc123`) as a foreign key in database tables, not the full user object. Never store passwords or sensitive Clerk-managed data in the application database.

## Built-in UI Components
Use Clerk's pre-built components when possible:
- `<SignInButton>` / `<SignUpButton>` — trigger sign-in/up flows
- `<SignIn>` / `<SignUp>` — full embedded auth pages
- `<UserButton>` — avatar dropdown with account management
- `<UserProfile>` — embedded profile management page

## Environment Variables
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```
`CLERK_SECRET_KEY` is server-only. Never reference it in Client Components or expose it to the browser.
