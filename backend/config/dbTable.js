import { sql } from "./db.js"

export const initDb = async () => {

    try {
        await sql`
            CREATE TABLE IF NOT EXISTS projects (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                technology TEXT NOT NULL,
                summary TEXT NOT NULL,
                description TEXT NOT NULL,
                image TEXT NOT NULL,
                github VARCHAR(255) NOT NULL,
                website VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

        console.log("Database initialised.")

    } catch (error) {
        console.log(`Error initialising database: ${error.message}`)
    }
}