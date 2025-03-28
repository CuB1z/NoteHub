import { marked } from "marked"

export function parseMarkdown(markdown: string): string {
    return marked(markdown, {
        async: false,
        breaks: true,
        gfm: true
    });
}