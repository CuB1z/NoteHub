import styles from "@/styles/RepoCard.module.css";

export default function RepoCardSkeleton() {
    return (
        <div className={`${styles.card} ${styles.skeletonContainer}`}>
            <div className={styles.cardHeader}>
                <h3 className={`${styles.title} ${styles.skeletonTitle}`}></h3>
                <div className={styles.stars}>
                    <span className={`${styles.count} ${styles.skeletonCount}`}></span>
                    <div className={`${styles.starIcon} ${styles.skeletonIcon}`}></div>
                </div>
            </div>
            <div className={styles.tags}>
                {[1, 2, 3].map((_, index) => (
                    <span
                        key={index}
                        className={`${styles.tag} ${styles.skeletonTag}`}
                    ></span>
                ))}
            </div>
            <p className={`${styles.description} ${styles.skeletonDescription}`}></p>
            <div className={styles.cardFooter}>
                <div className={`${styles.avatarContainer} ${styles.skeletonAvatar}`}></div>
                <div className={styles.right}>
                    <div className={`${styles.icon} ${styles.skeletonIcon}`}></div>
                    <div className={`${styles.icon} ${styles.skeletonIcon}`}></div>
                </div>
            </div>
        </div>
    );
}