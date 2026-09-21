import type { UsefulLink } from "../entities/useful-link.entity";

export interface IUsefulLinkRepository {
    findByProfileIds(profileIds: number[]): Promise<UsefulLink[]>;
}
