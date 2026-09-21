import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType("UsefulLink")
export class UsefulLinkSchema {
    @Field(() => Int)
    id: number;

    @Field()
    link: string;
}
