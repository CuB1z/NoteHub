"use client";

import { notFound } from "next/navigation";
import useFetchCache from "@/hooks/useFetchCache";
import { RepositoryResponse } from "@/types/RepositoryResponse";

import { FileTree } from "@/components/FileTree";
import Loader from "@/components/skeletons/Loader";
import { FileNode } from "@/types/FileNode";

interface RepoClientProps {
    githubOwner: string;
    githubRepo: string;
    authToken: string | null | undefined;
    basePath: string;
    selectedFile?: string;
};

function buildUrl(githubOwner: string, githubRepo: string): string {
    return `/api/${githubOwner}/${githubRepo}`;
}

function getSelectedNode(selectedFile: string | undefined, nodes: FileNode[], i = 0): FileNode | null {
    if (!selectedFile) return null;
    
    const splitFilePath = selectedFile.split("/");
    if (i >= splitFilePath.length) return null;

    const currentPath = splitFilePath[i];
    const currentNode = nodes.find(node => node.name === currentPath);

    if (!currentNode) return null;
    if (currentNode.type === "dir") return getSelectedNode(selectedFile, currentNode.children || [], i + 1);

    return currentNode;
}

export default function RepoClient({ githubOwner, githubRepo, authToken, basePath, selectedFile }: RepoClientProps) {
    const { data, loading, error } = useFetchCache<RepositoryResponse>(buildUrl(githubOwner, githubRepo), authToken);
    
    if (error) return notFound();
    if (loading) return <Loader />;
    if (!data) return notFound();
    
    const selectedNode = getSelectedNode(selectedFile, data.repoStructure);
    return <FileTree nodes={data.repoStructure} basePath={basePath} selectedNode={selectedNode} />;
}