"use client";

import { usePathname } from "next/navigation";
import { useFetchWithCache } from "@/hooks/useFetchWithCache";

interface ContentResponse {
    name: string;
    content: string;
};


export default function DynamicPathPage() {
    const pathname = usePathname();
    const fullPath = pathname.startsWith("/") ? pathname.slice(1) : pathname;

    const { data, loading, error } = useFetchWithCache<ContentResponse>(
        `http://localhost:5000/api/v1/repositories/${fullPath}`,
        fullPath
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