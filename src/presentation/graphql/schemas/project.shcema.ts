import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType("Project")
export class ProjectSchema {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    link: string;
}
