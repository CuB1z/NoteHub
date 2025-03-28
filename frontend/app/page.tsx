import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { FileTree } from "@/components/FileTree";
import { fetchData } from "@/lib/fetchData";
import { FileNode } from "@/types/FileNode";

export default async function Home() {
	const session = await getServerSession(authOptions);
	const nodes = await fetchData<FileNode[]>(
		"http://localhost:5000/api/v1/repositories/CuB1z/Obsidian-Notes",
		session?.accessToken as string
	)
	
	return <FileTree nodes={nodes} />;
}