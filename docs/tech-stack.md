# Tech Stack

## Runtime & Framework
- **Next.js 16.2.3** — App Router only. No Pages Router. Read `node_modules/next/dist/docs/` before using any Next.js API.
- **React 19** — Server Components are the default. Only opt into Client Components when interactivity or browser APIs are required.
- **TypeScript 5** — strict mode enabled.

## Styling
- **Tailwind CSS v4** — utility classes only; no custom CSS unless absolutely necessary. Config lives in `app/globals.css` via `@import "tailwindcss"`.
- **tw-animate-css** — animation utilities, imported in `globals.css`.
- Dark mode is class-based via the `dark` custom variant defined in `globals.css`.

## Component Library
- **shadcn/ui** (`shadcn@4`, style: `base-nova`) — components are scaffolded into `components/ui/`. Never hand-edit scaffolded files unless extending variants.
- **@base-ui/react** — the primitive layer behind shadcn components. Import primitives from `@base-ui/react/<component>` when building custom unstyled wrappers.
- **class-variance-authority (cva)** — variant management for all UI components.
- **clsx + tailwind-merge** — class merging via the `cn()` helper in `lib/utils.ts`.
- **lucide-react** — the only icon library. Do not introduce others.

## Database
- **Drizzle ORM 0.45** — schema-first ORM.
- **Neon (PostgreSQL serverless)** — via `@neondatabase/serverless` using the HTTP adapter (`drizzle-orm/neon-http`).
- **drizzle-kit** — migrations CLI (`drizzle-kit generate`, `drizzle-kit migrate`). Output dir: `./drizzle/`.

## Authentication
- **Clerk v7** (`@clerk/nextjs`) — auth provider. `<ClerkProvider>` wraps the app in `app/layout.tsx`. Use `Show` from `@clerk/nextjs` for conditional rendering based on auth state.

## Linting
- **ESLint 9** — `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`. Run with `npm run lint`.
