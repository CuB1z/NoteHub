import styles from "@/styles/Layout.module.css";

import Header from "@/components/Header";
import SessionWrapper from "@/components/wrappers/SessionWrapper";

import { Session } from "next-auth";
import Footer from "@/components/sections/Footer";

type Props = {
    session: Session | null;
    children: React.ReactNode;
};

export default function Layout({ session, children }: Props) {
    return (
        <SessionWrapper>
            <div className={styles.container}>
                <Header session={session}/>
                    <div className={styles.content}>
                        {children}
                    </div>
                <Footer />
            </div>
        </SessionWrapper>
    )
}