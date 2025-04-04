
export interface FileContent {
    name: string;
    frontmatter: Record<string, any> | null;
    content: string | null;
}