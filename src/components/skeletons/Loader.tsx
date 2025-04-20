import styles from "@/styles/Loader.module.css";

import { Loader2Icon } from "lucide-react";

export default function Loader({ size = 48 }: { size?: number }) {
    return (
        <div className={styles.container}>
            <Loader2Icon
                className={styles.loader}
                style={{ width: size, height: size }}
                color="var(--accent)"
            />
        </div>
    );
}