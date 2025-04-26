import styles from "@/styles/RepoCard.module.css";
import { WifiOff, FolderLock } from "lucide-react";

interface RepoCardErrorProps {
    isPrivate?: boolean;
}

export default function RepoCardError({ isPrivate }: RepoCardErrorProps) {
    const text = isPrivate
        ? "This repository is private and cannot be accessed."
        : "An error has occurred. Please try again later.";
    
    const icon = isPrivate
        ? <FolderLock className={styles.icon} />
        : <WifiOff className={styles.icon} />;

    return (
        <div className={`${styles.card} ${styles.error}`}>
            {icon}
            <p className={styles.errorText}>{text}</p>
        </div>
    )
}