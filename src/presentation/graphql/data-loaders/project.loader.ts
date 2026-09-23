import { Injectable } from "@nestjs/common";
import { Aggregated, DataloaderFactory, LoaderFrom } from "@strv/nestjs-dataloader";

import type { IProjectRepository } from "@/domain/repositories/project.repository";

import type { ProfileId } from "./loader.types";

import { ProjectSchema } from "../schemas/project.shcema";

type ProfileProjects = Aggregated<ProfileId, ProjectSchema>;

@Injectable()
export class ProfileProjectsLoaderFactory extends DataloaderFactory<ProfileId, ProfileProjects> {
    constructor(readonly projectRepository: IProjectRepository) {
        super();
    }

    async load(ids: ProfileId[]) {
        const result = await this.projectRepository.findByProfileIds(ids);
        const schemas = result.map((project) => ProjectSchema.fromEntity(project));
        return this.aggregateBy(schemas, (project) => project.profileId);
    }

    id(entity: ProfileProjects) {
        // returns projectSchema.profileId
        return entity.id;
    }
}

export type ProfileProjectsLoader = LoaderFrom<ProfileProjectsLoaderFactory>;
