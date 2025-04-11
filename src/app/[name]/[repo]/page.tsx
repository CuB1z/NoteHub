import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { metadata as meta, APP_NAME } from "@/config/metadata";

import Layout from "@/layouts/Layout";
import RepoClient from "@/components/clients/RepoClient";

interface PageProps {
	params: Promise<{ name: string; repo: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { name, repo } = await params;
	return {
		...meta,
		title: `${APP_NAME} - ${name}/${repo}`,
		description: `View the ${repo} notes repository from ${name} on GitHub`
	};
}

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