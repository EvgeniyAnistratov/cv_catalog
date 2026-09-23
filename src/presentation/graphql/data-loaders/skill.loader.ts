import { Injectable } from "@nestjs/common";
import { Aggregated, DataloaderFactory, LoaderFrom } from "@strv/nestjs-dataloader";

import type { ISkillRepository } from "@/domain/repositories/skill.repository";

import type { ProfileId } from "./loader.types";

import { SkillSchema } from "../schemas/skill.schema";

type ProfileSkills = Aggregated<ProfileId, SkillSchema>;

@Injectable()
export class ProfileSkillsLoaderFactory extends DataloaderFactory<ProfileId, ProfileSkills> {
    constructor(readonly skillRepository: ISkillRepository) {
        super();
    }

    async load(ids: ProfileId[]) {
        const skillsOnProfiles = await this.skillRepository.findByProfileIds(ids);

        const skillsMap = new Map<ProfileId, SkillSchema[]>();

        for (const skillOnProfile of skillsOnProfiles) {
            const profileId = skillOnProfile.profileId;

            if (!skillsMap.has(profileId)) {
                skillsMap.set(profileId, []);
            }

            skillsMap.get(profileId)!.push(SkillSchema.fromEntity(skillOnProfile.skill));
        }

        return ids.map((profileId) => ({
            id: profileId,
            values: skillsMap.get(profileId) || [],
        }));
    }

    id(entity: ProfileSkills) {
        // returns skillSchema.profileId
        return entity.id;
    }
}

export type ProfileSkillsLoader = LoaderFrom<ProfileSkillsLoaderFactory>;
