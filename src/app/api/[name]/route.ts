import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserData } from "@/services/RepositoryService";

interface CustomRequest {
    params: { name: string };
    query?: { [key: string]: string };
}

export async function GET(req: Request, { params, query }: CustomRequest) {
    const session = await getServerSession(authOptions);
    const { name } = await params;

    const userData = await getUserData({
        githubOwner: name,
        authToken: session?.accessToken,
    });

    console.log("Session:", session);
    console.log("User Data:", userData);

    return new Response(JSON.stringify(userData), { status: 200 });
}
