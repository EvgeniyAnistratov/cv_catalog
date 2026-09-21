import { Module } from "@nestjs/common";

import { UseCasesModule } from "@/infra/modules/use-cases.module";

import { ProfileResolver } from "./graphql/resolvers/profile.resolver";

@Module({
    imports: [UseCasesModule],
    providers: [ProfileResolver],
    exports: [ProfileResolver],
})
export class PresentationModule {}
