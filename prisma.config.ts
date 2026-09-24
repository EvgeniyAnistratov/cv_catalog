import "dotenv/config";
import { defineConfig, env } from "prisma/config";

const dbUser = `${process.env.DB_USER}`;
const dbPassword = `${process.env.DB_PASSWORD}`;
const dbHost = `${process.env.DB_HOST}`;
const dbPort = `${process.env.DB_PORT}`;
const dbName = `${process.env.DB_NAME}`;
const connectionString = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

export default defineConfig({
    schema: "./prisma/schema.prisma",
    migrations: {
        path: "./prisma/migrations",
        seed: "tsx ./prisma/seed.ts",
    },
    datasource: {
        url: connectionString,
    },
});
