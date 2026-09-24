import { Args, Int, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Loader } from "@strv/nestjs-dataloader";

import { GetProfileUseCase } from "@/application/use-cases/get-profile.use-case";
import { GetProfilesUseCase } from "@/application/use-cases/get-profiles.use-case";

import type { ProfileProjectsLoader } from "../data-loaders/project.loader";
import type { ProfileSkillsLoader } from "../data-loaders/skill.loader";
import type { ProfileUsefulLinksLoader } from "../data-loaders/useful-link.loader";
import type { ProfileWorkExpsLoader } from "../data-loaders/work-exp.loader";

import { ProfileProjectsLoaderFactory } from "../data-loaders/project.loader";
import { ProfileSkillsLoaderFactory } from "../data-loaders/skill.loader";
import { ProfileUsefulLinksLoaderFactory } from "../data-loaders/useful-link.loader";
import { ProfileWorkExpsLoaderFactory } from "../data-loaders/work-exp.loader";
import { ProfileSchema } from "../schemas/profile.schema";
import { ProjectSchema } from "../schemas/project.shcema";
import { SkillSchema } from "../schemas/skill.schema";
import { UsefulLinkSchema } from "../schemas/useful-link.schema";
import { WorkExperienceSchema } from "../schemas/work-experience.schema";

@Resolver(() => ProfileSchema)
export class ProfileResolver {
    constructor(
        private getProfileUseCase: GetProfileUseCase,
        private getProfilesUseCase: GetProfilesUseCase,
    ) {}

    @Query(() => ProfileSchema)
    async profile(@Args("id", { type: () => Int }) id: number) {
        return await this.getProfileUseCase.execute({ id: id });
    }

    @Query(() => [ProfileSchema])
    async profiles() {
        return await this.getProfilesUseCase.execute();
    }

    @ResolveField(() => [UsefulLinkSchema])
    async usefulLinks(
        @Parent() profile: ProfileSchema,
        @Loader(ProfileUsefulLinksLoaderFactory) usefulLinksLoader: ProfileUsefulLinksLoader,
    ) {
        const result = await usefulLinksLoader.load(profile.id);
        return result?.values ?? [];
    }

    @ResolveField(() => [SkillSchema])
    async skills(
        @Parent() profile: ProfileSchema,
        @Loader(ProfileSkillsLoaderFactory) skillsLoader: ProfileSkillsLoader,
    ) {
        const result = await skillsLoader.load(profile.id);
        return result?.values ?? [];
    }

    @ResolveField(() => [WorkExperienceSchema])
    async workExperience(
        @Parent() profile: ProfileSchema,
        @Loader(ProfileWorkExpsLoaderFactory) workExpsLoader: ProfileWorkExpsLoader,
    ) {
        const result = await workExpsLoader.load(profile.id);
        return result?.values ?? [];
    }

    @ResolveField(() => [ProjectSchema])
    async projects(
        @Parent() profile: ProfileSchema,
        @Loader(ProfileProjectsLoaderFactory) projectsLoader: ProfileProjectsLoader,
    ) {
        const result = await projectsLoader.load(profile.id);
        return result?.values ?? [];
    }
}
