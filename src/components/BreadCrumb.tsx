import styles from "@/styles/BreadCrumb.module.css";

import { RepoOptions } from "@/services/RepositoryService";
import { Home } from "lucide-react";
import Button from "./buttons/Button";

export default function BreadCrumb({ githubOwner, githubRepo }: RepoOptions) {
    return (
        <div className={styles.breadcrumb}>
            <Button
                label={githubOwner}
                variant="text"
                isLink
                href={`/${githubOwner}`}
            ><Home /></Button>
            <span>{`${">"}`}</span>
            <Button
                label={githubRepo}
                variant="text"
                isLink
                href={`/${githubOwner}/${githubRepo}`}
            />
        </div>
    );
}