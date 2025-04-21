"use client";

import styles from "@/styles/TocClient.module.css";

import { useEffect, useState } from "react";
import { CLICKED_FILE_EVENT, LOADED_FILE_EVENT } from "@/config/constants";
import { MarkdownHeading } from "@/types/MarkdownHeading";
import { LoadedFileEvent } from "@/types/event/LoadedFileEvent";

import Loader from "@/components/skeletons/Loader";
import Link from "next/link";
import { BookMarked, ChevronRight, ChevronsRight } from "lucide-react";

export default function TocClient() {
    const [headings, setHeadings] = useState<MarkdownHeading[]>([]);
    const [loading, setLoading] = useState(true);

    // Listen for the custom event when the file is loaded
    useEffect(() => {
        const handleFileLoaded = (event: CustomEvent<LoadedFileEvent>) => {
            const { headings } = event.detail;
            setHeadings(headings);
            setLoading(false);
        };

        const handleFileClick = () => {
            setHeadings([]);
            setLoading(true);
        };

        // Set up listeners for custom events
        window.addEventListener(LOADED_FILE_EVENT, handleFileLoaded as EventListener);
        window.addEventListener(CLICKED_FILE_EVENT, handleFileClick as EventListener);

        // Clean up the event listeners on component unmount
        return () => {
            window.removeEventListener(LOADED_FILE_EVENT, handleFileLoaded as EventListener);
            window.removeEventListener(CLICKED_FILE_EVENT, handleFileClick as EventListener);
        };
    }, []);

    if (loading) return <Loader />;

    return (
        <ul className={styles.toc}>
            {headings?.map((heading) => (
                <li key={heading.id}>
                    <Link href={`#${heading.id}`} className={`${styles.tocLink} ${styles[heading.depth]} entry`}>
                        <div className={styles.tocIcon}>
                            {heading.depth === 1 && <BookMarked size={16} color="var(--fg-secondary)" />}
                            {heading.depth === 2 && <ChevronRight size={16} color="var(--fg-secondary)" />}
                            {heading.depth > 2 && <ChevronsRight size={16} color="var(--fg-secondary)" />}
                        </div>
                        {heading.text}
                    </Link>
                </li>
            ))}
        </ul>
    );
}