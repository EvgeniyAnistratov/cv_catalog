import { Injectable } from "@nestjs/common";
import { Aggregated, DataloaderFactory, LoaderFrom } from "@strv/nestjs-dataloader";

import { UsefulLink } from "@/domain/entities/useful-link.entity";
import { IUsefulLinkRepository } from "@/domain/repositories/useful-link.repository";

import { ProfileId } from "./loader.types";

type ProfileUsefulLink = Aggregated<ProfileId, UsefulLink>;

@Injectable()
export class ProfileUsefulLinksLoaderFactory extends DataloaderFactory<
    ProfileId,
    ProfileUsefulLink
> {
    constructor(readonly usefulLinkRepository: IUsefulLinkRepository) {
        super();
    }

    async load(ids: ProfileId[]) {
        const result = await this.usefulLinkRepository.findByProfileIds(ids);
        return this.aggregateBy(result, (usefulLink) => usefulLink.profileId);
    }

    id(entity: ProfileUsefulLink) {
        // returns usefulLink.profileId
        return entity.id;
    }
}

export type ProfileUsefulLinksLoader = LoaderFrom<ProfileUsefulLinksLoaderFactory>;
