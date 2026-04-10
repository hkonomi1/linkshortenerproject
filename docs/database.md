# Database

## Stack
- **Drizzle ORM** with the `drizzle-orm/neon-http` adapter
- **Neon** PostgreSQL serverless — connection via `DATABASE_URL` environment variable

## Client
The singleton `db` instance lives in `db/index.ts`. Always import it from `@/db` — never instantiate `drizzle()` elsewhere.

```ts
import { db } from "@/db"
```

## Schema
All table definitions live in `db/schema.ts`. Follow Drizzle's schema-first conventions:

```ts
import { pgTable, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core"

export const linksTable = pgTable("links", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: varchar({ length: 50 }).notNull().unique(),
  url: varchar({ length: 2048 }).notNull(),
  userId: varchar({ length: 255 }).notNull(),       // Clerk user ID
  createdAt: timestamp().defaultNow().notNull(),
  clickCount: integer().default(0).notNull(),
  active: boolean().default(true).notNull(),
})
```

### Rules
- Use `integer().primaryKey().generatedAlwaysAsIdentity()` for numeric PKs.
- Use `varchar({ length: N })` — always specify a length.
- Use `timestamp()` (without time zone) for timestamps. Use `.defaultNow()` for `createdAt` columns.
- Column names use **camelCase** in TypeScript; Drizzle maps them to `snake_case` in PostgreSQL automatically.
- Add `notNull()` to every column unless `null` is semantically meaningful.

## Querying
Use Drizzle's query builder. Raw SQL is only acceptable for complex queries that cannot be expressed with the builder.

```ts
// select
const link = await db
  .select()
  .from(linksTable)
  .where(eq(linksTable.slug, slug))
  .limit(1)

// insert
await db.insert(linksTable).values({ slug, url, userId })

// update
await db
  .update(linksTable)
  .set({ clickCount: sql`${linksTable.clickCount} + 1` })
  .where(eq(linksTable.slug, slug))

// delete
await db.delete(linksTable).where(eq(linksTable.id, id))
```

Import helpers (`eq`, `sql`, `and`, `or`, etc.) from `drizzle-orm`.

## Migrations
```bash
# Generate migration files from schema changes
npx drizzle-kit generate

# Push migrations to the database
npx drizzle-kit migrate
```

- Never edit files inside `./drizzle/` manually.
- Commit migration files alongside the schema change that produced them.
- The `drizzle.config.ts` at the root controls the kit configuration — do not modify it unless adding support for a new schema file.

## Security
- Never expose `DATABASE_URL` to the client. Database calls only happen in Server Components, Server Actions, or `route.ts` handlers.
- Always validate and sanitise user-supplied values before passing them to Drizzle queries.
- Use parameterised queries (the Drizzle default) — never interpolate user input into raw SQL strings.
