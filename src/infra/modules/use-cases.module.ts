import { Module } from "@nestjs/common";

import { GetProfileUseCase } from "@/application/use-cases/get-profile.use-case";
import { GetProfilesUseCase } from "@/application/use-cases/get-profiles.use-case";
import { PROFILE_REPOSITORY } from "@/domain/repositories/profile.repository";

import { RepositoriesModule } from "./repositores.module";

@Module({
    imports: [RepositoriesModule],
    providers: [
        {
            provide: GetProfileUseCase,
            useFactory: (...args) => new GetProfileUseCase(...(args as [any])),
            inject: [PROFILE_REPOSITORY],
        },
        {
            provide: GetProfilesUseCase,
            useFactory: (...args) => new GetProfilesUseCase(...(args as [any])),
            inject: [PROFILE_REPOSITORY],
        },
    ],
    exports: [GetProfileUseCase, GetProfilesUseCase],
})
export class UseCasesModule {}
