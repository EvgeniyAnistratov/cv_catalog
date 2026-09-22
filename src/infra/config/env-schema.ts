import { z } from "zod";

export const envSchema = z.object({
    APP_LISTEN_HOST: z.string().default("0.0.0.0"),
    APP_LISTEN_PORT: z.coerce.number().default(3000),

    DB_HOST: z.string().default("postgres"),
    DB_NAME: z.string().default("cv_catalog_db"),
    DB_PASSWORD: z.string(),
    DB_PORT: z.coerce.number().default(5432),
    DB_USER: z.string().default("postgres"),
    DB_URL: z.string(),
});
