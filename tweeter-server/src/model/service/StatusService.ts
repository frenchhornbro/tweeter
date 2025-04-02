import { FakeData, Status, StatusDTO } from "tweeter-shared";
import { Service } from "./Service";
import { Factory } from "../../factory/Factory";
import { StatusDAO } from "../../dao/status/StatusDAO";

export class StatusService extends Service {
    private statusDAO: StatusDAO;

    public constructor(factory: Factory) {
        super(factory);
        this.statusDAO = factory.getStatusDAO();
    }

    public async loadMoreFeedItems(
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: StatusDTO | null
    ): Promise<[StatusDTO[], boolean]> {
        return this.checkForError(async() => {
            await this.checkToken(token);
            return await this.statusDAO.getPageOfFeedItems(userAlias, pageSize, lastItem);
        });
    };
    
    public async loadMoreStoryItems(
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: StatusDTO | null
    ): Promise<[StatusDTO[], boolean]> {
        // TODO: Replace with the result of calling server
        return await this.getFakeData(lastItem, pageSize);
    };

    public async postStatus(
        token: string,
        newStatus: StatusDTO
    ): Promise<void> {
        // TODO: Call the server to post the status
        return;
    };
    
    private async getFakeData(lastItem: StatusDTO | null, pageSize: number): Promise<[StatusDTO[], boolean]> {
        const [items, hasMore] = FakeData.instance.getPageOfStatuses(Status.fromDTO(lastItem), pageSize);
        const dtos = items.map((status) => status.getDTO());
        return [dtos, hasMore];
    }
}