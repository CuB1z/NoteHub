import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Profile from "@/components/sections/Profile";
import Layout from "@/layouts/Layout";
import { getUserData } from "@/services/RepositoryService";
import { getServerSession } from "next-auth";

interface PageProps {
    params: {
        name: string;
    };
};

export default async function ProfilePage(context: PageProps) {
    const params = await context.params;
    const session = await getServerSession(authOptions);
    const isOwner = session?.userName === params.name;

    const userData = await getUserData({
        githubOwner: params.name,
        authToken: session?.accessToken,
    });

    return (
        <Layout session={session}>
            <Profile userData={userData} />
        </Layout>
    );
}
