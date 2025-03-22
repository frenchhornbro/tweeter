import { AuthToken, Status } from "tweeter-shared";
import { StatusItemPresenter } from "./StatusItemPresenter";
import { PAGE_SIZE } from "../PagedItemPresenter";

export class FeedPresenter extends StatusItemPresenter {
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