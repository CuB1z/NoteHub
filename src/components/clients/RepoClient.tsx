"use client";

import useFetchCache from "@/hooks/useFetchCache";
import { RepositoryResponse } from "@/types/RepositoryResponse";
import { FileTree } from "../FileTree";

interface RepoClientProps {
    githubOwner: string;
    githubRepo: string;
    authToken: string | null | undefined;
    basePath: string;
};

function buildUrl(githubOwner: string, githubRepo: string): string {
    return `/api/${githubOwner}/${githubRepo}`;
}

export default function RepoClient({ githubOwner, githubRepo, authToken, basePath }: RepoClientProps) {
    const { data, loading, error } = useFetchCache<RepositoryResponse>(buildUrl(githubOwner, githubRepo), authToken);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!data) return <div>No data available</div>;

    return <FileTree nodes={data.repoStructure} basePath={basePath} />;
}