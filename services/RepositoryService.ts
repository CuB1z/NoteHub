import { FileNode } from "@/types/FileNode";
import { parseMarkdown } from "./MarkdownService";
import { FileContent } from "@/types/FileContent";

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
        const headers = generateHeaders(authToken ?? null);
        const response = await fetch(url, { headers });

        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

        const items = await response.json();
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
        const headers = generateHeaders(authToken ?? null);
        const response = await fetch(url, { headers });
        
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

        const fileData = await response.json();
        
        const fileContentResponse = await fetch(fileData.download_url, { headers });
        if (!fileContentResponse.ok) throw new Error(`GitHub API error: ${fileContentResponse.status}`);

        const content = await fileContentResponse.text();

        // Parse file metadata and content
        const parsedFile = parseMarkdown(content);

        return {
            name: fileData.name,
            frontmatter: parsedFile.frontmatter,
            content: parsedFile.content,
        };
    } catch (error) {
        console.error("Error fetching file content from GitHub: ", url, error);
        throw new Error(`Failed to fetch file content from GitHub: ${url}`);
    }
}

function generateHeaders(authToken: string | null): Record<string, string> {
    const headers: Record<string, string> = {};
    if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
    }
    return headers;
}