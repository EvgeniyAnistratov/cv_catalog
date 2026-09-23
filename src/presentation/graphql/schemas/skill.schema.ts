import { Field, Int, ObjectType } from "@nestjs/graphql";

import { Skill } from "@/domain/entities/skill.entity";

@ObjectType("Skill")
export class SkillSchema {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    static fromEntity(entity: Skill) {
        const schema = new SkillSchema();
        schema.id = entity.id!;
        schema.name = entity.name;
        return schema;
    }
}
