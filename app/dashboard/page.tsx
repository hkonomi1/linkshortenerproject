import { auth } from "@clerk/nextjs/server";
import { getLinksByUserId } from "@/data/links";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateLinkDialog } from "@/app/dashboard/CreateLinkDialog";
import { EditLinkDialog } from "@/app/dashboard/EditLinkDialog";
import { DeleteLinkDialog } from "@/app/dashboard/DeleteLinkDialog";

export default async function DashboardPage() {
  const { userId } = await auth();
  // userId is guaranteed non-null — middleware protects this route

  const links = await getLinksByUserId(userId!);

  return (
    <main className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Links</h1>
        <CreateLinkDialog />
      </div>
      {links.length === 0 ? (
        <p className="text-muted-foreground">You have no links yet.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Slug</TableHead>
              <TableHead>Destination URL</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.map((link) => (
              <TableRow key={link.id}>
                <TableCell className="font-mono">{link.slug}</TableCell>
                <TableCell className="max-w-xs truncate">{link.url}</TableCell>
                <TableCell>{link.createdAt.toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <EditLinkDialog
                    id={link.id}
                    slug={link.slug}
                    url={link.url}
                  />
                  <DeleteLinkDialog id={link.id} slug={link.slug} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </main>
  );
}
