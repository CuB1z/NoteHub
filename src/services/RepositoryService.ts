import { FileNode } from "@/types/FileNode";
import { parseMarkdown } from "../lib/markdownParser";
import { FileContent } from "@/types/FileContent";
import { fetchData } from "@/lib/fetchData";
import { RepositoryData } from "@/types/RepositoryData";
import { UserData } from "@/types/UserData";

const BASE_GITHUB_API_URL = "https://api.github.com/repos";

export interface RepoOptions {
    githubOwner: string;
    githubRepo: string;
    authToken?: string | null;
    path?: string;
}

export interface UserOptions {
    githubOwner: string;
    authToken?: string | null;
}

/**
 * Fetches the structure of a repository from GitHub
 * @param options - The options for the request
 * @returns The structure of the repository
 */
export async function getRepoStructure({ githubOwner, githubRepo, authToken, path = "" }: RepoOptions): Promise<FileNode[]> {
    const url = `${BASE_GITHUB_API_URL}/${githubOwner}/${githubRepo}/contents/${path}`;

    try {
        const items = await fetchData<any>({
            url: url,
            authToken: authToken,
            responseType: "JSON"
        })

        if (!Array.isArray(items) || !items) throw new Error("Invalid response from GitHub API.");

        let structure: FileNode[] = [];

        for (let item of items) {
            // Skip hidden files
            if (item.name.startsWith(".")) continue;

            // Skip unsupported file types
            if (item.type === "file" && !item.name.endsWith(".md")) continue;

            // Create a node for the item
            let node: FileNode = {
                name: item.name,
                type: item.type,
                path: item.path
            };

            if (node.type === "dir") {
                node.children = await getRepoStructure({ githubOwner, githubRepo, path: item.path, authToken });
                if (node.children.length === 0) continue;
                
            } else if (node.type === "file") {
                node.url = item.download_url;
            }

            structure.push(node);
        }

        return structure;

    } catch (error) {
        const msg = error instanceof Error
            ? error.message
            : "Failed to fetch repository structure from GitHub: " + url;

        console.error(msg);
        throw new Error(msg);
    }
}

/**
 * Fetches the content of a file from GitHub
 * @param options - The options for the request
 * @returns The content of the file
 */
export async function getFileContent({ githubOwner, githubRepo, authToken, path = "" }: RepoOptions): Promise<FileContent> {
    const url = `${BASE_GITHUB_API_URL}/${githubOwner}/${githubRepo}/contents/${path}`;

    try {
        const response = await fetchData<any>({
            url: url,
            authToken: authToken,
            responseType: "JSON"
        });

        if (!response.download_url) throw new Error("File not found or no download URL available.");
        
        const fileContentResponse = await fetchData<string>({
            url: response.download_url,
            authToken: authToken,
            responseType: "TEXT"
        });

        if (!fileContentResponse) throw new Error("File content is empty.");

        // Parse file metadata and content
        const parsedFile = parseMarkdown(fileContentResponse);

        return {
            name: response.name,
            frontmatter: parsedFile.frontmatter,
            content: parsedFile.content,
        };
    } catch (error) {
        const msg = error instanceof Error
            ? error.message
            : "Failed to fetch file content from GitHub: " + url;

        console.error(msg);
        throw new Error(msg);
    }
}

/**
 * Fetches the repository data from GitHub
 * @param options - The options for the request
 * @returns The repository data
 */
export async function getRepoData({ githubOwner, githubRepo, authToken }: RepoOptions): Promise<RepositoryData> {
    const url = `${BASE_GITHUB_API_URL}/${githubOwner}/${githubRepo}`;

    try {
        const response = await fetchData<any>({
            url: url,
            authToken: authToken,
            responseType: "JSON"
        });

        if (!response) throw new Error("No response received from GitHub API.");
    
        return {
            name: response.name,
            description: response.description,
            url: response.svn_url,
            stars: response.stargazers_count,
            tags: response.topics,
            lastUpdated: response.updated_at,
            owner: {
                name: response.owner.login,
                avatar: response.owner.avatar_url,
            }
        }
    } catch (error) {
        const msg = error instanceof Error
            ? error.message
            : "Failed to fetch repository data from GitHub: " + url;

        console.error(msg);
        throw new Error(msg);
    }
}

/**
 * Fetches the user data from GitHub
 * @param options - The options for the request
 * @returns The user data
 */
export async function getUserData({ githubOwner, authToken }: UserOptions): Promise<UserData> {
    const url = `https://api.github.com/users/${githubOwner}`;

    try {
        const response = await fetchData<any>({
            url: url,
            authToken: authToken,
            responseType: "JSON"
        });

        if (!response) throw new Error("No response received from GitHub API.");

        return {
            id: response.id,
            username: response.login,
            name: response.name,
            avatar: response.avatar_url,
            profileUrl: response.html_url,
            bio: response.bio,
            location: response.location,
            stats: {
                repositories: response.public_repos,
                followers: response.followers,
                following: response.following,
            }
        };
    } catch (error) {
        const msg = error instanceof Error
            ? error.message
            : "Failed to fetch user data from GitHub: " + url;
        
        console.error(msg);
        throw new Error(msg);
    }
}