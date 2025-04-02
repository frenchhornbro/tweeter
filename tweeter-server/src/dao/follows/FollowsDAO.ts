import { UserDTO } from "tweeter-shared";

export interface FollowsDAO {
    getPageOfFollowees: (alias: string, pageSize: number, lastItem: UserDTO | null) => Promise<[followeeAliases: string[], hasMorePages: boolean]>;
    getPageOfFollowers: (alias: string, pageSize: number, lastItem: UserDTO | null) => Promise<[followerAliases: string[], hasMorePages: boolean]>;
    getFollowees: (alias: string) => Promise<string[]>;
    getFollowers: (alias: string) => Promise<string[]>;
    getIsFollowerStatus: (alias: string, selectedUserAlias: string) => Promise<boolean>;
    addFollow: (followerAlias: string, followeeAlias: string) => Promise<void>;
    removeFollow: (followerAlias: string, followeeAlias: string) => Promise<void>;
}