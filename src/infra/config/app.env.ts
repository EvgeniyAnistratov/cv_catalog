import { env } from "./env";

export const appEnv = {
    listenHost: env.APP_LISTEN_HOST,
    listenPort: env.APP_LISTEN_PORT,
} as const;
