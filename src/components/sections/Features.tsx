import styles from "@/styles/sections/Features.module.css";
import SectionHeader from "@/components/SectionHeader";

import {
    Github,
    Settings,
    GraduationCap
} from "lucide-react";

const features = [
    {
        icon: <GraduationCap className="icon accent" />,
        title: "Markdown Rendering",
        description: "Fully supports Markdown rendering, special oriented to Obsidian and more.",
    },
    {
        icon: <Github className="icon accent" />,
        title: "Github Integration",
        description: "Seamlessly connects to any GitHub repository with secure authentication for private repos.",
    },
    {
        icon: <Settings className="icon accent" />,
        title: "Theme Customization",
        description: "Customize the theme to match your style and preferences.",
    }
]

export default function Features() {
    return (
        <div id="features" className={styles.features}>
            <SectionHeader
                title="Everything You Need for Your Notes"
                description="Our platform provides all the tools you need to visualize and interact with your notes stored in GitHub."
                tag="Powerful Features"
            />
            <div className={styles.featuresList}>
                {features.map((feature, index) => (
                    <div key={index} className={styles.featureItem}>
                        <div className={styles.iconContainer}>
                            {feature.icon}
                        </div>
                        <h3 className={styles.title}>{feature.title}</h3>
                        <p className={styles.description}>{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}