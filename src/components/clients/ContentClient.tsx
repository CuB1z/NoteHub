"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ContentLayout from "@/layouts/ContentLayout";
import RepoClient from "@/components/clients/RepoClient";
import FileClient from "@/components/clients/FileClient";

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
        const handleFileClick = (event: CustomEvent) => {
            const filePath = event.detail.path;
            setSelectedFile(filePath);
            router.push(`/${name}/${repo}?path=${encodeURIComponent(filePath)}`);
        };

        // Set up a listener for the custom event
        window.addEventListener("fileClick", handleFileClick as EventListener);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("fileClick", handleFileClick as EventListener);
        };
    }, [name, repo, router]);


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const path = params.get("path");
        if (path) {
            setSelectedFile(path);
        }
    }, []);

    return (
        <ContentLayout
            session={session}
            fileTree={
                <RepoClient
                    githubOwner={name}
                    githubRepo={repo}
                    authToken={session?.accessToken as string}
                    basePath={fullPath}
                />
            }
            toc={null}
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