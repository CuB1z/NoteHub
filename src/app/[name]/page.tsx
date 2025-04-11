import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileClient from "@/components/clients/ProfileClient";
import Layout from "@/layouts/Layout";
import { getServerSession } from "next-auth";

interface PageProps {
    params: Promise<{ name: string }>,
};

export default async function ProfilePage(context: PageProps) {
    const params = await context.params;
    const session = await getServerSession(authOptions);
    const isOwner = session?.userName === params.name;

    return (
        <Layout session={session}>
            <ProfileClient
                githubOwner={params.name}
                authToken={session?.accessToken} 
                isOwner={isOwner}
            />
        </Layout>
    );
}
