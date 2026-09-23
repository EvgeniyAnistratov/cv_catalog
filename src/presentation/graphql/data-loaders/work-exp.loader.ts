import { Injectable } from "@nestjs/common";
import { Aggregated, DataloaderFactory, LoaderFrom } from "@strv/nestjs-dataloader";

import { WorkExperience } from "@/domain/entities/work-experience.entity";
import { IWorkExperienceRepository } from "@/domain/repositories/work-experience.repository";

import { ProfileId } from "./loader.types";

type ProfileWorkExps = Aggregated<ProfileId, WorkExperience>;

@Injectable()
export class ProfileWorkExpsLoaderFactory extends DataloaderFactory<ProfileId, ProfileWorkExps> {
    constructor(readonly workExpRepository: IWorkExperienceRepository) {
        super();
    }

    async load(ids: ProfileId[]) {
        const result = await this.workExpRepository.findByProfileIds(ids);
        return this.aggregateBy(result, (workExp) => workExp.profileId);
    }

    id(entity: ProfileWorkExps) {
        // returns workExp.profileId
        return entity.id;
    }
}

export type ProfileWorkExpsLoader = LoaderFrom<ProfileWorkExpsLoaderFactory>;
