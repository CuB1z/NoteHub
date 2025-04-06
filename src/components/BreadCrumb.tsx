import styles from "@/styles/BreadCrumb.module.css";

import { RepoOptions } from "@/services/RepositoryService";
import Button from "./buttons/Button";

export default function BreadCrumb({ githubOwner, githubRepo, path }: RepoOptions) {
    return (
        <div className={styles.breadcrumb}>
            <Button
                label={githubOwner}
                variant="text"
                isLink
                href={`/${githubOwner}`}
            />
            <span>{`${">"}`}</span>
            <Button
                label={githubRepo}
                variant="text"
                isLink
                href={`/${githubOwner}/${githubRepo}`}
            />
            <span>{`${">"}`}</span>
            <Button
                label={path}
                variant="text"
                isLink
                href={`/${githubOwner}/${githubRepo}/${path}`}
            />
        </div>
    );
}