import { db } from "@/db";
import { linksTable } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";

export async function getLinksByUserId(userId: string) {
  return db
    .select()
    .from(linksTable)
    .where(eq(linksTable.userId, userId))
    .orderBy(desc(linksTable.updatedAt));
}

export async function createLink({
  slug,
  url,
  userId,
}: {
  slug: string;
  url: string;
  userId: string;
}) {
  const [link] = await db
    .insert(linksTable)
    .values({ slug, url, userId })
    .returning();
  return link;
}

export async function updateLink({
  id,
  slug,
  url,
  userId,
}: {
  id: number;
  slug: string;
  url: string;
  userId: string;
}) {
  const [link] = await db
    .update(linksTable)
    .set({ slug, url })
    .where(and(eq(linksTable.id, id), eq(linksTable.userId, userId)))
    .returning();
  return link ?? null;
}

export async function deleteLink({
  id,
  userId,
}: {
  id: number;
  userId: string;
}) {
  await db
    .delete(linksTable)
    .where(and(eq(linksTable.id, id), eq(linksTable.userId, userId)));
}

export async function getLinkBySlug(slug: string) {
  const [link] = await db
    .select()
    .from(linksTable)
    .where(eq(linksTable.slug, slug))
    .limit(1);
  return link ?? null;
}
