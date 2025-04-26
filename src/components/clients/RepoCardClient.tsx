"use client";

import { RepositoryResponse } from "@/types/RepositoryResponse";
import useFetchCache from "@/hooks/useFetchCache";
import { RepoOptions } from "@/services/RepositoryService";

import RepoCard from "@/components/RepoCard";
import RepoCardSkeleton from "@/components/skeletons/RepoCardSkeleton";

interface ExamplesClientProps {
    repo: RepoOptions;
    authToken?: string | null | undefined;
};

function buildUrl(githubOwner: string, githubRepo: string): string {
    return `/api/${githubOwner}/${githubRepo}`;
}

export default function RepoCardClient({ repo, authToken }: ExamplesClientProps) {
    const { githubOwner, githubRepo } = repo;
    const { data, loading, error } = useFetchCache<RepositoryResponse>(buildUrl(githubOwner, githubRepo), authToken);

    if (loading) return <RepoCardSkeleton />;
    if (error) return;
    if (!data) return;

    return <RepoCard repo={data.repoData} />;
}