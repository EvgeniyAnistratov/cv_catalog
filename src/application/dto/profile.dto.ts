import { Profile } from "@/domain/entities/profile.entity";

// Get profiles dtos
export class GetProfilesInput {
    public id: number;
}

export class GetProfilesOutput {
    public id: number;
    public name: string;
    public shortDescription: string;

    static fromProfile(profile: Profile): GetProfilesOutput {
        const output = new GetProfilesOutput();
        output.id = profile.id!;
        output.name = profile.name;
        output.shortDescription = profile.shortDescription;

        return output;
    }

    static fromProfiles(profiles: Profile[]) {
        return profiles.map(GetProfilesOutput.fromProfile);
    }
}
