"use client";

import useFetchCache from "@/hooks/useFetchCache";
import { RepoOptions } from "@/services/RepositoryService";
import { RepositoryResponse } from "@/types/RepositoryResponse";
import Example from "@/components/Example";
import ExampleSkeleton from "@/components/skeletons/ExampleSkeleton";
import ExampleError from "@/components/skeletons/ExampleError";

interface ExamplesClientProps {
    repo: RepoOptions;
    authToken?: string | null | undefined;
};

function buildUrl(githubOwner: string, githubRepo: string): string {
    return `/api/${githubOwner}/${githubRepo}`;
}

export default function ExampleClient({ repo, authToken }: ExamplesClientProps) {
    const { githubOwner, githubRepo } = repo;
    const { data, loading, error } = useFetchCache<RepositoryResponse>(buildUrl(githubOwner, githubRepo), authToken);

    if (loading) return <ExampleSkeleton />;
    if (error) return <ExampleError />;
    if (!data) return <ExampleError />;

    return <Example repo={data.repoData} />;
}