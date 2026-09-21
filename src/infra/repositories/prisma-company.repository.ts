import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import type { ICompanyRepository } from "@/domain/repositories/company.repository";

import { Company } from "@/domain/entities/company.entity";

import { PrismaService } from "../db/prisma-service";

@Injectable()
export class PrismaCompanyRepository implements ICompanyRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findByWorkExpIds(workExpIds: number[]): Promise<Company[]> {
        const result = await this.prisma.company.findMany({
            relationLoadStrategy: "join",
            where: {
                workExperiences: { some: { id: { in: workExpIds } } },
            },
        });

        return result.map((row) => plainToInstance(Company, row));
    }
}
