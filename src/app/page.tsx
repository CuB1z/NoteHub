import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import Layout from "@/layouts/Layout";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Working from "@/components/sections/Working";
import Examples from "@/components/sections/Examples";
import Cta from "@/components/sections/Cta";
import { RepoOptions } from "@/services/RepositoryService";

const exampleRepos: RepoOptions[] = [
	{ githubOwner: "midudev", githubRepo: "eloquent-javascript-es" },
	{ githubOwner: "ashishpatel26", githubRepo: "ML-Notes-in-Markdown" },
	{ githubOwner: "keyvanakbary", githubRepo: "learning-notes" }
]

export default async function Home() {
	const session = await getServerSession(authOptions);

	return (
		<Layout session={session}>
			<Hero />
			<Features />
			<Working />
			<Examples examples={exampleRepos} authToken={session?.accessToken} />
			<Cta isLoggedIn={!!session} />
		</Layout>
	)
}