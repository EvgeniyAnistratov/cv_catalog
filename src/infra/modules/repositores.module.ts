import { Module } from "@nestjs/common";

import { COMPANY_REPOSITORY } from "@/domain/repositories/company.repository";
import { PROFILE_REPOSITORY } from "@/domain/repositories/profile.repository";
import { PROJECT_REPOSITORY } from "@/domain/repositories/project.repository";
import { SKILL_REPOSITORY } from "@/domain/repositories/skill.repository";
import { USEFUL_LINK_REPOSITORY } from "@/domain/repositories/useful-link.repository";
import { WORK_EXPERIENCE_REPOSITORY } from "@/domain/repositories/work-experience.repository";

import { PrismaCompanyRepository } from "../repositories/prisma-company.repository";
import { PrismaProfileRepository } from "../repositories/prisma-profile.repository";
import { PrismaProjectRepository } from "../repositories/prisma-project.repository";
import { PrismaSkillRepository } from "../repositories/prisma-skill.repository";
import { PrismaUsefulLinkRepository } from "../repositories/prisma-useful-link.repository";
import { PrismaWorkExperienceRepository } from "../repositories/prisma-work-experience.repository";
import { DbModule } from "./db.module";

@Module({
    imports: [DbModule],
    providers: [
        {
            provide: COMPANY_REPOSITORY,
            useClass: PrismaCompanyRepository,
        },
        {
            provide: PROFILE_REPOSITORY,
            useClass: PrismaProfileRepository,
        },
        {
            provide: PROJECT_REPOSITORY,
            useClass: PrismaProjectRepository,
        },
        {
            provide: SKILL_REPOSITORY,
            useClass: PrismaSkillRepository,
        },
        {
            provide: USEFUL_LINK_REPOSITORY,
            useClass: PrismaUsefulLinkRepository,
        },
        {
            provide: WORK_EXPERIENCE_REPOSITORY,
            useClass: PrismaWorkExperienceRepository,
        },
    ],
    exports: [
        COMPANY_REPOSITORY,
        PROFILE_REPOSITORY,
        PROJECT_REPOSITORY,
        SKILL_REPOSITORY,
        USEFUL_LINK_REPOSITORY,
        WORK_EXPERIENCE_REPOSITORY,
    ],
})
export class RepositoriesModule {}
