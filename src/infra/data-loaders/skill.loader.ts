import { Injectable } from "@nestjs/common";
import { Aggregated, DataloaderFactory, LoaderFrom } from "@strv/nestjs-dataloader";

import { Skill } from "@/domain/entities/skill.entity";
import { ISkillRepository } from "@/domain/repositories/skill.repository";

import { ProfileId } from "./loader.types";

type ProfileSkills = Aggregated<ProfileId, Skill>;

@Injectable()
export class ProfileSkillsLoaderFactory extends DataloaderFactory<ProfileId, ProfileSkills> {
    constructor(readonly skillRepository: ISkillRepository) {
        super();
    }

    async load(ids: ProfileId[]) {
        const skillsOnProfiles = await this.skillRepository.findByProfileIds(ids);

        const skillsMap = new Map<ProfileId, Skill[]>();

        for (const skillOnProfile of skillsOnProfiles) {
            const profileId = skillOnProfile.profileId;

            if (!skillsMap.has(profileId)) {
                skillsMap.set(profileId, []);
            }

            skillsMap.get(profileId)!.push(skillOnProfile.skill);
        }

        return ids.map((profileId) => ({
            id: profileId,
            values: skillsMap.get(profileId) || [],
        }));
    }

    id(entity: ProfileSkills) {
        // returns skill.profileId
        return entity.id;
    }
}

export type ProfileProjectsLoader = LoaderFrom<ProfileSkillsLoaderFactory>;
