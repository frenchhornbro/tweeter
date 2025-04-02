import { AuthToken, User } from "tweeter-shared";
import { MessageView, Presenter } from "../Presenter";
import { FollowService } from "../../model/service/FollowService";

export interface UserInfoView extends MessageView {
    setIsFollower: (isFollower: boolean) => void;
    setFolloweeCount: (followeeCount: number) => void;
    setFollowerCount: (followerCount: number) => void;
    setIsLoading: (isLoading: boolean) => void;
}

export class UserInfoPresenter extends Presenter<UserInfoView> {
    private followService = new FollowService();

    public constructor(view: UserInfoView) {
        super(view);
    }

    public async setIsFollowerStatus(authToken: AuthToken, currentUser: User, displayedUser: User ) {
        await this.doFailureReportingOperation(async () => {
            if (currentUser === displayedUser) {
                this.view.setIsFollower(false);
            } else {
                this.view.setIsFollower(await this.followService.getIsFollowerStatus({
                    token: authToken.token,
                    userAlias: currentUser.alias,
                    selectedUserAlias: displayedUser.alias
                }));
            }
        }, 'determine follower status');
    }

    public async setNumbFollowees(authToken: AuthToken, displayedUser: User) {
        await this.doFailureReportingOperation(async () => {
            this.view.setFolloweeCount(await this.followService.getFolloweeCount({
                token: authToken.token,
                userAlias: displayedUser.alias
            }));
        }, 'get followees count');
    }

    public async setNumbFollowers(authToken: AuthToken, displayedUser: User) {
        await this.doFailureReportingOperation(async () => {
            this.view.setFollowerCount(await this.followService.getFollowerCount({
                token: authToken.token,
                userAlias: displayedUser.alias
            }));
        }, 'get followers count');
    }

    public async followDisplayedUser(event: React.MouseEvent, displayedUser: User, authToken: AuthToken): Promise<void> {
        event.preventDefault();

        await this.doFailureReportingOperation(async () => {
            this.view.setIsLoading(true);
            this.view.displayInfoMessage(`Following ${displayedUser!.name}...`, 0);

            const [followerCount, followeeCount] = await this.followService.follow({
                token: authToken.token,
                userToFollowAlias: displayedUser.alias
        });

            this.view.setIsFollower(true);
            this.view.setFollowerCount(followerCount);
            this.view.setFolloweeCount(followeeCount);
        }, 'follow user', () => {
            this.view.clearLastInfoMessage();
            this.view.setIsLoading(false);
        });
    }
    
    public async unfollowDisplayedUser(event: React.MouseEvent, displayedUser: User, authToken: AuthToken): Promise<void> {
        event.preventDefault();

        await this.doFailureReportingOperation(async () => {
            this.view.setIsLoading(true);
            this.view.displayInfoMessage(`Unfollowing ${displayedUser!.name}...`, 0);

            const [followerCount, followeeCount] = await this.followService.unfollow({
                token: authToken.token,
                userToFollowAlias: displayedUser.alias
            });

            this.view.setIsFollower(false);
            this.view.setFollowerCount(followerCount);
            this.view.setFolloweeCount(followeeCount);
        }, 'unfollow user', () => {
            this.view.clearLastInfoMessage();
            this.view.setIsLoading(false);
        })
    }
}