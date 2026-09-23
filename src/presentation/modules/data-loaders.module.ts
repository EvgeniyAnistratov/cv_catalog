import { Module } from "@nestjs/common";

import { COMPANY_REPOSITORY } from "@/domain/repositories/company.repository";
import { PROJECT_REPOSITORY } from "@/domain/repositories/project.repository";
import { SKILL_REPOSITORY } from "@/domain/repositories/skill.repository";
import { USEFUL_LINK_REPOSITORY } from "@/domain/repositories/useful-link.repository";
import { WORK_EXPERIENCE_REPOSITORY } from "@/domain/repositories/work-experience.repository";

import { WorkExpCompaniesLoaderFactory } from "../graphql/data-loaders/company.loader";
import { ProfileProjectsLoaderFactory } from "../graphql/data-loaders/project.loader";
import { ProfileSkillsLoaderFactory } from "../graphql/data-loaders/skill.loader";
import { ProfileUsefulLinksLoaderFactory } from "../graphql/data-loaders/useful-link.loader";
import { ProfileWorkExpsLoaderFactory } from "../graphql/data-loaders/work-exp.loader";
import { RepositoriesModule } from "./repositores.module";

@Module({
    imports: [RepositoriesModule],
    providers: [
        {
            provide: ProfileUsefulLinksLoaderFactory,
            useFactory: (...args) => new ProfileUsefulLinksLoaderFactory(...(args as [any])),
            inject: [USEFUL_LINK_REPOSITORY],
        },
        {
            provide: ProfileSkillsLoaderFactory,
            useFactory: (...args) => new ProfileSkillsLoaderFactory(...(args as [any])),
            inject: [SKILL_REPOSITORY],
        },
        {
            provide: ProfileProjectsLoaderFactory,
            useFactory: (...args) => new ProfileProjectsLoaderFactory(...(args as [any])),
            inject: [PROJECT_REPOSITORY],
        },
        {
            provide: ProfileWorkExpsLoaderFactory,
            useFactory: (...args) => new ProfileWorkExpsLoaderFactory(...(args as [any])),
            inject: [WORK_EXPERIENCE_REPOSITORY],
        },
        {
            provide: WorkExpCompaniesLoaderFactory,
            useFactory: (...args) => new WorkExpCompaniesLoaderFactory(...(args as [any])),
            inject: [COMPANY_REPOSITORY],
        },
    ],
    exports: [
        ProfileUsefulLinksLoaderFactory,
        ProfileSkillsLoaderFactory,
        ProfileProjectsLoaderFactory,
        ProfileWorkExpsLoaderFactory,
        WorkExpCompaniesLoaderFactory,
    ],
})
export class DataLoadersModule {}
