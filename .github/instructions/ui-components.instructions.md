---
description: This file describes the UI component rules for the project. Read this before implementing or modifying any UI components.
---

# UI Components — shadcn/ui

All UI in this project is built exclusively with **shadcn/ui**. No custom component primitives may be created.

---

## Rules

1. **shadcn/ui only.** Never write a custom component (button, input, dialog, card, etc.) from scratch. If a shadcn component exists that covers the use case, use it.
2. **Add components via the CLI.** Install new shadcn components with `npx shadcn@latest add <component>`. Do not hand-author files in `components/ui/`.
3. **Never modify files in `components/ui/`.** These are generated and may be overwritten by the CLI. Apply customisations through Tailwind classes or CSS variables only.
4. **`cn()` for all class merging.** Import from `@/lib/utils`. Never concatenate class strings manually.
5. **CSS variables for theming.** The project uses `cssVariables: true` (see `components.json`). Use the design-token variable names (e.g. `bg-background`, `text-foreground`) rather than raw Tailwind colour values.
6. **Icon library is Lucide.** Import icons from `lucide-react`. Do not add a second icon library.
7. **`rsc: true` is set.** shadcn components are compatible with React Server Components. Only add `"use client"` when a component genuinely requires client-side interactivity (state, effects, browser APIs).
8. **Alias `@/components/ui`.** Always import shadcn components from `@/components/ui/<name>`, never by relative path.

---

## Adding a New Component

```bash
npx shadcn@latest add <component-name>
```

Browse available components at [https://ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components).

---

## Project Configuration (`components.json`)

| Key | Value |
|-----|-------|
| Style | `base-nova` |
| Base colour | `neutral` |
| CSS variables | `true` |
| Icon library | `lucide` |
| RSC | `true` |
| Component alias | `@/components/ui` |
