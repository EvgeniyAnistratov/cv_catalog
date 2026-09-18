import { z } from "zod";

export const envSchema = z.object({
    APP_LISTEN_HOST: z.string().default("0.0.0.0"),
    APP_LISTEN_PORT: z.coerce.number().default(3000),

    DB_URL: z.string(),
});
