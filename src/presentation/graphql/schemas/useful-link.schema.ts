import { Field, Int, ObjectType } from "@nestjs/graphql";

import { UsefulLink } from "@/domain/entities/useful-link.entity";

@ObjectType("UsefulLink")
export class UsefulLinkSchema {
    @Field(() => Int)
    id: number;

    @Field()
    link: string;

    static fromEntity(entity: UsefulLink) {
        const schema = new UsefulLinkSchema();
        schema.id = entity.id!;
        schema.link = entity.link;
        return schema;
    }
}
