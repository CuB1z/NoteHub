"use client";

import { useEffect, useState } from "react";
import { LOADED_FILE_EVENT } from "@/config/constants";
import { MarkdownHeading } from "@/types/MarkdownHeading";
import { LoadedFileEvent } from "@/types/event/LoadedFileEvent";

import Loader from "@/components/skeletons/Loader";

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

        // Set up a listener for the custom event
        window.addEventListener(LOADED_FILE_EVENT, handleFileLoaded as EventListener);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener(LOADED_FILE_EVENT, handleFileLoaded as EventListener);
        };
    }, []);

    if (loading) return <Loader />;

    return (
        <nav>
            <ul>
                {headings?.map((heading) => (
                    <li key={heading.id}>{heading.text}</li>
                ))}
            </ul>
        </nav>
    );
}