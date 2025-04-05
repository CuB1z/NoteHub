import styles from "@/styles/sections/Working.module.css";
import SectionHeader from "@/components/SectionHeader"

const steps = [
    {
        number: 1,
        title: "Connect Repository",
        description: "Paste your GitHub repository URL or sign in to access private repositories.",
    },
    {
        number: 2,
        title: "Vault Rendering",
        description: "We automatically parse and render your vault with Markdown support. Allowing you to visualize your notes.",
    },
    {
        number: 3,
        title: "Explore & Share",
        description: "Explore your notes and share them with others or keep them private. The choice is yours.",
    }
]

export default function Working() {
    return (
        <section className={styles.working}>
            <SectionHeader
                title="How it Works"
                description="Get started in seconds with our straightforward process."
                tag="Simple Process"
                style="LIGHT"
            />

            <div className={styles.content}>
                <span className={styles.line}></span>
                {
                    steps.map((step, index) => (
                        <div key={index} className={styles.item}>
                            <span className={styles.bullet}>
                                <span className={styles.number}>{step.number}</span>
                            </span>
                            <h3 className={styles.title}>{step.title}</h3>
                            <p className={styles.description}>{step.description}</p>
                        </div>
                    ))
                }
            </div>
        </section>
    );
}