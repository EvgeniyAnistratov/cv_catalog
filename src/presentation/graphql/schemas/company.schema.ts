import { Field, Int, ObjectType } from "@nestjs/graphql";

import { Company } from "@/domain/entities/company.entity";

@ObjectType("Company")
export class CompanySchema {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    workExpId: number;

    static fromEntity(workExpId: number, entity: Company) {
        const schema = new CompanySchema();
        schema.id = entity.id!;
        schema.name = entity.name;
        schema.workExpId = workExpId;
        return schema;
    }
}
