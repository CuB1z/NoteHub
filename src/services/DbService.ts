import { client } from "@/db/client";

/**
 * Add a new user to the database if they don't already exist.
 * 
 * @param { username } - The username of the user to add.
 * @returns {Promise<void>} - A promise that resolves when the user is added.
*/
export async function addNewUser({ username }: { username: string }): Promise<void> {
    const res = await client.execute({
        sql: "INSERT OR IGNORE INTO users (username) VALUES (?)",
        args: [username],
    })

    console.log(" + [DbService] > Added new user:", username);
}

/**
 * Delete a user from the database.
 * 
 * @param { username } - The username of the user to delete.
 * @returns {Promise<void>} - A promise that resolves when the user is deleted.
*/
export async function addFavouriteRepo(username: string, repoUrl: string): Promise<void> {
    const res = await client.execute({
        sql: "INSERT OR IGNORE INTO favorites (username, repo_url) VALUES (?, ?)",
        args: [username, repoUrl],
    })

    console.log(" + [DbService] > Added favourite repo:", username, repoUrl);
}

/**
 * Delete a user's favourite repository from the database.
 * 
 * @param { username } - The username of the user.
 * @param { repoUrl } - The URL of the repository to delete.
 * @returns {Promise<void>} - A promise that resolves when the repository is deleted.
*/
export async function deleteFavouriteRepo(username: string, repoUrl: string): Promise<void> {
    const res = await client.execute({
        sql: "DELETE FROM favorites WHERE username = ? AND repo_url = ?",
        args: [username, repoUrl],
    })

    console.log(" + [DbService] > Deleted favourite repo:", username, repoUrl);
}

/**
 * Get a user's favorite repositories from the database.
 * 
 * @param { username } - The username of the user.
 * @returns {Promise<string[]>} - A promise that resolves to an array of repository URLs.
*/
export async function getUserFavoriteRepos(username: string): Promise<string[]> {
    const res = await client.execute({
        sql: "SELECT repo_url FROM favorites WHERE username = ?",
        args: [username],
    })


    if (res.rows.length === 0) {
        console.log(" + [DbService] > No favourite repos found for user:", username);
    }
    else {
        console.log(" + [DbService] > Fetched favourite repos for user:", username, res.rows);
    }
    return res.rows.map((row) => row.repo_url as string);
}