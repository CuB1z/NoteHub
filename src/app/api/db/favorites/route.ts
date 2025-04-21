import { validateRepoUrl } from "@/lib/validationUtils";
import { addFavouriteRepo, deleteFavouriteRepo, getUserFavoriteRepos } from "@/services/DbService";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
    const { username, repoUrl } = await req.json();

    if (!username || !repoUrl) return new Response(
        JSON.stringify({ message: "Missing username or repoUrl" }),
        { status: 400 }
    );

    const session = await getServerSession(authOptions);
    if (!session || session.userName != username) return new Response(
        JSON.stringify({ message: "Unauthorized" }),
        { status: 401 }
    );

    // Validate repoUrl format
    if (!validateRepoUrl(repoUrl)) return new Response(
        JSON.stringify({ message: "Invalid repoUrl format" }),
        { status: 400 }
    );

    // Add favourite repo to the database
    try {
        await addFavouriteRepo(username, repoUrl);
        return new Response(
            JSON.stringify({ message: "Favourite repo added successfully" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error adding favourite repo:", error);
        return new Response(
            JSON.stringify({ message: "Failed to add favourite repo" }),
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    const { username, repoUrl } = await req.json();

    if (!username || !repoUrl) return new Response(
        JSON.stringify({ message: "Missing username or repoUrl" }),
        { status: 400 }
    );

    const session = await getServerSession(authOptions);
    if (!session || session.userName != username) return new Response(
        JSON.stringify({ message: "Unauthorized" }),
        { status: 401 }
    );

    // Validate repoUrl format
    if (!validateRepoUrl(repoUrl)) return new Response(
        JSON.stringify({ message: "Invalid repoUrl format" }),
        { status: 400 }
    );

    // Delete favourite repo from the database
    try {
        await deleteFavouriteRepo(username, repoUrl);
        return new Response(
            JSON.stringify({ message: "Favourite repo deleted successfully" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting favourite repo:", error);
        return new Response(
            JSON.stringify({ message: "Failed to delete favourite repo" }),
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("q");

    if (!username) return new Response(
        JSON.stringify({ message: "Missing username" }),
        { status: 400 }
    );

    // Fetch favourite repos from the database
    try {
        const favoriteRepos = await getUserFavoriteRepos(username);
        return new Response(
            JSON.stringify({ favoriteRepos }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching favourite repos:", error);
        return new Response(
            JSON.stringify({ message: "Failed to fetch favourite repos" }),
            { status: 500 }
        );
    }
}