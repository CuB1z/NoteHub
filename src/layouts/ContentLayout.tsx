"use client";

import styles from "@/styles/Layout.module.css";
import { Session } from "next-auth";
import { ReactNode, useState } from "react";

import Layout from "./Layout";
import BreadCrumb from "@/components/BreadCrumb";
import SideBarButton from "@/components/buttons/SideBarButton";

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
    const [isTreeOpen, setIsTreeOpen] = useState(false);

    return (
        <Layout session={session}>
            <div className={styles.gridLayout}>
                <aside className={`${styles.sidebar} ${styles.left} ${isTreeOpen ? styles.open : ""}`}>
                    <div className={styles.sidebarTitle}>
                        <h2 className={styles.title}>Knowledge</h2>
                        <div className="mobile-only">
                            <SideBarButton action="CLOSE" onToggle={() => setIsTreeOpen(false)} />
                        </div>
                    </div>
                    {fileTree}
                </aside>
                <main className={styles.mainContent}>
                    <BreadCrumb
                        githubOwner={githubOwner}
                        githubRepo={githubRepo}
                        session={session}
                        onToggleFileTree={() => setIsTreeOpen(!isTreeOpen)}
                    />
                    {disabled ? (
                        <div className={styles.disabledOverlay}>
                            {children}
                        </div>
                    ) : (children)}
                </main>
                <aside className={`${styles.sidebar} ${styles.right}`}>
                    <div className={styles.sidebarTitle}>
                        <h2 className={styles.title}>Table of Contents</h2>
                    </div>
                    {toc}
                </aside>
            </div>
        </Layout>
    );
}
