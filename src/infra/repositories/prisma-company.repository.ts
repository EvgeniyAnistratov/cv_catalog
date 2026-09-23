import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import type {
    CompanyOnWorkExp,
    ICompanyRepository,
} from "@/domain/repositories/company.repository";

import { Company } from "@/domain/entities/company.entity";

import { PrismaService } from "../db/prisma-service";

@Injectable()
export class PrismaCompanyRepository implements ICompanyRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findByWorkExpIds(workExpIds: number[]): Promise<CompanyOnWorkExp[]> {
        const result = await this.prisma.workExperience.findMany({
            relationLoadStrategy: "join",
            include: {
                company: true,
            },
            where: {
                id: { in: workExpIds },
            },
            omit: {
                position: true,
                achievement: true,
                startedAt: true,
                endedAt: true,
                profileId: true,
                companyId: true,
            },
        });

        return result.map((flatRow) => ({
            workExpId: flatRow.id,
            company: plainToInstance(Company, flatRow.company),
        }));
    }
}
