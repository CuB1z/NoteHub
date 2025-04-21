"use client";

import Button from "@/components/buttons/Button";
import { Star } from "lucide-react";

interface FavoriteButtonProps {
    isFavorite: boolean;
    onClick: () => void;
    username: string;
    repoUrl: string;
}

export default function FavoriteButton({ isFavorite, onClick, username, repoUrl }: FavoriteButtonProps) {

    const handleDeleteFavorite = async () => {
        onClick();

        await fetch("/api/db/favorites", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, repoUrl })
        });
    };

    const handleAddFavorite = async () => {
        onClick();

        await fetch("/api/db/favorites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, repoUrl })
        });
    };

    const handleClick = () => {
        if (isFavorite) handleDeleteFavorite();
        else handleAddFavorite();
    };

    return (
        <Button
            variant="toolUnbordered"
            onClick={handleClick}
        >
            <Star
                color="var(--star-color)"
                fill={isFavorite ? "var(--star-color)" : "none"}
            />
        </Button>
    );
}