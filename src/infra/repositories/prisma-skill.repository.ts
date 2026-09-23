import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import type { ISkillRepository, SkillOnProfile } from "@/domain/repositories/skill.repository";

import { Skill } from "@/domain/entities/skill.entity";

import { PrismaService } from "../db/prisma-service";

@Injectable()
export class PrismaSkillRepository implements ISkillRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findByProfileIds(profileIds: number[]): Promise<SkillOnProfile[]> {
        const result = await this.prisma.skillOnProfile.findMany({
            relationLoadStrategy: "join",
            where: { profileId: { in: profileIds } },
            include: {
                skill: true,
            },
        });

        return result.map((flatRow) => ({
            profileId: flatRow.profileId,
            skill: plainToInstance(Skill, flatRow.skill),
        }));
    }
}
