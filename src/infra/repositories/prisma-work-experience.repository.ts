import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import { WorkExperience } from "@/domain/entities/work-experience.entity";
import { IWorkExperienceRepository } from "@/domain/repositories/work-experience.repository";

import { PrismaService } from "../db/prisma-service";

@Injectable()
export class PrismaWorkExperienceRepository implements IWorkExperienceRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findByProfileIds(profileIds: number[]): Promise<WorkExperience[]> {
        const result = await this.prisma.workExperience.findMany({
            where: {
                profileId: { in: profileIds },
            },
        });

        return result.map((row) => plainToInstance(WorkExperience, row));
    }
}
