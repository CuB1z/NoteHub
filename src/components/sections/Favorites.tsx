import styles from "@/styles/sections/Favorites.module.css";

import { RepoOptions } from "@/services/RepositoryService";
import RepoCardClient from "@/components/clients/RepoCardClient";

interface FavoritesProps {
    repos: RepoOptions[];
    authToken?: string | null | undefined;
}


export default function Favorites({ repos, authToken }: FavoritesProps) {
    return (
        <section className={styles.favoritesSection}>
            <h2 className={styles.title}>Favorites</h2>
            <div className={styles.favoritesContainer}>
                {repos.map((repo, index) => <RepoCardClient key={index} repo={repo} authToken={authToken} />)}
            </div>
        </section>
    );
}