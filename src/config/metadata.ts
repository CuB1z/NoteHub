import { Metadata } from "next";

export const APP_NAME = "NoteHub";
export const APP_SHORT_DESCRIPTION = "Your Knowledge Graph, Anywhere";
export const APP_DESCRIPTION = "Seamlessly render and navigate through your Obsidian vaults stored in GitHub repositories with our powerful viewer. No installation required.";
export const GITHUB_REPO_URL = "https://github.com/CuB1z/NoteHub";

export const AUTHOR = {
    name: "CuB1z",
    url: "https://github.com/CuB1z"
}

export const metadata: Metadata = {
    title: `${APP_NAME} - ${APP_SHORT_DESCRIPTION}`,
    description: APP_DESCRIPTION,
    authors: [AUTHOR]
}