import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { DatabaseConfig } from "../config/db.env";
import { PrismaClient } from "./prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(dbConfig: ConfigService<DatabaseConfig>) {
        const pool = new Pool({
            connectionString: dbConfig.get<string>("DB_URL"),
        });
        const adapter = new PrismaPg(pool);

        super({ adapter });
    }
}
