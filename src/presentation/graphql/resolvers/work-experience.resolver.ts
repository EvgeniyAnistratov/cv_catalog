import { Args, Int, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Loader } from "@strv/nestjs-dataloader";

import type { WorkExpCompaniesLoader } from "../data-loaders/company.loader";

import { WorkExpCompaniesLoaderFactory } from "../data-loaders/company.loader";
import { WorkExperienceSchema } from "../schemas/work-experience.schema";

@Resolver(() => WorkExperienceSchema)
export class WorkExperienceResolver {
    constructor() {}

    @ResolveField()
    async company(
        @Parent() workExpereince: WorkExperienceSchema,
        @Loader(WorkExpCompaniesLoaderFactory) companiesLoader: WorkExpCompaniesLoader,
    ) {
        const result = await companiesLoader.load(workExpereince.id);
        return result;
    }
}
