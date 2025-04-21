import { TURSO_DB_URL, TURSO_DB_TOKEN } from "@/config/db";
import { createClient } from "@libsql/client";

export const client = createClient({
    url: TURSO_DB_URL,
    authToken: TURSO_DB_TOKEN,
});