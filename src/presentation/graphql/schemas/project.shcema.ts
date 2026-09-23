import { Field, Int, ObjectType } from "@nestjs/graphql";

import { Project } from "@/domain/entities/project.entity";

@ObjectType("Project")
export class ProjectSchema {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    link: string;

    static fromEntity(entity: Project) {
        const schema = new ProjectSchema();
        schema.id = entity.id!;
        schema.name = entity.name;
        schema.link = entity.link;
        return schema;
    }
}
