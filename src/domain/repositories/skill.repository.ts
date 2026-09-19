import type { Skill } from "../entities/skill.entity";

export interface ISkillRepository {
    findByProfileId(profileId: number): Promise<Skill[]>;
    save(skill: Skill): Promise<Skill>;
}
