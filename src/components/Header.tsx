import styles from "@/styles/Header.module.css";

import { Session } from "next-auth";
import Image from "next/image";
import LoginButton from "@/components/buttons/LoginButton";
import Link from "next/link";

interface HeaderProps {
    session: Session | null;
}

export default function Header({ session }: HeaderProps) {
    const userName = session?.userName;

    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <Link href="/" className={styles.logo}>
                    <h1>NoteHub</h1>
                </Link>
                <div className={styles.right}>
                    {session ?
                        <Link href={`/${userName || ""}`}>
                            <Image
                                loading="eager"
                                src={session?.user?.image || ""}
                                alt={`${session?.user?.name} profile image`}
                                width={50}
                                height={50}
                                className={styles.userImage}
                            />
                        </Link>
                        :
                        <LoginButton />
                    }
                </div>
            </div>
        </header>
    );
}