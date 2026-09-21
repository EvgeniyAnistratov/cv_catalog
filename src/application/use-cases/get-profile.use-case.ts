import { IProfileRepository } from "@/domain/repositories/profile.repository";

import { GetProfilesInput, GetProfilesOutput } from "../dto/profile.dto";

export class GetProfileUseCase {
    constructor(private readonly profileRepository: IProfileRepository) {}

    async execute(input: GetProfilesInput): Promise<GetProfilesOutput | null> {
        const result = await this.profileRepository.findById(input.id);
        return result ? GetProfilesOutput.fromProfile(result) : null;
    }
}
