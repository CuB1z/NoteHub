"use client";
import styles from "@/styles/SearchBar.module.css";
import { Search, Loader } from "lucide-react";

import { useState } from "react";
import Button from "@/components/buttons/Button";

export default function SearchBar() {
    const [search, setSearch] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [icon, setIcon] = useState<string>("/assets/icons/search.svg");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    const handleSearchSubmit = () => {
        const realUrl = search.split("https://github.com/")[1]
        if (realUrl) {
            setIsLoading(true);
            setIcon("/assets/icons/loader.svg");

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
                onClick={() => handleSearchSubmit()}
                status={isLoading ? "loading" : undefined}
            >
                {isLoading ? <Loader className="icon" /> : <Search className="icon" />}
            </Button>
        </div>
    );
}