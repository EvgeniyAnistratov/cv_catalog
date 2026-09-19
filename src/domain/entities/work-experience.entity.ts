export class WorkExperience {
    private constructor(
        public position: string,
        public achievement: string,
        public startedAt: Date,
        public endedAt: Date | null,
        public profileId: number,
        public companyId: number,
        public readonly id?: number,
    ) {}
}
