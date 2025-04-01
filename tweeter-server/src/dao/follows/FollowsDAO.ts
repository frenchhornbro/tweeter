import { UserDTO } from "tweeter-shared";

export interface FollowsDAO {
    getPageOfFollowees: (alias: string, pageSize: number, lastItem: UserDTO | null) => Promise<[followeeAliases: string[], hasMorePages: boolean]>;
}