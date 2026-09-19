import type { UsefulLink } from "../entities/useful-link.entity";

export interface IUsefulLinkRepository {
    findByProfileId(profileId: number): Promise<UsefulLink[]>;
    save(usefulLink: UsefulLink): Promise<UsefulLink>;
}
