import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType("Skill")
export class SkillSchema {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;
}
