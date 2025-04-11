import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Layout from "@/layouts/Layout";
import { getFileContent } from "@/services/RepositoryService";
import { redirect } from "next/navigation";
import BreadCrumb from "@/components/BreadCrumb";

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

    try {
        const fileContent = await getFileContent({
            githubOwner: name,
            githubRepo: repo,
            authToken: session?.accessToken,
            path: path.join("/")
        })

        return (
            <Layout session={session}>
                <div>
                    <BreadCrumb
                        githubOwner={name}
                        githubRepo={repo}
                        path={path.join("/")}
                    />
                    <MarkdownRenderer {...fileContent} />
                </div>
            </Layout>
        );
    } catch (error) {
        redirect(`/${name}/${repo}`);
    }
}