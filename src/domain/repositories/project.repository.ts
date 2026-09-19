import type { Project } from "../entities/project.entity";

export interface IProjectRepository {
    findByProfileId(profileId: number): Promise<Project[]>;
    save(project: Project): Promise<Project>;
}
