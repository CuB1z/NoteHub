import styles from "@/styles/sections/Cta.module.css";

import { Puzzle, Pyramid, Book, Pi, GitBranch, GitGraph } from "lucide-react";

import Button from "@/components/buttons/Button";
import LoginButton from "@/components/buttons/LoginButton";
import SectionHeader from "../SectionHeader";

export default function Cta() {
    const icons = [Puzzle, Pyramid, Book, Pi, GitBranch, GitGraph];

    // [Right, Top, Rotation]
    const positions = [
        [10, 10, -5],
        [70, 20, 8],
        [30, 40, 3],
        [60, 50, -7],
        [20, 70, 6],
        [80, 80, -4],
    ];

    return (
        <div className={styles.cta}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <SectionHeader
                        title="Connect your GitHub to unlock your notes"
                        description="We only read your notes — your data stays safe. Visualize and explore your documentation effortlessly."
                        tag="Get Started Today"
                        style="DARK"
                        align="left"
                    />
                    <div className={styles.ctaButtons}>
                        <Button
                            variant="secondary"
                            label="Learn More"
                            isLink
                            href="/about"
                            target="_self"
                        />
                        <LoginButton />
                    </div>
                </div>
                <div className={styles.right}>
                    {icons.map((Icon, index) => (
                        <Icon
                            key={index}
                            className={styles.icon}
                            style={{
                                position: "absolute",
                                right: `${positions[index][0]}%`,
                                top: `${positions[index][1]}%`,
                                transform: `rotate(${positions[index][2]}deg)`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}