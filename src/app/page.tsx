import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import Layout from "@/layouts/Layout";
import SearchBar from "@/components/SearchBar";
import Hero from "@/components/Hero";

export default async function Home() {
	const session = await getServerSession(authOptions);

	return (
		<Layout session={session}>
			<Hero />
		</Layout>
	)
}