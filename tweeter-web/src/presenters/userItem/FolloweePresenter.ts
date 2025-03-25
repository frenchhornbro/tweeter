import { AuthToken, User } from "tweeter-shared";
import { PAGE_SIZE, PagedItemPresenter } from "../PagedItemPresenter";
import { FollowService } from "../../model/service/FollowService";

export class FolloweePresenter extends PagedItemPresenter<User> {
    private followService = new FollowService();

    protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[User[], boolean]> {
        return this.followService.getMoreFollowees({
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