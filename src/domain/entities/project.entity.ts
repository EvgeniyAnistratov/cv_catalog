export class Project {
    private constructor(
        public name: string,
        public profileId: number,
        public readonly id?: number,
    ) {}
}
