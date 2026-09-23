import { Module } from "@nestjs/common";

import { UseCasesModule } from "@/presentation/modules/use-cases.module";

import { ProfileResolver } from "../graphql/resolvers/profile.resolver";
import { WorkExperienceResolver } from "../graphql/resolvers/work-experience.resolver";

@Module({
    imports: [UseCasesModule],
    providers: [ProfileResolver, WorkExperienceResolver],
    exports: [ProfileResolver, WorkExperienceResolver],
})
export class PresentationModule {}
