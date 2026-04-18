"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createLink, updateLink, deleteLink } from "@/data/links";

const createLinkSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(12, "Slug must be 12 characters or fewer")
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Slug may only contain letters, numbers, hyphens, and underscores",
    ),
});

type CreateLinkInput = z.infer<typeof createLinkSchema>;

export async function createLinkAction(input: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    const link = await createLink({ ...parsed.data, userId });
    return { success: true, data: link };
  } catch {
    return { error: "Something went wrong. The slug may already be taken." };
  }
}

const slugSchema = z
  .string()
  .min(1, "Slug is required")
  .max(12, "Slug must be 12 characters or fewer")
  .regex(
    /^[a-zA-Z0-9-_]+$/,
    "Slug may only contain letters, numbers, hyphens, and underscores",
  );

const updateLinkSchema = z.object({
  id: z.number().int().positive(),
  url: z.string().url("Please enter a valid URL"),
  slug: slugSchema,
});

type UpdateLinkInput = z.infer<typeof updateLinkSchema>;

export async function updateLinkAction(input: UpdateLinkInput) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  const parsed = updateLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    const link = await updateLink({ ...parsed.data, userId });
    if (!link) return { error: "Link not found" };
    return { success: true, data: link };
  } catch {
    return { error: "Something went wrong. The slug may already be taken." };
  }
}

const deleteLinkSchema = z.object({
  id: z.number().int().positive(),
});

type DeleteLinkInput = z.infer<typeof deleteLinkSchema>;

export async function deleteLinkAction(input: DeleteLinkInput) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  const parsed = deleteLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await deleteLink({ id: parsed.data.id, userId });
    return { success: true };
  } catch {
    return { error: "Something went wrong" };
  }
}
