"use client";

import styles from "@/styles/Button.module.css";
import Link from "next/link";
import { JSX } from "react";

interface ButtonProps {
    label?: string;
    alt?: string;
    iconPosition?: "left" | "right";
    isLink?: boolean;
    target?: "_blank" | "_self";
    href?: string;
    onClick?: () => void;
    disabled?: boolean;
    status?: "loading" | "success" | "error";
    variant: "primary" | "secondary" | "tool" | "toolUnbordered" | "text";
    children?: JSX.Element | JSX.Element[];
}

export default function Button({
    label, isLink, href, onClick, disabled,
    variant, iconPosition, status, children, target
}: ButtonProps) {
    const customStyles = `${styles.button} ${styles[variant]} ${iconPosition ? styles[iconPosition] : ""} ${disabled ? styles.disabled : ""} ${status ? styles[status] : ""}`;

    const handleClick = () => {
        if (disabled) return;
        onClick?.();
    }

    const content = (
        <>
            {children && <div className={styles.icon}>{children}</div>}
            {label && <span className={styles.label}>{label}</span>}
        </>
    )

    if (isLink) {
        return (
            <Link href={href || "#"} target={target} className={customStyles}>
                {content}
            </Link>
        );
    }

    return (
        <button className={customStyles} onClick={handleClick} disabled={disabled}>
            {content}
        </button>
    );
}