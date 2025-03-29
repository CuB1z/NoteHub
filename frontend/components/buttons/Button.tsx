"use client";

import styles from "@/styles/Button.module.css";

interface ButtonProps {
    label?: string;
    icon?: string;
    alt?: string;
    iconPosition?: "left" | "right";
    isLink?: boolean;
    href?: string;
    onClick: () => void;
    disabled?: boolean;
    status?: "loading" | "success" | "error";
    variant: "primary" | "secondary" | "tool";
}

export default function Button({
    label, alt, isLink, href, onClick, disabled,
    variant, icon, iconPosition, status
}: ButtonProps) {
    const customStyles = `
        ${styles.button}
        ${styles[variant]}
        ${iconPosition ? styles[iconPosition] : ""}
        ${disabled ? styles.disabled : ""}
        ${status ? styles[status] : ""}
    `;

    const handleClick = () => {
        if (disabled) return;
        onClick();
    }

    const content = (
        <>
            {icon && <img src={icon} alt={alt} className={styles.icon} />}
            {label && <span className={styles.label}>{label}</span>}
        </>
    )

    if (isLink) {
        return (
            <a className={customStyles} href={href}>
                {content}
            </a>
        );
    }

    return (
        <button className={customStyles} onClick={handleClick} disabled={disabled}>
            {content}
        </button>
    );
}