import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { fetchData } from "@/lib/fetchData";
import { ContentResponse } from "@/types/ContentResponse";

export default async function DynamicPathPage({ params }: { params: { path: string[] } }) {
    const session = await getServerSession(authOptions);
    const fullPath = params.path.join("/");

    const response = await fetchData<ContentResponse>(
        `http://localhost:5000/api/v1/repositories/${fullPath}`,
        session?.accessToken as string,
    )

    return (
        <div>
            <h1>Dynamic Path</h1>
            <p>Current Path: {fullPath}</p>
            <h2>File Content</h2>
            <pre>{response?.content}</pre>
        </div>
    )
}