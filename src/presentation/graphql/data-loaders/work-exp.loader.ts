import { Injectable } from "@nestjs/common";
import { Aggregated, DataloaderFactory, LoaderFrom } from "@strv/nestjs-dataloader";

import type { IWorkExperienceRepository } from "@/domain/repositories/work-experience.repository";

import type { ProfileId } from "./loader.types";

import { WorkExperienceSchema } from "../schemas/work-experience.schema";

type ProfileWorkExps = Aggregated<ProfileId, WorkExperienceSchema>;

@Injectable()
export class ProfileWorkExpsLoaderFactory extends DataloaderFactory<ProfileId, ProfileWorkExps> {
    constructor(readonly workExpRepository: IWorkExperienceRepository) {
        super();
    }

    async load(ids: ProfileId[]) {
        const result = await this.workExpRepository.findByProfileIds(ids);
        const schemas = result.map((workExp) => WorkExperienceSchema.fromEntity(workExp));
        return this.aggregateBy(schemas, (workExp) => workExp.profileId);
    }

    id(entity: ProfileWorkExps) {
        // returns workExperienceSchema.profileId
        return entity.id;
    }
}

export type ProfileWorkExpsLoader = LoaderFrom<ProfileWorkExpsLoaderFactory>;
