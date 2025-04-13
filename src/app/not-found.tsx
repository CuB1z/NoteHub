import Layout from "@/layouts/Layout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Custom404() {
    const session = await getServerSession(authOptions);

    return (
        <Layout session={session}>
            <h1>Page Not Found</h1>
        </Layout>
    )
}