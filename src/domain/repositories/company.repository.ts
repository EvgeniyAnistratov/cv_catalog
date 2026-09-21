import type { Company } from "../entities/company.entity";

export interface ICompanyRepository {
    findByWorkExpIds(workExpIds: number[]): Promise<Company[]>;
}

export const COMPANY_REPOSITORY = Symbol("COMPANY_REPOSITORY");
