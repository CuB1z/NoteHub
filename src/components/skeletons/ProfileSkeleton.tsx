import styles from "@/styles/sections/Profile.module.css";

export default function ProfileSkeleton() {
  return (
    <section className={styles.profileSection}>
      <div className={styles.profile}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <div className={`${styles.avatarContainer} ${styles.skeleton}`}></div>
            <div className={styles.identity}>
              <h1 className={`${styles.skeletonText} ${styles.skeleton}`}></h1>
              <p className={`${styles.skeletonText} ${styles.skeleton}`}></p>
              <p className={`${styles.skeletonText} ${styles.skeleton}`}></p>
            </div>
          </div>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={`${styles.icon} ${styles.skeletonSmall}`}></div>
            <div className={`${styles.skeletonText} ${styles.skeletonSmall}`}></div>
          </div>
          <div className={styles.stat}>
            <div className={`${styles.icon} ${styles.skeletonSmall}`}></div>
            <div className={`${styles.skeletonText} ${styles.skeletonSmall}`}></div>
          </div>
          <div className={styles.stat}>
            <div className={`${styles.icon} ${styles.skeletonSmall}`}></div>
            <div className={`${styles.skeletonText} ${styles.skeletonSmall}`}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
