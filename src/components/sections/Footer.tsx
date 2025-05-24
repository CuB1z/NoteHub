"use client"

import styles from "@/styles/sections/Footer.module.css"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

import Link from "next/link"
import Button from "@/components/buttons/Button"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.section}>
                        <h3 className={styles.title}>NoteHub</h3>
                        <p className={styles.description}>
                            NoteHub is an open-source project designed to allow users to view their GitHub repositories from anywhere.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h4 className={`${styles.sectionTitle} ${styles.right}`}>Created by <strong className={styles.author}>CuB1z</strong></h4>
                        <div className={styles.socialLinks}>
                            <Button
                                variant="toolUnbordered"
                                isLink
                                href="https://github.com/CuB1z"
                                target="_blank"
                            ><Github /></Button>
                            <Button
                                variant="toolUnbordered"
                                isLink
                                href="https://www.linkedin.com/in/cub1z/"
                                target="_blank"
                            ><Linkedin /></Button>
                        </div>
                    </div>
                </div>
                <div className={styles.separator}></div>
                <h4 className={styles.copyright}>&copy; {currentYear} NoteHub. All rights reserved.</h4>
            </div>
        </footer>
    )
}

