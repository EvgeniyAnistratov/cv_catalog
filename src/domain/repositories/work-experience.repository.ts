import type { WorkExperience } from "../entities/work-experience.entity";

export interface IWorkExperienceRepository {
    findByProfileIds(profileIds: number[]): Promise<WorkExperience[]>;
}

export const WORK_EXPERIENCE_REPOSITORY = Symbol("WORK_EXPERIENCE_REPOSITORY");
