import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import { metadata as meta, APP_NAME } from "@/config/metadata";

import ContentClient from "@/components/clients/ContentClient";

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
		<ContentClient
			session={session}
			name={name}
			repo={repo}
			fullPath={fullPath}
		/>
	);
}
