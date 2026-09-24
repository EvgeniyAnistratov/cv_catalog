import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { DataloaderModule } from "@strv/nestjs-dataloader";

import { validateEnv } from "./infra/config/env";
import { formatError } from "./presentation/graphql/error-handler";
import { DataLoadersModule } from "./presentation/modules/data-loaders.module";
import { PresentationModule } from "./presentation/modules/resolvers.module";
import { RouteModule } from "./presentation/modules/routes.module";

@Module({
    imports: [
        DataloaderModule.forRoot(),
        ConfigModule.forRoot({
            isGlobal: true,
            validate: validateEnv,
            expandVariables: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            debug: false,
            formatError: formatError,
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
        DataLoadersModule,
        RouteModule,
    ],
})
export class AppModule {}
