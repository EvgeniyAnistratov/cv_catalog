import { Controller, Get, Redirect } from "@nestjs/common";

@Controller()
export class AppRoute {
    @Get("/")
    @Redirect("/graphql", 302)
    redirectToGraphql() {}
}
