import type { Company } from "../entities/company.entity";

export interface ICompanyRepository {
    findByWorkExpId(workExpId: number): Promise<Company[]>;
    save(skill: Company): Promise<Company>;
}
