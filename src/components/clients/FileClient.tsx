"use client";

import styles from "@/styles/FileClient.module.css";

import useFetchCache from "@/hooks/useFetchCache";
import { FileContent } from "@/types/FileContent";
import BreadCrumb from "@/components/BreadCrumb";
import MarkdownRenderer from "@/components/MarkdownRenderer";

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!data) return <div>No data found</div>;

    return (
        <div className={styles.container} >
            <BreadCrumb
                githubOwner={githubOwner}
                githubRepo={githubRepo}
            />
            <MarkdownRenderer {...data} />
        </div>
    );
}