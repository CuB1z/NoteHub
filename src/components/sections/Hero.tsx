import styles from "@/styles/sections/Hero.module.css"
import SearchBar from "@/components/SearchBar"
import { Mouse } from "lucide-react"

export default function Hero() {
    return(
        <div className={styles.hero}>
            <h1 className={styles.h1}>Your <em className={styles.em}>Knowledge Graph</em>, Anywhere</h1>
            <p className={styles.description}>Seamlessly render and navigate through your Obsidian vaults stored in GitHub repositories with our powerful viewer. No installation required.</p>
            <SearchBar />
            <div className={styles.scroll}>
                <span>Scroll to explore more</span>
                <div className={styles.scrollIcon}>
                    <Mouse />
                </div>
            </div>
        </div>
    )
}