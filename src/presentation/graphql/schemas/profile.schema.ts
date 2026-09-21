import { Field, Int, ObjectType } from "@nestjs/graphql";

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

    @Field(() => [SkillSchema])
    skills?: SkillSchema[];

    @Field(() => [WorkExperienceSchema])
    workExperience?: WorkExperienceSchema[];

    @Field(() => [ProjectSchema])
    projects?: ProjectSchema[];
}
