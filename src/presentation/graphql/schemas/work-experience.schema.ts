import { Field, Int, ObjectType } from "@nestjs/graphql";

import { WorkExperience } from "@/domain/entities/work-experience.entity";

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

    @Field(() => Date, { nullable: true })
    endedAt: Date | null;

    @Field(() => CompanySchema)
    company: CompanySchema;

    profileId: number;

    static fromEntity(entity: WorkExperience) {
        const schema = new WorkExperienceSchema();
        schema.id = entity.id!;
        schema.position = entity.position;
        schema.achievement = entity.achievement;
        schema.startedAt = entity.startedAt;
        schema.endedAt = entity.endedAt;
        schema.profileId = entity.profileId;
        return schema;
    }
}
