import "dotenv/config";
import { db } from "@/db";
import { linksTable } from "@/db/schema";

const SEED_USER_ID = "user_3CBMlaxHWWjEOpAjL87c5NfuVfj";

const sampleLinks = [
  {
    slug: "gh-copilot",
    url: "https://github.com/features/copilot",
    userId: SEED_USER_ID,
  },
  { slug: "nextjs-docs", url: "https://nextjs.org/docs", userId: SEED_USER_ID },
  {
    slug: "tailwindcss",
    url: "https://tailwindcss.com/docs",
    userId: SEED_USER_ID,
  },
  {
    slug: "drizzle-orm",
    url: "https://orm.drizzle.team/docs/overview",
    userId: SEED_USER_ID,
  },
  {
    slug: "neon-db",
    url: "https://neon.tech/docs/introduction",
    userId: SEED_USER_ID,
  },
  { slug: "clerk-auth", url: "https://clerk.com/docs", userId: SEED_USER_ID },
  {
    slug: "shadcn-ui",
    url: "https://ui.shadcn.com/docs",
    userId: SEED_USER_ID,
  },
  { slug: "zod-docs", url: "https://zod.dev", userId: SEED_USER_ID },
  {
    slug: "ts-handbook",
    url: "https://www.typescriptlang.org/docs/handbook/intro.html",
    userId: SEED_USER_ID,
  },
  { slug: "react-docs", url: "https://react.dev/learn", userId: SEED_USER_ID },
];

async function seed() {
  console.log("Seeding 10 sample links...");
  const inserted = await db.insert(linksTable).values(sampleLinks).returning();
  console.log(`Inserted ${inserted.length} links:`);
  for (const link of inserted) {
    console.log(`  [${link.id}] /${link.slug} → ${link.url}`);
  }
  console.log("Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
