import { getFileContent } from "@/services/RepositoryService";
import { getAuthToken } from "@/services/RequestService";

interface CustomRequest {
    params: Promise<{ name: string, repo: string, path: string[] }>;
    query?: { [key: string]: string };
}

export async function GET(req: Request, { params }: CustomRequest) {
    const authToken = getAuthToken(req.headers);
    const { name, repo, path } = await params;

    if (!name || !repo || !path) {
        return new Response(JSON.stringify({ error: "Missing parameters" }), { status: 400 });
    }

    try {
        const fileContent = await getFileContent({
            githubOwner: name,
            githubRepo: repo,
            authToken: authToken,
            path: path.join("/"),
        })
    
        return new Response(JSON.stringify(fileContent), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch file content" }), { status: 500 });
    }
}