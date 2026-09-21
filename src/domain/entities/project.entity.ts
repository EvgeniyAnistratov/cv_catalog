export class Project {
    public constructor(
        public name: string,
        public profileId: number,
        public readonly id?: number,
    ) {}
}
