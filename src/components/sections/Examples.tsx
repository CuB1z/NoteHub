import styles from "@/styles/sections/Examples.module.css";

import SectionHeader from "@/components/SectionHeader";
import RepoCardClient from "@/components/clients/RepoCardClient";
import { RepoOptions } from "@/services/RepositoryService";

interface ExampleProps {
    examples: RepoOptions[];
    authToken?: string | null | undefined;
}

export default function Examples({ examples, authToken }: ExampleProps) {
    return (
        <section id="examples" className={styles.examples}>
            <SectionHeader
                style="DARK"
                title="See It In Action"
                description="Explore how NoteHub can be used in different scenarios."
                tag="Some Examples"
            />
            <div className={styles.content}>
                {examples.map((repo, index) => (
                    <RepoCardClient key={index} repo={repo} authToken={authToken} />
                ))}
            </div>
        </section>
    );
}