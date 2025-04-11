import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { FileTree } from "@/components/FileTree";
import Layout from "@/layouts/Layout";
import { getRepoStructure } from "@/services/RepositoryService";
import { redirect } from "next/navigation";
import RepoClient from "@/components/clients/RepoClient";

interface PageProps {
	params: Promise<{ name: string; repo: string }>;
};

export default async function RepositoryPage(context: PageProps) {
	const params = await context.params;
	const session = await getServerSession(authOptions);
	const fullPath = `${params.name}/${params.repo}`;

	return (
		<Layout session={session}>
			<RepoClient
				githubOwner={params.name}
				githubRepo={params.repo}
				authToken={session?.accessToken as string}
				basePath={fullPath}
			/>
		</Layout>
	);
}