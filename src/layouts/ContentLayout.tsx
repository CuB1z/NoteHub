import styles from "@/styles/Layout.module.css";
import { Session } from "next-auth";
import { ReactNode } from "react";

import Layout from "./Layout";

type Props = {
    session: Session | null;
    children: ReactNode;
    fileTree: ReactNode;
    toc: ReactNode;
    disabled?: boolean;
};

export default function ContentLayout({ session, children, fileTree, toc, disabled }: Props) {
    return (
        <Layout session={session}>
            <div className={styles.gridLayout}>
                <aside className={styles.sidebar}>{fileTree}</aside>
                <main className={styles.mainContent}>
                    {disabled ? (
                        <div className={styles.disabledOverlay}>
                            {children}
                        </div>
                    ) : (children)}
                </main>
                <aside className={styles.toc}>{toc}</aside>
            </div>
        </Layout>
    );
}
