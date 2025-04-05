import styles from "@/styles/SectionHeader.module.css";

interface SectionHeaderProps {
    title: string;
    tag?: string;
    description?: string;
};

export default function SectionHeader({ title, description, tag }: SectionHeaderProps) {
    return (
        <div className={styles.sectionHeader}>
            {tag && <span className={styles.tag}>{tag}</span>}
            <h2 className={styles.title}>{title}</h2>
            {description && <p className={styles.description}>{description}</p>}
        </div>
    );
}