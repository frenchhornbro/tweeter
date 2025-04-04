import { AuthToken, Status } from "tweeter-shared";
import { PAGE_SIZE, PagedItemPresenter } from "../PagedItemPresenter";
import { StatusService } from "../../model/service/StatusService";

export class FeedPresenter extends PagedItemPresenter<Status> {
    private statusService = new StatusService();
    
    protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[Status[], boolean]> {
        return this.statusService.loadMoreFeedItems({
            token: authToken.token,
            userAlias: userAlias,
            pageSize: PAGE_SIZE,
            lastItem: this.lastItem ? this.lastItem?.getDTO() : null
        });
    }

    protected getItemDescription(): string {
        return 'load feed items';
    }
}