import { getUserData } from "@/services/RepositoryService";
import { getAuthToken } from "@/services/RequestService";

interface CustomRequest {
    params: Promise<{ name: string }>;
    query?: { [key: string]: string };
}

export async function GET(req: Request, { params }: CustomRequest) {
    const authToken = getAuthToken(req.headers);
    const { name } = await params;

    try {
        const userData = await getUserData({
            githubOwner: name,
            authToken: authToken,
        });

        return new Response(JSON.stringify(userData), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch user data" }), { status: 500 });
    }
}