import { MarkdownHeading } from "../MarkdownHeading";

export interface LoadedFileEvent {
    name: string;
    headings: MarkdownHeading[];
}