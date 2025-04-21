import styles from "@/styles/Layout.module.css";
import { Session } from "next-auth";
import { ReactNode } from "react";

import Layout from "./Layout";
import BreadCrumb from "@/components/BreadCrumb";

type Props = {
    session: Session | null;
    children: ReactNode;
    githubOwner: string;
    githubRepo: string;
    fileTree: ReactNode;
    toc: ReactNode;
    disabled?: boolean;
};

export default function ContentLayout({ session, children, fileTree, toc, disabled, githubOwner, githubRepo }: Props) {
    return (
        <Layout session={session}>
            <div className={styles.gridLayout}>
                <aside className={`${styles.sidebar} ${styles.left}`}>
                    <h2 className={styles.sidebarTitle}>Knowledge</h2>
                    {fileTree}
                </aside>
                <main className={styles.mainContent}>
                    <BreadCrumb githubOwner={githubOwner} githubRepo={githubRepo} session={session} />
                    {disabled ? (
                        <div className={styles.disabledOverlay}>
                            {children}
                        </div>
                    ) : (children)}
                </main>
                <aside className={`${styles.sidebar} ${styles.right}`}>
                    <h2 className={styles.sidebarTitle}>Table of Contents</h2>
                    {toc}
                </aside>
            </div>
        </Layout>
    );
}
