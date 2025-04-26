import styles from "@/styles/Header.module.css";

import { Session } from "next-auth";
import { cookies } from "next/dist/server/request/cookies";
import { DEFAULT_THEME, THEME_COOKIE_NAME } from "@/config/themes";

import Image from "next/image";
import Link from "next/link";
import LoginButton from "@/components/buttons/LoginButton";
import ThemeToggler from "@/components/buttons/ThemeToggler";

interface HeaderProps {
    session: Session | null;
}

export default async function Header({ session }: HeaderProps) {
    const userName = session?.userName;
    const currentTheme = (await cookies()).get(THEME_COOKIE_NAME)?.value || DEFAULT_THEME;

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
                    <ThemeToggler currentTheme={currentTheme} />
                </div>
            </div>
        </header>
    );
}