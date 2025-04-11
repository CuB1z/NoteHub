import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Layout from "@/layouts/Layout";
import { redirect } from "next/navigation";
import FileClient from "@/components/clients/FileClient";

interface PageProps {
    params: Promise<{
        name: string;
        repo: string;
        path: string[];
    }>;
};

export default async function DynamicPathPage(context: PageProps) {
    const { name, repo, path } = await context.params;
    const session = await getServerSession(authOptions);
    const fullPath = `${name}/${repo}/${path.join("/")}`;

    if (!fullPath.endsWith(".md")) {
        redirect(`/${name}/${repo}`);
    }

    return (
        <Layout session={session}>
            <FileClient
                githubOwner={name}
                githubRepo={repo}
                authToken={session?.accessToken}
                path={path}
            />
        </Layout>
    );
}