import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import type { ISkillRepository } from "@/domain/repositories/skill.repository";

import { Skill } from "@/domain/entities/skill.entity";

import { PrismaService } from "../db/prisma-service";

@Injectable()
export class PrismaSkillRepository implements ISkillRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findByProfileIds(profileIds: number[]): Promise<Skill[]> {
        const result = await this.prisma.skill.findMany({
            relationLoadStrategy: "join",
            where: {
                skillsOnProfiles: {
                    some: {
                        profileId: { in: profileIds },
                    },
                },
            },
        });

        return result.map((row) => plainToInstance(Skill, row));
    }
}
