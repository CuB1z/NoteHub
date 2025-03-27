import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import FileTreeClient from "@/components/clients/FileTreeClient";

export default async function Home() {
	const session = await getServerSession(authOptions);
	return <FileTreeClient session={session} />;
}