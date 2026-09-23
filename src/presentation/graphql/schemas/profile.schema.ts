import { Field, Int, ObjectType } from "@nestjs/graphql";

import { Profile } from "@/domain/entities/profile.entity";

import { ProjectSchema } from "./project.shcema";
import { SkillSchema } from "./skill.schema";
import { UsefulLinkSchema } from "./useful-link.schema";
import { WorkExperienceSchema } from "./work-experience.schema";

@ObjectType("Profile")
export class ProfileSchema {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    shortDescription: string;

    @Field(() => [UsefulLinkSchema])
    usefulLinks?: UsefulLinkSchema[];

    @Field((type) => [SkillSchema])
    skills?: SkillSchema[];

    @Field(() => [WorkExperienceSchema])
    workExperience?: WorkExperienceSchema[];

    @Field(() => [ProjectSchema])
    projects?: ProjectSchema[];

    static fromEntity(entity: Profile) {
        const schema = new ProfileSchema();
        schema.id = entity.id!;
        schema.name = entity.name;
        schema.shortDescription = entity.shortDescription;
        return schema;
    }
}
