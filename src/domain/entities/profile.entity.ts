export class Profile {
    public constructor(
        public name: string,
        public shortDescription: string,
        public usefulLinkIds: number[] = [],
        public skillIds: number[] = [],
        public workExperienceIds: number[] = [],
        public projectIds: number[] = [],
        public readonly id?: number,
    ) {}
}
