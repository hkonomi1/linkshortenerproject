"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateLinkAction } from "@/app/dashboard/actions";

interface EditLinkDialogProps {
  id: number;
  slug: string;
  url: string;
}

export function EditLinkDialog({ id, slug, url }: EditLinkDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleOpenChange(next: boolean) {
    if (!isPending) {
      setOpen(next);
      if (!next) setError(null);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const newUrl = formData.get("url") as string;
    const newSlug = formData.get("slug") as string;

    startTransition(async () => {
      const result = await updateLinkAction({ id, url: newUrl, slug: newSlug });
      if (result.error) {
        setError(result.error);
      } else {
        setOpen(false);
        router.refresh();
      }
    });
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label="Edit link"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit short link</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`edit-url-${id}`}>Destination URL</Label>
              <Input
                id={`edit-url-${id}`}
                name="url"
                type="url"
                defaultValue={url}
                required
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`edit-slug-${id}`}>Slug</Label>
              <Input
                id={`edit-slug-${id}`}
                name="slug"
                type="text"
                defaultValue={slug}
                required
                disabled={isPending}
              />
              <p className="text-muted-foreground text-xs">
                Up to 12 characters. Letters, numbers, hyphens, and underscores
                only.
              </p>
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
