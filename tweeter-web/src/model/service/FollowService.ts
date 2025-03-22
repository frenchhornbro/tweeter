import { AuthToken, User } from "tweeter-shared";
import { ServerFacade } from "../network/ServerFacade";

export class FollowService {
    private serverFacade: ServerFacade;

    public constructor() {
        this.serverFacade = new ServerFacade();
    }

    public async unfollow(
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<[followerCount: number, followeeCount: number]> {
        // Pause so we can see the unfollow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        // TODO: Call the server

        const followerCount = await this.serverFacade.getFollowerCount({token: authToken.token, userAlias: userToUnfollow.alias});
        const followeeCount = await this.serverFacade.getFolloweeCount({token: authToken.token, userAlias: userToUnfollow.alias});

        return [followerCount, followeeCount];
    }
}