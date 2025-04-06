import styles from "@/styles/SectionHeader.module.css";

interface SectionHeaderProps {
    title: string;
    tag?: string;
    description?: string;
    style: "DARK" | "LIGHT";
    align?: "left" | "center";
};

export default function SectionHeader({ title, description, tag, style, align }: SectionHeaderProps) {
    const tagStyle = `${style === "DARK" ? styles.dark : styles.light}`;
    const alignStyle = `${align === "left" ? styles.left : ""}`;

    return (
        <div className={`${styles.sectionHeader} ${alignStyle}`}>
            {tag && <span className={`${styles.tag} ${tagStyle}`}>{tag}</span>}
            <h2 className={styles.title}>{title}</h2>
            {description && <p className={styles.description}>{description}</p>}
        </div>
    );
}