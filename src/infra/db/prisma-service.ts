import { Injectable } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";

import { dbEnv } from "../config/db.env";
import { PrismaClient } from "./prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        const adapter = new PrismaPg({ connectionString: dbEnv.databaseUrl });
        super({ adapter });
    }
}
