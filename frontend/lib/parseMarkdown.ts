import { marked } from "marked"
import markedKatex from "marked-katex-extension";

export function parseMarkdown(markdown: string): string {
    marked.use(markedKatex({ throwOnError: false }));

    return marked.parse(markdown, {
        async: false,
        breaks: true,
        gfm: true,
    });
}