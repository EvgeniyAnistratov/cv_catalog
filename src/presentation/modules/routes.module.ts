import { Module } from "@nestjs/common";

import { AppRoute } from "../routes/app.route";

@Module({
    controllers: [AppRoute],
})
export class RouteModule {}
