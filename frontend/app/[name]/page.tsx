import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

interface PageProps {
    params: {
        name: string;
    };
};

export default async function ProfilePage(context: PageProps) {
    const params = await context.params;
    const session = await getServerSession(authOptions);
    const isOwner = session?.userName === params.name;

    return (
        <div>
            <h1>Profile</h1>
            <p>Username: {params.name}</p>
            <p>Is Owner: {isOwner ? "Yes" : "No"}</p>
            <p>Params: {JSON.stringify(params)}</p>
            <p>Session User Name: {session?.userName}</p>
            <p>Session User Image: {session?.user?.image}</p>
        </div>
    );
}
