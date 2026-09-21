import type { UsefulLink } from "../entities/useful-link.entity";

export interface IUsefulLinkRepository {
    findByProfileIds(profileIds: number[]): Promise<UsefulLink[]>;
}

export const USEFUL_LINK_REPOSITORY = Symbol("USEFUL_LINK_REPOSITORY");
