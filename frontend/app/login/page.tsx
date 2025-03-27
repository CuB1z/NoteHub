import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginClient from "@/components/clients/LoginClient";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  return <LoginClient session={session} />;
}