
export interface UserData {
    id: number;
    username: string;
    avatar: string;
    profileUrl: string;
    name: string | null;
    bio: string | null;
    location: string | null;
    stats: {
        repositories: number;
        followers: number;
        following: number;
    };
}