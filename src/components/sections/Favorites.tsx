"use client";

import styles from "@/styles/sections/Favorites.module.css";

import { useEffect, useState } from "react";
import { RepositoryLoadedEvent } from "@/types/event/RepositoryLoadedEvent";
import { REPOSITORY_LOADED_EVENT } from "@/config/constants";

import { RepoOptions } from "@/services/RepositoryService";
import RepoCardClient from "@/components/clients/RepoCardClient";
import Loader from "@/components/skeletons/Loader";

interface FavoritesProps {
    repos: RepoOptions[];
    authToken?: string | null | undefined;
    profileName?: string;
}

export default function Favorites({ repos, authToken, profileName }: FavoritesProps) {
    const [loadedRepos, setLoadedRepos] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(repos.length > 0);

    // Listen for the custom event to handle repository that are not accessible
    useEffect(() => {
        const handleLoadedRepo = (event: CustomEvent<RepositoryLoadedEvent>) => {
            const { repo } = event.detail;
            const repoId = `${repo.githubOwner}/${repo.githubRepo}`;

            setLoadedRepos((prev) => {
                if (prev.has(repoId)) return prev;
                const next = new Set(prev);
                next.add(repoId);
                return next;
            });
        };

        // Set up listeners for custom events
        window.addEventListener(REPOSITORY_LOADED_EVENT, handleLoadedRepo as EventListener);

        // Clean up the event listeners on component unmount
        return () => {
            window.removeEventListener(REPOSITORY_LOADED_EVENT, handleLoadedRepo as EventListener);
        };
    }, [repos]);

    // Update loading state when all repositories are loaded
    useEffect(() => {
        if (loadedRepos.size === repos.length) {
            setIsLoading(false);
        }
    }, [loadedRepos, repos.length]);

    return (
        <>
            {isLoading && <Loader size={24} />}
            {repos.length === 0 ? (
                <h3 className={styles.emptyFavorites}>@{profileName} has no pinned repositories yet.</h3>
            ) : (
                <div className={`${styles.favoritesContainer} ${isLoading ? styles.hidden : ""}`}>
                    {repos.map((repo, index) => (
                        <RepoCardClient key={index} repo={repo} authToken={authToken} allowPrivate />
                    ))}
                </div>
            )}
        </>
    );
}