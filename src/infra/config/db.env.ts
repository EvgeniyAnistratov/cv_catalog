import { env } from "./env";

export const dbEnv = {
    databaseUrl: env.DB_URL,
} as const;
