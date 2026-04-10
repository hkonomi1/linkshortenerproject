import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { userId } = await auth();
  // userId is guaranteed non-null — middleware protects this route

  return (
    <h1>Dashboard</h1>
  );
}
