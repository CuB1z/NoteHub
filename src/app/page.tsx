import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import Layout from "@/layouts/Layout";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Working from "@/components/sections/Working";
import Examples from "@/components/sections/Examples";
import Cta from "@/components/sections/Cta";
import { RepositoryData } from "@/types/RepositoryData";
import { getRepoData, RepoOptions } from "@/services/RepositoryService";

const exampleRepos: RepoOptions[] = [
	{ githubOwner: "midudev", githubRepo: "eloquent-javascript-es" },
	{ githubOwner: "ashishpatel26", githubRepo: "ML-Notes-in-Markdown" },
	{ githubOwner: "keyvanakbary", githubRepo: "learning-notes" }
]

export default async function Home() {
	const session = await getServerSession(authOptions);
	const examples: RepositoryData[] = [];

	for (const repo of exampleRepos) {
		const repoData = await getRepoData({...repo, authToken: session?.accessToken});
		if (repoData) examples.push(repoData);
	}

	return (
		<Layout session={session}>
			<Hero />
			<Features />
			<Working />
			<Examples examples={examples}/>
			<Cta />
		</Layout>
	)
}