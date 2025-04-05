import styles from "@/styles/SectionHeader.module.css";

interface SectionHeaderProps {
    title: string;
    tag?: string;
    description?: string;
    style: "DARK" | "LIGHT";
};

export default function SectionHeader({ title, description, tag, style }: SectionHeaderProps) {
    const customStyle = style === "DARK" ? styles.dark : styles.light;

    return (
        <div className={styles.sectionHeader}>
            {tag && <span className={`${styles.tag} ${customStyle}`}>{tag}</span>}
            <h2 className={styles.title}>{title}</h2>
            {description && <p className={styles.description}>{description}</p>}
        </div>
    );
}