import { Field, Int, ObjectType } from "@nestjs/graphql";

import { CompanySchema } from "./company.schema";

@ObjectType("WorkExperience")
export class WorkExperienceSchema {
    @Field(() => Int)
    id: number;

    @Field()
    position: string;

    @Field()
    achievement: string;

    @Field()
    startedAt: Date;

    @Field()
    endedAt?: Date;

    @Field(() => CompanySchema)
    company: CompanySchema;
}
