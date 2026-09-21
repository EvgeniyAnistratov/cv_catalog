import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType("Company")
export class CompanySchema {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;
}
