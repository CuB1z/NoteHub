import styles from "@/styles/sections/Examples.module.css";
import SectionHeader from "@/components/SectionHeader";
import { StarIcon, Github, Search } from "lucide-react";

import { RepositoryData } from "@/types/RepositoryData";
import Button from "../buttons/Button";
import Link from "next/link";

export default function Examples({ examples }: { examples: RepositoryData[] }) {

    return (
        <section id="examples" className={styles.examples}>
            <SectionHeader
                style="DARK"
                title="See It In Action"
                description="Explore how NoteHub can be used in different scenarios."
                tag="Some Examples"
            />
            <div className={styles.content}>
                {
                    examples.map((repo, index) => (
                        <div key={index} className={styles.card}>
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
                    ))
                }
            </div>
        </section>
    );
}