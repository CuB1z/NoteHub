import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import RendererClient from "@/components/clients/RendererClient";

export default async function DynamicPathPage({ params }: { params: { path: string[] } }) {
    const session = await getServerSession(authOptions);
    const fullPath = params.path.join("/");

    return <RendererClient session={session} fullPath={fullPath} />;
}