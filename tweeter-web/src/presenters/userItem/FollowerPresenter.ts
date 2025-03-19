import { AuthToken, User } from "tweeter-shared";
import { UserItemPresenter } from "./UserItemPresenter";
import { PAGE_SIZE } from "../PagedItemPresenter";

export class FollowerPresenter extends UserItemPresenter {
    protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[User[], boolean]> {
        return this.serverFacade.getMoreFollowers({
            token: authToken.token,
            userAlias: userAlias,
            pageSize: PAGE_SIZE,
            lastItem: this.lastItem ? this.lastItem?.getDTO() : null
        });
    }
    
    protected getItemDescription(): string {
        return 'load followers';
    }
}