import { Injectable } from "@nestjs/common";
import { Aggregated, DataloaderFactory, LoaderFrom } from "@strv/nestjs-dataloader";

import type { IUsefulLinkRepository } from "@/domain/repositories/useful-link.repository";

import type { ProfileId } from "./loader.types";

import { UsefulLinkSchema } from "../schemas/useful-link.schema";

type ProfileUsefulLink = Aggregated<ProfileId, UsefulLinkSchema>;

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
        const schemas = result.map((usefulLink) => UsefulLinkSchema.fromEntity(usefulLink));
        return this.aggregateBy(schemas, (usefulLink) => usefulLink.profileId);
    }

    id(entity: ProfileUsefulLink) {
        // returns usefulLinkSchema.profileId
        return entity.id;
    }
}

export type ProfileUsefulLinksLoader = LoaderFrom<ProfileUsefulLinksLoaderFactory>;
