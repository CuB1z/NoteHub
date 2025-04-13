"use client";

import useFetchCache from "@/hooks/useFetchCache";
import { UserData } from "@/types/UserData";
import Profile from "@/components/sections/Profile";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";

interface ProfileClientProps {
    githubOwner: string;
    authToken: string | null | undefined;
    isOwner: boolean;
};

function buildUrl(githubOwner: string): string {
    return `/api/${githubOwner}`;
}

export default function ProfileClient({ githubOwner, authToken, isOwner }: ProfileClientProps) {
    const { data, loading, error } = useFetchCache<UserData>(buildUrl(githubOwner), authToken);

    if (error) return <div>{error}</div>;
    if (loading) return <ProfileSkeleton />;
    if (!data) return <div>No data available</div>;

    return <Profile userData={data} isOwner={isOwner} />;
}