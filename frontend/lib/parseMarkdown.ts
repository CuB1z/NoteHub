import { marked } from "marked"
import markedKatex from "marked-katex-extension";
import { gfmHeadingId } from "marked-gfm-heading-id";

interface MarkdownLink {
    href: string;
    text: string;
}

export function parseMarkdown(markdown: string): string {
    const renderer = new marked.Renderer();

    renderer.link = ({ href, text }: MarkdownLink) => {
        if (href.startsWith("http")) {
            return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
        } else if (href.startsWith("#")) {
            const newHref = href
                .toLocaleLowerCase()
                .replace(/ /g, "-")
                .replace(/%20/g, "-")
                .replace(/[()]/g, "");

            return `<a href="${newHref}">${text}</a>`;
        } else {
            return `<a href="${href}">${text}</a>`;
        }
    }

    marked.use(markedKatex({ throwOnError: false }));
    marked.use(gfmHeadingId());
    marked.use({ renderer });

    return marked.parse(markdown, {
        async: false,
        breaks: true,
        gfm: true,
    });
}