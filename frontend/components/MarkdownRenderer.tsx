import { parseMarkdown } from "@/lib/parseMarkdown";

interface MarkdownRendererProps {
    markdown: string;
}

export default function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
    const parsedContent = parseMarkdown(markdown);

    return (
        <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: parsedContent }}
        ></div>
    );
}