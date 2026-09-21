import type { Project } from "../entities/project.entity";

export interface IProjectRepository {
    findByProfileIds(profileIds: number[]): Promise<Project[]>;
}
