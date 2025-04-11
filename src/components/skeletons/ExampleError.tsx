import styles from "@/styles/sections/Examples.module.css";
import { WifiOff } from "lucide-react";

export default function ExampleError() {
    return (
        <div className={`${styles.card} ${styles.error}`}>
            <WifiOff className={styles.icon} />
            <p className={styles.errorText}>An error has occurred. Please try again later.</p>
        </div>
    )
}