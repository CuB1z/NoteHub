import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import Layout from "@/layouts/Layout";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Working from "@/components/sections/Working";
import Examples from "@/components/sections/Examples";
import Cta from "@/components/sections/Cta";

export default async function Home() {
	const session = await getServerSession(authOptions);

	return (
		<Layout session={session}>
			<Hero />
			<Features />
			<Working />
			<Examples />
			<Cta />
		</Layout>
	)
}