import { getServerSession } from "next-auth";
import { getRepoData, getRepoStructure } from "@/services/RepositoryService";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface CustomRequest {
    params: { name: string, repo: string };
    query?: { [key: string]: string };
}

export async function GET(req: Request, { params, query }: CustomRequest) {
    const session = await getServerSession(authOptions);
    const { name, repo } = await params;

    const [repoData, repoStructure] = await Promise.all([
        getRepoData({
            githubOwner: name,
            githubRepo: repo,
            authToken: session?.accessToken,
        }),
        getRepoStructure({
            githubOwner: name,
            githubRepo: repo,
            authToken: session?.accessToken,
        })
    ]);

    return new Response(JSON.stringify({ repoData, repoStructure }), { status: 200 });
}
