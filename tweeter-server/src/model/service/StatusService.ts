import { FakeData, Status, StatusDTO } from "tweeter-shared";

export class StatusService {
    public async loadMoreFeedItems(
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: StatusDTO | null
    ): Promise<[StatusDTO[], boolean]> {
        // TODO: Replace with the result of calling server
        const [items, hasMore] = FakeData.instance.getPageOfStatuses(Status.fromDTO(lastItem), pageSize);
        const dtos = items.map((status) => status.getDTO());
        return [dtos, hasMore];
    };
}