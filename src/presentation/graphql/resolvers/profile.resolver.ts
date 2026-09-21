import { Args, Int, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";

import { GetProfileUseCase } from "@/application/use-cases/get-profile.use-case";
import { GetProfilesUseCase } from "@/application/use-cases/get-profiles.use-case";

import { ProfileSchema } from "../schemas/profile.schema";

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

    @ResolveField()
    async usefulLinks(@Parent() profile: ProfileSchema) {
        return [];
    }

    @ResolveField()
    async skills(@Parent() profile: ProfileSchema) {
        return [];
    }

    @ResolveField()
    async workExperience(@Parent() profile: ProfileSchema) {
        return [];
    }

    @ResolveField()
    async projects(@Parent() profile: ProfileSchema) {
        return [];
    }
}
