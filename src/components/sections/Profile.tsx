import styles from "@/styles/sections/Profile.module.css";

import Image from "next/image";
import { UserData } from "@/types/UserData";
import { RepoOptions } from "@/services/RepositoryService";

import Button from "@/components/buttons/Button";
import LogOutButton from "@/components/buttons/LogOutButton";
import Favorites from "@/components/sections/Favorites";
import { Github, GitFork, UsersRound, Rss } from "lucide-react";
import Loader from "../skeletons/Loader";

interface ProfileProps {
    userData: UserData;
    repos: RepoOptions[];
    isOwner?: boolean;
    authToken?: string | null | undefined;
    isLoading?: boolean;
}

export default function Profile({ userData, isOwner, repos, authToken, isLoading }: ProfileProps) {
    return (
        <>
            <section className={styles.profileSection}>
                <div className={styles.profile}>
                    <div className={styles.header}>
                        <div className={styles.userInfo}>
                            <div className={styles.avatarContainer}>
                                <Image
                                    loading="eager"
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
                        {isOwner && <LogOutButton />}
                        {!isOwner && (
                            <Button
                                variant="primary"
                                label="View on GitHub"
                                isLink
                                href={userData.profileUrl}
                                target="_blank"
                            ><Github className={styles.githubIcon} /></Button>
                        )}
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
            {isOwner && (
                <section className={styles.section}>
                    <div className={styles.content}>
                        <h2 className={styles.title}>Pinned Repositories</h2>
                        {isLoading && <Loader size={24} />}
                        {!isLoading && <Favorites repos={repos} authToken={authToken} profileName={userData.username} />}
                    </div>
                </section>
            )}
        </>
    );
}