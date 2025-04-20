import styles from "@/styles/Loader.module.css";

import { Loader as Ld } from "lucide-react";

export default function Loader({ size = 48 }: { size?: number }) {
    return (
        <div className={styles.container}>
            <Ld
                className={styles.loader}
                style={{ width: size, height: size }}
                color="var(--accent)"
            />
        </div>
    );
}