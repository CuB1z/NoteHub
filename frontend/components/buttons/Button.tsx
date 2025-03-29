"use client";

import styles from "@/styles/Button.module.css";

interface ButtonProps {
    label: string;
    isLink?: boolean;
    href?: string;
    onClick: () => void;
    disabled?: boolean;
    variant: "primary" | "secondary";
}

export default function Button({ label, isLink, href, onClick, disabled, variant }: ButtonProps) {
    const customStyles = `${styles.button} ${styles[variant]}`;

    const handleClick = () => {
        if (disabled) return;
        onClick();
    }

    if (isLink) {
        return (
            <a className={customStyles} href={href}>{label}</a>
        );
    }

    return (
        <button className={customStyles} onClick={handleClick} disabled={disabled}>
            {label}
        </button>
    );
}