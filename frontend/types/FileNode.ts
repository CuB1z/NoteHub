export interface FileNode {
    name: string;
    type: "file" | "dir";
    path: string;
    url?: string;
    children?: FileNode[];
}