import { AuthToken, Status } from "tweeter-shared";
import { PAGE_SIZE, PagedItemPresenter } from "../PagedItemPresenter";

export class FeedPresenter extends PagedItemPresenter<Status> {
    protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[Status[], boolean]> {
        return this.serverFacade.loadMoreFeedItems({
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