
export function validateRepoUrl(repoUrl: string): boolean {
    const repoUrlRegex = /^(https?:\/\/)?(www\.)?github\.com\/[^\/]+\/[^\/]+$/;
    return repoUrlRegex.test(repoUrl);
}