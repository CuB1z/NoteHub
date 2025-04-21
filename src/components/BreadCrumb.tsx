"use client";

import styles from "@/styles/BreadCrumb.module.css";

import { Home } from "lucide-react";
import Button from "./buttons/Button";
import FavoriteButton from "./buttons/FavoriteButton";
import { useEffect, useState } from "react";
import { RepoOptions } from "@/services/RepositoryService";
import { Session } from "next-auth";

interface BreadCrumbProps extends RepoOptions {
    session: Session | null | undefined;
}

function buildUrl(githubOwner: string) {
    return `/api/db/favorites?q=${githubOwner}`;
}

function originalUrl(githubOwner: string, githubRepo: string) {
    return `https://github.com/${githubOwner}/${githubRepo}`;
}

export default function BreadCrumb({ githubOwner, githubRepo, session }: BreadCrumbProps) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check if the current repo is in the favorites list
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(buildUrl(session?.userName || ""));
            const { favoriteRepos } = await res.json() as { favoriteRepos: string[] };
            const isFavorite = favoriteRepos.some((repo: string) => {
                return repo === originalUrl(githubOwner, githubRepo);
            });

            setIsFavorite(isFavorite);
            setIsLoading(false);
        };

        fetchData();
    }, [githubOwner, githubRepo]);

    const onFavoriteClick = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div className={styles.breadcrumb}>
            <div className={styles.content}>
                <Button
                    label={githubOwner}
                    variant="text"
                    isLink
                    href={`/${githubOwner}`}
                ><Home /></Button>
                <span>{`${">"}`}</span>
                <Button
                    label={githubRepo}
                    variant="text"
                    isLink
                    href={`/${githubOwner}/${githubRepo}`}
                />
            </div>
            <div className={styles.favorite}>
                {!isLoading && (
                    <FavoriteButton
                        isFavorite={isFavorite || false}
                        onClick={onFavoriteClick}
                        username={session?.userName || ""}
                        repoUrl={originalUrl(githubOwner, githubRepo) || ""}
                    />
                )}
            </div>
        </div>
    );
}