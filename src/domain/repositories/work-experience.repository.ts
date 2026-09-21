import type { WorkExperience } from "../entities/work-experience.entity";

export interface IWorkExperienceRepository {
    findByProfileIds(profileIds: number[]): Promise<WorkExperience[]>;
}
