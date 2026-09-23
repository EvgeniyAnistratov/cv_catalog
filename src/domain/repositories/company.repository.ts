import type { Company } from "../entities/company.entity";

export interface CompanyOnWorkExp {
    readonly workExpId: number;
    readonly company: Company;
}

export interface ICompanyRepository {
    findByWorkExpIds(workExpIds: number[]): Promise<CompanyOnWorkExp[]>;
}

export const COMPANY_REPOSITORY = Symbol("COMPANY_REPOSITORY");
