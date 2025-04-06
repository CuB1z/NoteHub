import styles from "@/styles/sections/Profile.module.css";

import { UserData } from "@/types/UserData";
import Image from "next/image";
import Button from "../buttons/Button";
import { Github, GitFork, UsersRound, Rss } from "lucide-react";

interface ProfileProps {
    userData: UserData;
}

export default function Profile({ userData }: ProfileProps) {
    return (
        <section className={styles.profileSection}>
            <div className={styles.profile}>
                <div className={styles.header}>
                    <div className={styles.userInfo}>
                        <div className={styles.avatarContainer}>
                            <Image
                                src={userData.avatar}
                                alt={userData.name || "Profile Image"}
                                width={100}
                                height={100}
                                className={styles.avatar}
                            />
                        </div>
                        <div className={styles.identity}>
                            <h1 className={styles.name}>{userData.name || userData.username}</h1>
                            <p className={styles.username}>
                                {userData.username && `@${userData.username}`}
                            </p>
                            <p className={styles.bio}>
                                {userData.bio || "No bio available."}
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="primary"
                        label="View on GitHub"
                        isLink
                        href={userData.profileUrl}
                        target="_blank"
                    ><Github className={styles.githubIcon} /></Button>
                </div>
                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <GitFork className={styles.icon} />
                        <span className={styles.statNumber}>{userData.stats.repositories}</span>
                        <span className={styles.statLabel}>Repositories</span>
                    </div>
                    <div className={styles.stat}>
                        <UsersRound className={styles.icon} />
                        <span className={styles.statNumber}>{userData.stats.followers}</span>
                        <span className={styles.statLabel}>Followers</span>
                    </div>
                    <div className={styles.stat}>
                        <Rss className={styles.icon} />
                        <span className={styles.statNumber}>{userData.stats.following}</span>
                        <span className={styles.statLabel}>Following</span>
                    </div>
                </div>
            </div>
        </section>
    );
}