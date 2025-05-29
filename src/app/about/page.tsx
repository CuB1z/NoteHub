import styles from "@/styles/About.module.css";

import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";

import { APP_NAME, GITHUB_REPO_URL } from "@/config/metadata";
import { ABOUT_SECTION_DATA } from "@/config/aboutSectionData";
import { metadata as meta } from "@/config/metadata";

import Layout from "@/layouts/Layout";
import Link from "next/link";
import Button from "@/components/buttons/Button";
import { GithubIcon } from "lucide-react";

export const metadata = meta;

export default async function About() {
    const session = await getServerSession(authOptions);

    return (
        <Layout session={session}>
            <div className={styles.aboutContainer}>
                <div className={styles.content}>
                    {/* Header */}
                    <div className={styles.header}>
                        <span className={styles.badge}>Open Source</span>
                        <h1 className={styles.heading}>
                            About <em className={styles.em}>{APP_NAME}</em>
                        </h1>
                        <p className={styles.subtitle}>
                            Access your Obsidian notes from anywhere, with privacy and flexibility at the core.
                        </p>
                    </div>

                    {/* Sections */}
                    {ABOUT_SECTION_DATA.map((section, index) => (
                        <section key={index} className={styles.section}>
                            <h2 className={styles.title}>{section.title}</h2>
                            <div className={styles.paragraphContainer}>
                                {section.paragraphs.map((paragraph, paragraphIndex) => (
                                    <p key={paragraphIndex} className={styles.paragraph}>
                                        {paragraph.includes('NotionLovers') ? (
                                            <>
                                                {paragraph.split('NotionLovers')[0]}
                                                <Link
                                                    href="https://notionlovers.vercel.app/"
                                                    className={styles.link}
                                                    target="_blank"
                                                >
                                                    NotionLovers
                                                </Link>
                                                {paragraph.split('NotionLovers')[1]?.replace(' (https://notionlovers.vercel.app/)', '')}
                                            </>
                                        ) : (
                                            paragraph
                                        )}
                                    </p>
                                ))}
                            </div>
                        </section>
                    ))}

                    {/* Join Us Section */}
                    <section className={styles.joinSection}>
                        <h2 className={styles.joinTitle}>Join Our Open Source Journey</h2>
                        <p className={styles.joinDescription}>
                            {APP_NAME} is built by the community, for the community. We welcome contributors of all skill levels.
                        </p>
                        <div className={styles.buttonContainer}>
                            <Button
                                variant="primary"
                                label="View on GitHub"
                                href={GITHUB_REPO_URL}
                                target="_blank"
                                iconPosition="left"
                                isLink
                            >
                                <GithubIcon className="icon" />
                            </Button>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    )
}
