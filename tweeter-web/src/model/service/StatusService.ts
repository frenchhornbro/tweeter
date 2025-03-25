import { PagedItemRequest, StatusDTO, Status, PostStatusRequest } from "tweeter-shared";
import { Service } from "./Service";

export class StatusService extends Service {
    public async loadMoreFeedItems(req: PagedItemRequest<StatusDTO>): Promise<[Status[], boolean]> {
        return await this.serverFacade.loadMoreFeedItems(req);
    }

    public async loadMoreStoryItems(req: PagedItemRequest<StatusDTO>): Promise<[Status[], boolean]> {
        return await this.serverFacade.loadMoreStoryItems(req);
    }
    
    public async postStatus(req: PostStatusRequest): Promise<void> {
        return await this.serverFacade.postStatus(req);
    }
}