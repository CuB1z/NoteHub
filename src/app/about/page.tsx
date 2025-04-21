import styles from "@/styles/About.module.css";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { APP_NAME } from "@/config/metadata";
import { ABOUT_SECTION_DATA } from "@/config/aboutSectionData";

import Layout from "@/layouts/Layout";

export default async function About() {
    const session = await getServerSession(authOptions);

    return (
        <Layout session={session}>
            <div className={styles.aboutContainer}>
                <h1 className={styles.heading}>About <em className={styles.em}>{APP_NAME}</em></h1>
                {ABOUT_SECTION_DATA.map((section, index) => (
                    <section key={index} className={styles.section}>
                        <h2 className={styles.title}>{section.title}</h2>
                        {section.paragraphs.map((paragraph, index) => (
                            <p key={index} className={styles.paragraph}>{paragraph}</p>
                        ))}
                    </section>
                ))}
            </div>
        </Layout>
    )
}