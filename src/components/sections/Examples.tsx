import styles from "@/styles/sections/Examples.module.css";
import SectionHeader from "@/components/SectionHeader";
import { StarIcon, Github, Search } from "lucide-react";

import { RepositoryData } from "@/types/RepositoryData";
import Button from "../buttons/Button";

const examples: RepositoryData[] = [
    {
        name: "NoteHub",
        description: "A simple note-taking app built with React and TypeScript.",
        tags: ["React", "TypeScript", "Note-taking", "Web App", "Frontend"],
        url: "https://github.com/example/notehub",
        stars: 120,
        lastUpdated: "2023-10-01",
        owner: {
            name: "John Doe",
            avatar: "https://avatars.githubusercontent.com/u/121297520?v=4"
        },
    },
    {
        name: "TaskMaster",
        description: "A task management tool to help you stay organized.",
        tags: ["React", "JavaScript", "Task Management"],
        url: "https://github.com/example/taskmaster",
        stars: 85,
        lastUpdated: "2023-09-15",
        owner: {
            name: "Jane Smith",
            avatar: "https://avatars.githubusercontent.com/u/121297520?v=4"
        },
    },
    {
        name: "WeatherApp",
        description: "A weather forecasting app that provides real-time updates.",
        tags: ["React", "API", "Weather"],
        url: "https://github.com/example/weatherapp",
        stars: 50,
        lastUpdated: "2023-08-20",
        owner: {
            name: "Alice Johnson",
            avatar: "https://avatars.githubusercontent.com/u/121297520?v=4"
        },
    },
]

export default function Examples() {

    return (
        <section id="examples" className={styles.examples}>
            <SectionHeader
                style="DARK"
                title="See It In Action"
                description="Explore how NoteHub can be used in different scenarios."
                tag="Some Examples"
            />
            <div className={styles.content}>
                {
                    examples.map((repo, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.left}>
                                    <h3 className={styles.title}>{`${repo.owner.name}/${repo.name}`}</h3>
                                    <div className={styles.tags}>
                                        {repo.tags.slice(0, 3).map((tag, index) => (
                                            <span key={index} className={styles.tag}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.stars}>
                                    <span className={styles.count}>{repo.stars}</span>
                                    <StarIcon strokeWidth={2} className={styles.starIcon} />
                                </div>
                            </div>
                            <p className={styles.description}>{repo.description}</p>
                            <div className={styles.cardFooter}>
                                
                                <div className={styles.avatarContainer}>
                                    <img src={repo.owner.avatar} alt={`${repo.owner.name} avatar`} className={styles.avatar} />
                                </div>
                                <div className={styles.right}>
                                    <Button
                                        variant="tool"
                                        isLink
                                        href={repo.url}
                                    ><Github className={styles.icon} /></Button>
                                    <Button
                                        variant="tool"
                                    ><Search className={styles.icon} /></Button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
}