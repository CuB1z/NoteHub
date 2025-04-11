import { getRepoData, getRepoStructure } from "@/services/RepositoryService";
import { getAuthToken } from "@/services/RequestService";

interface CustomRequest {
    params: Promise<{ name: string; repo: string }>;
    query?: { [key: string]: string };
}

export async function GET(req: Request, { params }: CustomRequest) {
    const authToken = getAuthToken(req.headers);
    const { name, repo } = await params;

    try {
        const [repoData, repoStructure] = await Promise.all([
            getRepoData({
                githubOwner: name,
                githubRepo: repo,
                authToken: authToken,
            }),
            getRepoStructure({
                githubOwner: name,
                githubRepo: repo,
                authToken: authToken,
            })
        ]);
    
        return new Response(JSON.stringify({ repoData, repoStructure }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch repository data" }), { status: 500 });
    }
}