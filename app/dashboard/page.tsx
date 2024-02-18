import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth";


export default async function Dashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect("/")
  }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      Dashboard
    </div>
  );
}