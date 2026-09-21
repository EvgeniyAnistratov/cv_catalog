import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import { validateEnv } from "./infra/config/env";
import { PresentationModule } from "./presentation/presentation.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate: validateEnv,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            graphiql: false,
            autoSchemaFile: true,
            sortSchema: true,
            playground: false,
            plugins: [
                ApolloServerPluginLandingPageLocalDefault({
                    embed: true,
                }),
            ],
        }),
        PresentationModule,
    ],
})
export class AppModule {}
