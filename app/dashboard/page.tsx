import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession();

  if (!session) return <h1>Access Denied</h1>;
  return <h1>Hello I am the dashboard</h1>;
}
