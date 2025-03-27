"use client";

import { useFetchWithCache } from "@/hooks/useFetchWithCache";
import { FileNode } from "@/types/FileNode";
import { FileTree } from "@/components/FileTree";

export default function FileTreeClient({ session }: { session: any }) {
    const { data, loading, error } = useFetchWithCache<FileNode[]>(
        "http://localhost:5000/api/v1/repositories/CuB1z/Obsidian-Notes",
        "repositoryData",
        { authToken: session?.accessToken as string }
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <h1>Repository Files</h1>
            {data && data.length > 0 ? (
                <FileTree nodes={data} />
            ) : (
                <p>No files found.</p>
            )}
        </>
    )
}