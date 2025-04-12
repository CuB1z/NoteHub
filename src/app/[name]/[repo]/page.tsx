import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { metadata as meta, APP_NAME } from "@/config/metadata";

import ContentLayout from "@/layouts/ContentLayout";
import RepoClient from "@/components/clients/RepoClient";
import FileClient from "@/components/clients/FileClient";

interface PageProps {
	params: Promise<{ name: string; repo: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { name, repo } = await params;
	return {
		...meta,
		title: `${APP_NAME} - ${name}/${repo}`,
		description: `View the ${repo} notes repository from ${name} on GitHub`,
	};
}

export default async function RepositoryPage(context: PageProps) {
	const { name, repo } = await context.params;
	const session = await getServerSession(authOptions);
	const fullPath = `${name}/${repo}`;

	return (
		<ContentLayout
			session={session}
			fileTree={
				<RepoClient
					githubOwner={name}
					githubRepo={repo}
					authToken={session?.accessToken as string}
					basePath={fullPath}
				/>
			}
			toc={null}
		>
			<FileClient
				githubOwner={name}
				githubRepo={repo}
				authToken={session?.accessToken}
				path={[""]}
			/>
		</ContentLayout>
	);
}
