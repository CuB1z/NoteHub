"use client";

import useFetchCache from "@/hooks/useFetchCache";
import { UserData } from "@/types/UserData";
import Profile from "@/components/sections/Profile";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import { useEffect, useState } from "react";
import { RepoOptions } from "@/services/RepositoryService";

interface ProfileClientProps {
    githubOwner: string;
    authToken: string | null | undefined;
    isOwner: boolean;
};

function buildUrl(githubOwner: string): string {
    return `/api/${githubOwner}`;
}

export default function ProfileClient({ githubOwner, authToken, isOwner }: ProfileClientProps) {
    const { data, loading, error } = useFetchCache<UserData>(buildUrl(githubOwner), authToken);
    const [repositories, setRepositories] = useState<RepoOptions[]>([]);

    useEffect(() => {
        const fetchRepositories = async () => {
            const response = await fetch(`/api/db/favorites?q=${githubOwner}`);
            const { favoriteRepos } = await response.json() as { favoriteRepos: string[] };

            const repos: RepoOptions[] = favoriteRepos.map((repo: string) => {
                const [owner, repoName] = repo.split('/').slice(-2);
                return { githubOwner: owner, githubRepo: repoName };
            });

            setRepositories(repos);
        };

        fetchRepositories();
    }, [githubOwner]);

    if (error) return <div>{error}</div>;
    if (loading) return <ProfileSkeleton />;
    if (!data) return <div>No data available</div>;

    return <Profile userData={data} isOwner={isOwner} repos={repositories} authToken={authToken} />
}