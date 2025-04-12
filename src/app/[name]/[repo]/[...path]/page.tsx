import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { metadata as meta, APP_NAME } from "@/config/metadata";

import Layout from "@/layouts/Layout";
import FileClient from "@/components/clients/FileClient";
import ContentLayout from "@/layouts/ContentLayout";
import RepoClient from "@/components/clients/RepoClient";

interface PageProps {
    params: Promise<{
        name: string;
        repo: string;
        path: string[];
    }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { name, repo, path } = await params;
    const fullPath = `${name}/${repo}/../${path[path.length - 1]}`;
    return {
        ...meta,
        title: `${APP_NAME} - ${fullPath}`,
        description: `Read ${fullPath} on ${APP_NAME}`
    };
}

export default async function DynamicPathPage(context: PageProps) {
    const { name, repo, path } = await context.params;
    const session = await getServerSession(authOptions);
    const fullPath = `${name}/${repo}/${path.join("/")}`;

    if (!fullPath.endsWith(".md")) {
        redirect(`/${name}/${repo}`);
    }

    return (
        <ContentLayout
            session={session}
            fileTree={
                <RepoClient
                    githubOwner={name}
                    githubRepo={repo}
                    authToken={session?.accessToken as string}
                    basePath={`${name}/${repo}`}
                />
            }
            toc={null}
        >
            <FileClient
                githubOwner={name}
                githubRepo={repo}
                authToken={session?.accessToken}
                path={path}
            />
        </ContentLayout>
    )
}