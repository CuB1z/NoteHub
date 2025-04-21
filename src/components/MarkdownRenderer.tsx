import "@/styles/markdown.css";
import { FileContent } from "@/types/FileContent";

export default function MarkdownRenderer({ name, frontmatter, content }: FileContent) {

    return (
        <div
            className="markdown-body entry"
            dangerouslySetInnerHTML={{ __html: content || "" }}
        ></div>
    );
}