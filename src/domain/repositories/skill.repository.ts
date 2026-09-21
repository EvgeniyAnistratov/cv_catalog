import type { Skill } from "../entities/skill.entity";

export interface ISkillRepository {
    findByProfileIds(profileIds: number[]): Promise<Skill[]>;
}

export const SKILL_REPOSITORY = Symbol("SKILL_REPOSITORY");
