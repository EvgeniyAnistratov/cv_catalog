import { Injectable } from "@nestjs/common";
import { Aggregated, DataloaderFactory, LoaderFrom } from "@strv/nestjs-dataloader";

import { Project } from "@/domain/entities/project.entity";
import { IProjectRepository } from "@/domain/repositories/project.repository";

import { ProfileId } from "./loader.types";

type ProfileProjects = Aggregated<ProfileId, Project>;

@Injectable()
export class ProfileProjectsLoaderFactory extends DataloaderFactory<ProfileId, ProfileProjects> {
    constructor(readonly projectRepository: IProjectRepository) {
        super();
    }

    async load(ids: ProfileId[]) {
        const result = await this.projectRepository.findByProfileIds(ids);
        return this.aggregateBy(result, (project) => project.profileId);
    }

    id(entity: ProfileProjects) {
        // returns project.profileId
        return entity.id;
    }
}

export type ProfileProjectsLoader = LoaderFrom<ProfileProjectsLoaderFactory>;
