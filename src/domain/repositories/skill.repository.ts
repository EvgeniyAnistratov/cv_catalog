import { Skill } from "../entities/skill.entity";

export interface SkillOnProfile {
    readonly profileId: number;
    readonly skill: Skill;
}

export interface ISkillRepository {
    findByProfileIds(profileIds: number[]): Promise<SkillOnProfile[]>;
}

export const SKILL_REPOSITORY = Symbol("SKILL_REPOSITORY");
