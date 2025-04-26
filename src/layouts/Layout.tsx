import styles from "@/styles/Layout.module.css";

import { Session } from "next-auth";
import NextAuthProvider from "@/providers/NextAuthProvider";

import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";

type Props = {
    session: Session | null;
    children: React.ReactNode;
};

export default function Layout({ session, children }: Props) {
    return (
        <NextAuthProvider>
            <div className={styles.container}>
                <Header session={session}/>
                    <div className={styles.content}>
                        {children}
                    </div>
                <Footer />
            </div>
        </NextAuthProvider>
    )
}