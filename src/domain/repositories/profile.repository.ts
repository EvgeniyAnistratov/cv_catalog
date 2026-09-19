import type { Profile } from "../entities/profile.entity";

export interface IProfileRepository {
    findAll(): Promise<Profile[]>;
    findById(profileId: number): Promise<Profile | null>;
    save(profile: Profile): Promise<Profile>;
}
