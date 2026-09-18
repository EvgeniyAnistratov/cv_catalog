import { env } from "./env";

function buildDatabaseUrl() {
    return (
        `postgresql://` +
        `${encodeURIComponent(env.DB_USER)}:` +
        `${encodeURIComponent(env.DB_PASSWORD)}@` +
        `${env.DB_HOST}:${env.DB_PORT}/` +
        `${encodeURIComponent(env.DB_NAME)}`
    );
}

export const dbEnv = {
    host: env.DB_HOST,
    port: env.DB_PORT,
    name: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    databaseUrl: buildDatabaseUrl(),
} as const;
