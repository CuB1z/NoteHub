import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import { metadata as meta, APP_NAME } from "@/config/metadata";

import Layout from "@/layouts/Layout";
import ProfileClient from "@/components/clients/ProfileClient";

interface PageProps {
    params: Promise<{ name: string }>,
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { name } = await params;
    return {
        ...meta,
        title: `${APP_NAME} - ${name}`
    }
}

export default async function ProfilePage(context: PageProps) {
    const params = await context.params;
    const session = await getServerSession(authOptions);
    const isOwner = session?.userName === params.name;

    return (
        <Layout session={session}>
            <ProfileClient
                githubOwner={params.name}
                authToken={session?.accessToken} 
                isOwner={isOwner}
            />
        </Layout>
    );
}
