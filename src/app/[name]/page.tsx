import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Layout from "@/layouts/Layout";
import { getFileContent } from "@/services/RepositoryService";
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

    const readme = await getFileContent({
        githubOwner: params.name,
        githubRepo: params.name,
        authToken: session?.accessToken,
        path: "README.md",
    })

    return (
        <Layout session={session}>
            <h1>Profile</h1>
            <p>Username: {params.name}</p>
            <p>Is Owner: {isOwner ? "Yes" : "No"}</p>
            <p>Session User Name: {session?.userName}</p>
            <MarkdownRenderer {...readme} />
        </Layout>
    );
}
