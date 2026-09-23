import { Injectable } from "@nestjs/common";
import { DataloaderFactory, LoaderFrom } from "@strv/nestjs-dataloader";

import type { ICompanyRepository } from "@/domain/repositories/company.repository";

import type { WorkExpId } from "./loader.types";

import { CompanySchema } from "../schemas/company.schema";

@Injectable()
export class WorkExpCompaniesLoaderFactory extends DataloaderFactory<WorkExpId, CompanySchema> {
    constructor(readonly companyRepository: ICompanyRepository) {
        super();
    }

    async load(ids: WorkExpId[]) {
        const companyOnWorkExps = await this.companyRepository.findByWorkExpIds(ids);

        const companyMap = new Map<WorkExpId, CompanySchema>();

        for (const companyOnWorkExp of companyOnWorkExps) {
            const workExpId = companyOnWorkExp.workExpId;

            companyMap.set(
                workExpId,
                CompanySchema.fromEntity(workExpId, companyOnWorkExp.company),
            );
        }

        // The database guarantees the existence of the company identifier
        return ids.map((workExpId) => companyMap.get(workExpId)!);
    }

    id(entity: CompanySchema) {
        // returns companySchema.workExpId
        return entity.workExpId;
    }
}

export type WorkExpCompaniesLoader = LoaderFrom<WorkExpCompaniesLoaderFactory>;
