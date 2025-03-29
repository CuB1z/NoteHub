import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import Layout from "@/layouts/Layout";

export default async function Home() {
	const session = await getServerSession(authOptions);

	return (
		<Layout session={session}>
				<h1>Home</h1>
				<p>Welcome to the home page!</p>
		</Layout>
	)
}