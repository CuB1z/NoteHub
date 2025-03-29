import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { FileTree } from "@/components/FileTree";
import { fetchData } from "@/lib/fetchData";
import { FileNode } from "@/types/FileNode";
import Layout from "@/layouts/Layout";

interface PageProps {
    params: {
        name: string;
        repo: string;
    };
};

export default async function RepositoryPage(context: PageProps) {
	const params = await context.params;
	const session = await getServerSession(authOptions);
	const fullPath = `${params.name}/${params.repo}`;

	const nodes = await fetchData<FileNode[]>(
		`http://localhost:5000/api/v1/repositories/${fullPath}`,
		session?.accessToken as string
	)

	
	return (
		<Layout session={session}>
			<FileTree nodes={nodes} basePath={fullPath} />
		</Layout>
	);
}