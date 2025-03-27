"use client";

import { useFetchWithCache } from "@/hooks/useFetchWithCache";

interface ContentResponse {
    name: string;
    content: string;
};

interface RendererClientProps {
    fullPath: string;
    session: any;
}

export default function RendererClient({ session, fullPath }: RendererClientProps) {
    const { loading, error, data } = useFetchWithCache<ContentResponse>(
        `http://localhost:5000/api/v1/repositories/${fullPath}`,
        fullPath,
        { authToken: session?.accessToken }
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Dynamic Path</h1>
            <p>Current Path: {fullPath}</p>
            <h2>File Content</h2>
            <pre>{data?.content}</pre>
        </div>
    );
}