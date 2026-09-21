import type { Project } from "../entities/project.entity";

export interface IProjectRepository {
    findByProfileIds(profileIds: number[]): Promise<Project[]>;
}

export const PROJECT_REPOSITORY = Symbol("PROJECT_REPOSITORY");
