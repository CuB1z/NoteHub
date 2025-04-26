import styles from "@/styles/RepoCard.module.css";

import { RepositoryData } from "@/types/RepositoryData";
import { Github, Search, StarIcon } from "lucide-react";
import Link from "next/link";
import Button from "@/components/buttons/Button";

export default function RepoCard({ repo }: { repo: RepositoryData }) {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h3 className={styles.title}>{`${repo.owner.name}/${repo.name}`}</h3>
                <div className={styles.stars}>
                    <span className={styles.count}>{repo.stars}</span>
                    <StarIcon strokeWidth={2} className={styles.starIcon} />
                </div>
            </div>
            <div className={styles.tags}>
                {repo.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                ))}
            </div>
            <p className={styles.description}>{repo.description}</p>
            <div className={styles.cardFooter}>
                <Link href={`/${repo.owner.name}`} className={styles.avatarContainer}>
                    <img src={repo.owner.avatar} alt={`${repo.owner.name} avatar`} className={styles.avatar} />
                </Link>
                <div className={styles.right}>
                    <Button
                        variant="tool"
                        isLink
                        target="_blank"
                        href={repo.url}
                    ><Github className={styles.icon} /></Button>
                    <Button
                        variant="tool"
                        isLink
                        target="_self"
                        href={`${repo.owner.name}/${repo.name}`}
                    ><Search className={styles.icon} /></Button>
                </div>
            </div>
        </div>
    )
}