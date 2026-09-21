import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import type { IProfileRepository } from "@/domain/repositories/profile.repository";

import { Profile } from "@/domain/entities/profile.entity";

import { PrismaService } from "../db/prisma-service";

@Injectable()
export class PrismaProfileRepository implements IProfileRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<Profile[]> {
        const result = await this.prisma.profile.findMany({ orderBy: { id: "desc" } });
        return result.map((row) => plainToInstance(Profile, row));
    }

    async findById(profileId: number): Promise<Profile | null> {
        const result = await this.prisma.profile.findFirst({ where: { id: profileId } });
        return result ? plainToInstance(Profile, result) : null;
    }

    async save(profile: Profile): Promise<Profile> {
        const result = await this.prisma.profile.create({
            data: { name: profile.name, shortDescription: profile.shortDescription },
        });

        return plainToInstance(Profile, result);
    }
}
