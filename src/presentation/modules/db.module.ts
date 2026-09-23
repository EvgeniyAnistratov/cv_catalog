import { Module } from "@nestjs/common";

import { PrismaService } from "@/infra/db/prisma-service";

@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class DbModule {}
