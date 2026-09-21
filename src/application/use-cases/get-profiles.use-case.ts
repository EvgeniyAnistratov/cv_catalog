import { IProfileRepository } from "@/domain/repositories/profile.repository";

import { GetProfilesOutput } from "../dto/profile.dto";

export class GetProfilesUseCase {
    constructor(private readonly profileRepository: IProfileRepository) {}

    async execute(): Promise<GetProfilesOutput[]> {
        const result = await this.profileRepository.findAll();
        return GetProfilesOutput.fromProfiles(result);
    }
}
