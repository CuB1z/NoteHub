import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Layout from "@/layouts/Layout";

export default async function About() {
    const session = await getServerSession(authOptions);

    return (
        <Layout session={session}>
            <h1>About Us</h1>
            <p>Welcome to the about page!</p>
        </Layout>
    )
}