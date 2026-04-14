<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Instructions — Link Shortener Project

This is a **Next.js 16 App Router** project. The instructions below are authoritative. Detailed standards are split across the files listed in the index.

> ⚠️ **MANDATORY**: You MUST use the `read_file` tool to read the full contents of every relevant `/docs/*.md` file **before writing a single line of code** in that domain. Do not rely on memory, training data, or assumptions. Skipping this step will produce incorrect code.

## Document Index

> 🚨 **STOP. Before generating ANY code, you MUST read the full contents of every relevant file below using `read_file`.** These files contain authoritative, project-specific rules that override anything from your training data. There are NO exceptions.

For detailed guidelines on specific topics, refer to the modular documentation in the `/docs` directory:

- **Authentication** → [docs/auth.md](docs/auth.md) — Clerk setup, protected routes, modal sign-in/sign-up, auth state helpers.
- **UI Components** → [docs/ui.md](docs/ui.md) — shadcn/ui only, adding components via CLI, theming, icons.


## Non-Negotiable Rules

1. **You MUST read the full contents of the relevant `docs/` file using `read_file` before touching any domain — no exceptions.** Assumptions based on older Next.js, Clerk, Drizzle, or Tailwind versions will be wrong. Failure to read the doc first is a critical process violation.
2. **App Router only.** No Pages Router. No `getStaticProps`, `getServerSideProps`, or `pages/` directory.
3. **Server Components by default.** Add `"use client"` only when required. See [docs/next.md](docs/next.md).
4. **`@/*` imports only.** No relative `../../` imports.
5. **`cn()` for all class merging.** No manual string concatenation of Tailwind classes.
6. **No `any` in TypeScript.** Strict mode is enforced.
7. **Database access is server-only.** Never import `@/db` in a Client Component or expose `DATABASE_URL` to the browser.
8. **Clerk manages all auth.** Do not implement custom session handling or roll your own middleware for auth.
9. **No new dependencies without justification.** The stack is intentional — check if an existing dependency already solves the problem before adding one.
10. **Run `npm run lint` after every change.** Do not leave lint errors.
11. **shadcn/ui for all UI.** Never create custom component primitives. See [docs/ui.md](docs/ui.md).
12. **NEVER use `middleware.ts`.** `middleware.ts` is deprecated in the version of Next.js used by this project (Next.js 16). Use `proxy.ts` instead for any middleware/proxy logic.
