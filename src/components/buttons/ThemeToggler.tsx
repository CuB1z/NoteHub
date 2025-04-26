"use client";

import styles from "@/styles/ThemeToggler.module.css";

import { useState, useRef, useEffect } from "react";
import Button from "@/components/buttons/Button";
import { Blend, BadgeCheck } from "lucide-react";
import { THEME_COOKIE_NAME, THEMES } from "@/config/themes";

interface ThemeTogglerProps {
    currentTheme: string;
}

export default function ThemeToggler({ currentTheme: theme }: ThemeTogglerProps) {
    const [open, setOpen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState(theme);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleThemeChange = (theme: string) => {
        setCurrentTheme(theme);
        document.body.className = theme;
        document.cookie = `${THEME_COOKIE_NAME}=${theme}; path=/; max-age=31536000;`;
        setOpen(false);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <div className={styles.container} ref={dropdownRef}>
            <Button
                variant="tool"
                onClick={() => setOpen((prev) => !prev)}
            ><Blend size={20} /></Button>
            {open && (
                <div className={styles.dropdown}>
                    {THEMES.map((theme) => (
                        <div
                            key={theme}
                            className={`${styles.themeOption} ${currentTheme === theme ? styles.active : ''}`}
                            onClick={() => handleThemeChange(theme)}
                        >
                            <span className={styles.text}>{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
                            {currentTheme === theme && <BadgeCheck size={20} className={styles.checkIcon} />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};