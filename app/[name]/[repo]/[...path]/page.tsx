import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchData } from "@/lib/fetchData";
import { ContentResponse } from "@/types/ContentResponse";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Layout from "@/layouts/Layout";
import { getFileContent } from "@/services/RepositoryService";

interface PageProps {
    params: {
        name: string;
        repo: string;
        path: string[]
    };
};

export default async function DynamicPathPage(context: PageProps) {
    const params = await context.params;
    const session = await getServerSession(authOptions);
    const fullPath = `${params.name}/${params.repo}/${params.path.join("/")}`;

    if (!fullPath.endsWith(".md")) {
        redirect(`/${params.name}/${params.repo}`);
    }

    const fileContent = await getFileContent({
        githubOwner: params.name,
        githubRepo: params.repo,
        authToken: session?.accessToken,
        path: params.path.join("/")
    })

    return (
        <Layout session={session}>
            <MarkdownRenderer {...fileContent} />
        </Layout>
    );
}