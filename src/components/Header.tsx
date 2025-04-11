import styles from "@/styles/Header.module.css";

import { Session } from "next-auth";
import Image from "next/image";
import LoginButton from "@/components/buttons/LoginButton";

interface HeaderProps {
    session: Session | null;
}

export default function Header({ session }: HeaderProps) {
    const userName = session?.userName;

    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <a href="/" className={styles.logo}>
                    <h1>NoteHub</h1>
                </a>
                <div className={styles.right}>
                    {session ?
                        <a href={`/${userName || ""}`}>
                            <Image
                                loading="eager"
                                src={session?.user?.image || ""}
                                alt={`${session?.user?.name} profile image`}
                                width={50}
                                height={50}
                                className={styles.userImage}
                            />
                        </a>
                        :
                        <LoginButton />
                    }
                </div>
            </div>
        </header>
    );
}