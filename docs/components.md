# Components & Styling

## shadcn/ui
- Scaffold components with `npx shadcn@latest add <component>`. Files land in `components/ui/`.
- **Do not hand-edit scaffolded files** unless you are extending `cva` variants or fixing a bug. Re-running shadcn will overwrite manual edits.
- The configured style is `base-nova`. Do not mix in components from other shadcn styles.
- Icon library is `lucide-react`. Only use lucide icons.

## @base-ui/react
shadcn components in this project are built on `@base-ui/react` primitives (e.g. `Button` from `@base-ui/react/button`). When building custom low-level wrappers, import from `@base-ui/react/<component>` directly and style with Tailwind + cva following the same pattern as `components/ui/button.tsx`.

## class-variance-authority (cva)
Use `cva` for all components that have visual variants:

```ts
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva("rounded-lg border", {
  variants: {
    variant: {
      default: "bg-card text-card-foreground",
      outline: "bg-transparent border-border",
    },
  },
  defaultVariants: { variant: "default" },
})
```

Components accept `className` and spread variant props — merge with `cn()`.

## `cn()` Helper
Always use `cn()` from `@/lib/utils` to merge Tailwind classes. Never concatenate class strings manually.

```ts
// correct
className={cn("base-classes", condition && "conditional-class", className)}

// wrong
className={`base-classes ${condition ? "conditional-class" : ""} ${className}`}
```

## Tailwind CSS v4
- Import order in `globals.css`: `tailwindcss` → `tw-animate-css` → `shadcn/tailwind.css`.
- Custom design tokens are CSS custom properties set in `globals.css`. Access them via `var(--token-name)` in CSS and `--color-token-name` in Tailwind utilities (as mapped in `@theme inline`).
- Do not introduce a `tailwind.config.js/ts` file — Tailwind v4 is configured entirely in CSS.
- Avoid arbitrary value classes (`[#abc123]`) unless absolutely necessary; prefer design tokens.

## Dark Mode
Dark mode is activated by the `dark` class on a parent element. Use `dark:` prefix variants:

```tsx
<div className="bg-white dark:bg-zinc-900">
```

Never use `prefers-color-scheme` media queries in CSS — the class-based strategy is the only supported mechanism.

## Component Location
| Type | Location |
|---|---|
| shadcn/base-ui primitives | `components/ui/` |
| Feature-specific components | `components/<feature>/` |
| Layout components (nav, shell) | `components/layout/` |
| Page-level compositions | Inline in `app/<route>/page.tsx` if small |

## Accessibility
- Use semantic HTML elements first. Wrap in a primitive only when the native element is insufficient.
- All interactive elements must be keyboard accessible. `@base-ui/react` handles this for primitives; do not override `tabIndex` or `role` without justification.
- Images must have descriptive `alt` text. Use `alt=""` only for decorative images.
