"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ContentLayout from "@/layouts/ContentLayout";
import RepoClient from "@/components/clients/RepoClient";
import FileClient from "@/components/clients/FileClient";
import TocClient from "@/components/clients/TocClient";
import { CLICKED_FILE_EVENT } from "@/config/constants";
import { ClickedFileEvent } from "@/types/event/ClickedFileEvent";

interface ContentClientProps {
    name: string;
    repo: string;
    session: any;
    fullPath: string;
}

export default function ContentClient({ name, repo, session, fullPath }: ContentClientProps) {
    const [selectedFile, setSelectedFile] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const handleFileClick = (event: CustomEvent<ClickedFileEvent>) => {
            const { path: filePath } = event.detail;
            setSelectedFile(filePath);
            router.push(`/${name}/${repo}?path=${encodeURIComponent(filePath)}`);
        };

        // Set up a listener for the custom event
        window.addEventListener(CLICKED_FILE_EVENT, handleFileClick as EventListener);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener(CLICKED_FILE_EVENT, handleFileClick as EventListener);
        };
    }, [name, repo, router]);


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const path = params.get("path");
        
        if (path) setSelectedFile(path);
        else setSelectedFile("");
    }, []);

    return (
        <ContentLayout
            session={session}
            githubOwner={name}
            githubRepo={repo}
            fileTree={
                <RepoClient
                    githubOwner={name}
                    githubRepo={repo}
                    authToken={session?.accessToken as string}
                    basePath={fullPath}
                    selectedFile={selectedFile}
                />
            }
            toc={<TocClient />}
        >
            <FileClient
                githubOwner={name}
                githubRepo={repo}
                authToken={session?.accessToken}
                path={[selectedFile]}
            />
        </ContentLayout>
    );
}