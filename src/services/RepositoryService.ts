import { FileNode } from "@/types/FileNode";
import { parseMarkdown } from "../lib/markdownParser";
import { FileContent } from "@/types/FileContent";
import { fetchData } from "@/lib/fetchData";
import { RepositoryData } from "@/types/RepositoryData";

const BASE_GITHUB_API_URL = "https://api.github.com/repos";

interface RepoOptions {
    githubOwner: string;
    githubRepo: string;
    authToken?: string | null;
    path?: string;
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
        console.error("Error fetching repo structure from GitHub: ", url, error);
        throw new Error(`Failed to fetch repository structure from GitHub: ${url}`);
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
        
        const fileContentResponse = await fetchData<string>({
            url: response.download_url,
            authToken: authToken,
            responseType: "TEXT"
        });

        // Parse file metadata and content
        const parsedFile = parseMarkdown(fileContentResponse);

        return {
            name: response.name,
            frontmatter: parsedFile.frontmatter,
            content: parsedFile.content,
        };
    } catch (error) {
        console.error("Error fetching file content from GitHub: ", url, error);
        throw new Error(`Failed to fetch file content from GitHub: ${url}`);
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

        return {
            name: response.name.replace(/-/g, " "),
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
        console.error("Error fetching repo data from GitHub: ", url, error);
        throw new Error(`Failed to fetch repository data from GitHub: ${url}`);
    }
}