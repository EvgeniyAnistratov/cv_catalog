import { Injectable } from "@nestjs/common";
import { Aggregated, DataloaderFactory, LoaderFrom } from "@strv/nestjs-dataloader";

import { Company } from "@/domain/entities/company.entity";
import { ICompanyRepository } from "@/domain/repositories/company.repository";

import { WorkExpId } from "./loader.types";

type WorkExpCompany = Aggregated<WorkExpId, Company>;

@Injectable()
export class WorkExpCompaniesLoaderFactory extends DataloaderFactory<WorkExpId, WorkExpCompany> {
    constructor(readonly companyRepository: ICompanyRepository) {
        super();
    }

    async load(ids: WorkExpId[]) {
        const companyOnWorkExps = await this.companyRepository.findByWorkExpIds(ids);

        const skillsMap = new Map<WorkExpId, Company[]>();

        for (const companyOnWorkExp of companyOnWorkExps) {
            const workExpId = companyOnWorkExp.workExpId;

            if (!skillsMap.has(workExpId)) {
                skillsMap.set(workExpId, []);
            }

            skillsMap.get(workExpId)!.push(companyOnWorkExp.company);
        }

        return ids.map((workExpId) => ({
            id: workExpId,
            values: skillsMap.get(workExpId) || [],
        }));
    }

    id(entity: WorkExpCompany) {
        // returns company.workExpId
        return entity.id;
    }
}

export type WorkExpCompaniesLoader = LoaderFrom<WorkExpCompaniesLoaderFactory>;
