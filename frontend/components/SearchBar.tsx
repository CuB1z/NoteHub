"use client";
import styles from "@/styles/SearchBar.module.css";

import { useState } from "react";
import Button from "@/components/buttons/Button";

export default function SearchBar() {
    const [search, setSearch] = useState<string>("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    const handleSearchSubmit = () => {
        const realUrl = search.split("https://github.com/")[1]
        if (realUrl) {
            window.location.href = `/${realUrl}`;
        }
    }
    
    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="https://github.com/CuB1z/Obsidian-Notes"
                className={styles.input}
            />
            <Button
                variant="tool"
                alt="Search"
                icon="/assets/icons/search.svg"
                onClick={() => handleSearchSubmit()}
            />
        </div>
    );
}