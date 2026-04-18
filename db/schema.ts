import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const linksTable = pgTable(
  "links",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    slug: varchar({ length: 12 }).notNull().unique(),
    url: text().notNull(),
    userId: varchar({ length: 255 }).notNull(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [index("links_user_id_idx").on(table.userId)],
);
