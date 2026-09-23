import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import { UsefulLink } from "@/domain/entities/useful-link.entity";
import { IUsefulLinkRepository } from "@/domain/repositories/useful-link.repository";

import { PrismaService } from "../db/prisma-service";

@Injectable()
export class PrismaUsefulLinkRepository implements IUsefulLinkRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findByProfileIds(profileIds: number[]): Promise<UsefulLink[]> {
        const result = await this.prisma.usefulLink.findMany({
            where: {
                profileId: { in: profileIds },
            },
            orderBy: {
                id: "desc",
            },
        });

        return result.map((row) => plainToInstance(UsefulLink, row));
    }
}
