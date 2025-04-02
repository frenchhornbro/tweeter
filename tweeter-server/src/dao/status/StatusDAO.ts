import { StatusDTO } from "tweeter-shared";

export interface StatusDAO {
    getPageOfFeedItems: (alias: string, pageSize: number, lastItem: StatusDTO | null) => Promise<[StatusDTO[], boolean]>;
}