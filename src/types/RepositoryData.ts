
export interface RepositoryData {
    name: string;
    description: string;
    url: string;
    stars: number;
    tags: string[];
    lastUpdated: string;
    owner: {
        name: string;
        avatar: string;
    }
}