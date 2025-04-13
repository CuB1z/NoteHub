"use client";

import { notFound } from "next/navigation";
import useFetchCache from "@/hooks/useFetchCache";
import { RepositoryResponse } from "@/types/RepositoryResponse";

import { FileTree } from "@/components/FileTree";
import Loader from "@/components/skeletons/Loader";

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

    if (error) return notFound();
    if (loading) return <Loader />;    
    if (!data) return notFound();

    return <FileTree nodes={data.repoStructure} basePath={basePath} />;
}