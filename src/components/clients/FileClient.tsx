"use client";

import styles from "@/styles/FileClient.module.css";

import { notFound } from "next/navigation";
import useFetchCache from "@/hooks/useFetchCache";
import { FileContent } from "@/types/FileContent";

import MarkdownRenderer from "@/components/MarkdownRenderer";
import Loader from "@/components/skeletons/Loader";
import { LOADED_FILE_EVENT } from "@/config/constants";
import { LoadedFileEvent } from "@/types/event/LoadedFileEvent";
import { useEffect } from "react";

interface FileClientProps {
    githubOwner: string;
    githubRepo: string;
    authToken: string | null | undefined;
    path: string[];
};

function buildUrl(githubOwner: string, githubRepo: string, path: string[]): string {
    return `/api/${githubOwner}/${githubRepo}/${path.join('/')}`;
}

export default function FileClient({ githubOwner, githubRepo, authToken, path }: FileClientProps) {
    const { data, loading, error } = useFetchCache<FileContent>(buildUrl(githubOwner, githubRepo, path), authToken);

    // Emit an event when the file is loaded to notify other components
    useEffect(() => {
        if (data) {
            window.dispatchEvent(new CustomEvent<LoadedFileEvent>(LOADED_FILE_EVENT, {
                detail: {
                    name: data.name,
                    headings: data.headings
                }
            }));
        }
    }, [data]);

    if (error) return notFound();
    if (loading) return <Loader />;
    if (!data) return notFound();

    return (
        <div className={styles.container} >
            <MarkdownRenderer {...data} />
        </div>
    );
}