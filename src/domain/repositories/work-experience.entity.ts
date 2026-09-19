import type { WorkExperience } from "../entities/work-experience.entity";

export interface IWorkExperienceRepository {
    findByProfileId(profileId: number): Promise<WorkExperience[]>;
    save(workExp: WorkExperience): Promise<WorkExperience>;
}
