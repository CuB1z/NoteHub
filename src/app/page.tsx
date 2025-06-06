import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";

import Layout from "@/layouts/Layout";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Working from "@/components/sections/Working";
import Examples from "@/components/sections/Examples";
import Cta from "@/components/sections/Cta";

import { RepoOptions } from "@/services/RepositoryService";
import { metadata as meta } from "@/config/metadata";

export const metadata = meta;

const exampleRepos: RepoOptions[] = [
	{ githubOwner: "midudev", githubRepo: "eloquent-javascript-es" },
	{ githubOwner: "ashishpatel26", githubRepo: "ML-Notes-in-Markdown" },
	{ githubOwner: "cub1z", githubRepo: "URJC_Notes" }
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