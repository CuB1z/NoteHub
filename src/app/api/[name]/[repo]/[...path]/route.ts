import { getServerSession } from "next-auth";
import { getFileContent, getRepoData, getRepoStructure } from "@/services/RepositoryService";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface CustomRequest {
    params: { name: string, repo: string, path: string[] };
    query?: { [key: string]: string };
}

export async function GET(req: Request, { params, query }: CustomRequest) {
    const session = await getServerSession(authOptions);
    const { name, repo, path } = await params;

    if (!name || !repo) {
        return new Response("Missing parameters", { status: 400 });
    }

    const fileContent = await getFileContent({
        githubOwner: name,
        githubRepo: repo,
        authToken: session?.accessToken,
        path: path.join("/"),
    })

    return new Response(JSON.stringify(fileContent), { status: 200 });
}