export class Project {
    public constructor(
        public name: string,
        public link: string,
        public profileId: number,
        public readonly id?: number,
    ) {}
}
