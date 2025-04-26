"use client";
import { useEffect } from "react";

import { RepositoryResponse } from "@/types/RepositoryResponse";
import { RepositoryLoadedEvent } from "@/types/event/RepositoryLoadedEvent";
import { REPOSITORY_LOADED_EVENT } from "@/config/constants";

import useFetchCache from "@/hooks/useFetchCache";
import { RepoOptions } from "@/services/RepositoryService";

import RepoCard from "@/components/RepoCard";
import RepoCardError from "../skeletons/RepoCardError";
import RepoCardSkeleton from "../skeletons/RepoCardSkeleton";

interface ExamplesClientProps {
    repo: RepoOptions;
    authToken?: string | null | undefined;
    allowPrivate?: boolean;
};

function buildUrl(githubOwner: string, githubRepo: string): string {
    return `/api/${githubOwner}/${githubRepo}`;
}

export default function RepoCardClient({ repo, authToken, allowPrivate }: ExamplesClientProps) {
    const { githubOwner, githubRepo } = repo;
    const { data, loading, error } = useFetchCache<RepositoryResponse>(buildUrl(githubOwner, githubRepo), authToken);

    useEffect(() => {
        if (loading) return;
        const event = new CustomEvent<RepositoryLoadedEvent>(REPOSITORY_LOADED_EVENT, {
            detail: { repo }
        });

        window.dispatchEvent(event);
    }, [repo, loading]);

    if (loading) return <RepoCardSkeleton />;
    if (error) return <RepoCardError isPrivate={allowPrivate} />;
    if (!data) return <RepoCardError isPrivate={allowPrivate} />;

    return <RepoCard repo={data.repoData} />;
}