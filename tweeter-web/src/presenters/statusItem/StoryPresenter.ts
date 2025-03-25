import { AuthToken, Status } from "tweeter-shared";
import { PAGE_SIZE, PagedItemPresenter } from "../PagedItemPresenter";

export class StoryPresenter extends PagedItemPresenter<Status> {
    protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[Status[], boolean]> {
        return this.serverFacade.loadMoreStoryItems({
            token: authToken.token,
            userAlias: userAlias,
            pageSize: PAGE_SIZE,
            lastItem: this.lastItem ? this.lastItem?.getDTO() : null
        });
    }

    protected getItemDescription(): string {
        return 'load story items';
    }
}