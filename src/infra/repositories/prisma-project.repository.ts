import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import type { IProjectRepository } from "@/domain/repositories/project.repository";

import { Project } from "@/domain/entities/project.entity";

import { PrismaService } from "../db/prisma-service";

@Injectable()
export class PrismaProjectRepository implements IProjectRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findByProfileIds(profileIds: number[]): Promise<Project[]> {
        const result = await this.prisma.project.findMany({
            where: {
                profileId: { in: profileIds },
            },
            orderBy: {
                id: "desc",
            },
        });

        return result.map((row) => plainToInstance(Project, row));
    }
}
