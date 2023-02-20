import { ProjectIteamMapper } from "./ProjectIteamMapper";

export class Project {
    id: number | undefined | null;
    name: string | undefined | null = "no name";
    description: string | undefined | null = "none";
    projectMapper: ProjectIteamMapper[];
}