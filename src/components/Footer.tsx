"use client";

import styles from "@/styles/Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <span>&copy; {new Date().getFullYear()}. NoteHub</span>
                </div>
                <div className={styles.right}>
                    <span>Github | </span>
                    <span>LinkedIn</span>
                </div>
            </div>
        </footer>
    );
}