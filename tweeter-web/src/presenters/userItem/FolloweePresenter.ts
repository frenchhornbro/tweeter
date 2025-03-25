import { AuthToken, User } from "tweeter-shared";
import { PAGE_SIZE, PagedItemPresenter } from "../PagedItemPresenter";

export class FolloweePresenter extends PagedItemPresenter<User> {
    protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[User[], boolean]> {
        return this.serverFacade.getMoreFollowees({
            token: authToken.token,
            userAlias: userAlias,
            pageSize: PAGE_SIZE,
            lastItem: this.lastItem ? this.lastItem?.getDTO() : null
        })
    }

    protected getItemDescription(): string {
        return 'load followees';
    }
}