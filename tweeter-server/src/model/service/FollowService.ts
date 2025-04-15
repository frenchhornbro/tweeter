import { StatusDTO, UpdateFeedRequest, UserDTO } from "tweeter-shared";
import { Service } from "./Service";
import { Factory } from "../../factory/Factory";
import { FollowsDAO } from "../../dao/follows/FollowsDAO";
import { UserDAO } from "../../dao/user/UserDAO";
import { UserError } from "../error/UserError";
import { QueueDAO } from "../../dao/queue/QueueDAO";

export class FollowService extends Service {
    private followsDAO: FollowsDAO;
    private userDAO: UserDAO;
    private queueDAO: QueueDAO;

    public constructor(factory: Factory) {
        super(factory);
        this.followsDAO = factory.getFollowsDAO();
        this.userDAO = factory.getUserDAO();
        this.queueDAO = factory.getQueueDAO();
    }

    public async loadMoreFollowees(
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: UserDTO | null
    ): Promise<[UserDTO[], boolean]> {
        // This loads everyone I am following
        return await this.loadMoreUserItems(token, userAlias, pageSize, lastItem?.alias, this.followsDAO.getPageOfFollowees);
    }
    
    public async loadMoreFollowers(
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: UserDTO | null
    ): Promise<[UserDTO[], boolean]> {
        // This loads everyone following me
        return await this.loadMoreUserItems(token, userAlias, pageSize, lastItem?.alias, this.followsDAO.getPageOfFollowers);
    }

    public async getFolloweeCount(
        token: string,
        userAlias: string
    ): Promise<number> {
        return await this.getCount(token, userAlias, this.followsDAO.getFollowees);
    }
    
    public async getFollowerCount(
        token: string,
        userAlias: string
    ): Promise<number> {
        return await this.getCount(token, userAlias, this.followsDAO.getFollowers);
    }

    public async getIsFollowerStatus(
        token: string,
        userAlias: string,
        selectedUserAlias: string
    ): Promise<boolean> {
        return await this.checkForError(async() => {
            await this.checkToken(token);
            if (!userAlias) throw new UserError("Invalid user alias");
            if (!selectedUserAlias) throw new UserError("Invalid selected user alias");
            return await this.followsDAO.getIsFollowerStatus(userAlias, selectedUserAlias);
        });
    }

    public async sendFollowerInfoMessage(status: StatusDTO): Promise<void> {
        return await this.checkForError(async() => {
            const allFollowerAliases: string[][] = [];
            const BATCH_SIZE = 10_000;
            let lastItem: string | undefined = undefined;
            let hasMoreFollowers = true;
            while (hasMoreFollowers) {
                console.log(`Getting next 10,000 followers`);
                const [followerAliases, hasMore] = await this.followsDAO.getPageOfFollowers(status.user.alias, BATCH_SIZE, lastItem);
                allFollowerAliases.push(followerAliases);
                hasMoreFollowers = hasMore;
                lastItem = followerAliases[followerAliases.length-1];
            }
            const logLength = allFollowerAliases.length === 0 ? 0 : (10000*(allFollowerAliases.length-1))+allFollowerAliases[allFollowerAliases.length-1].length;
            console.log(`Got all followers in ${allFollowerAliases.length} items, total of ${logLength} followers`);

            // Split follower aliases into groups of 200
            const NEXT_LAMBDA_BATCH_SIZE = 200;
            let requestNumber = 1;
            for (let i = 0; i < allFollowerAliases.length; i++) {
                for (let j = 0; j < allFollowerAliases[i].length; j+= NEXT_LAMBDA_BATCH_SIZE) {
                    const statusInfo: UpdateFeedRequest = {
                        status: status,
                        followerAliases: allFollowerAliases[i].slice(j, j+NEXT_LAMBDA_BATCH_SIZE)
                    };
                    console.log(`Sending request #${requestNumber} to next lambda with ${statusInfo.followerAliases.length} followers...`);
                    await this.queueDAO.sendToQueue(statusInfo, "Tweeter-Update-Feed-Queue");
                    console.log(`Request #${requestNumber} sent`);
                    requestNumber++;
                }
            }
            console.log("All followers sent to next lambda");
        });
    }

    public async follow(
        token: string,
        userToFollowAlias: string
    ): Promise<[followerCount: number, followeeCount: number]> {
        return await this.followAction(token, userToFollowAlias, "follow", this.followsDAO.addFollow);
    }
    
    public async unfollow(
        token: string,
        userToUnfollowAlias: string
    ): Promise<[followerCount: number, followeeCount: number]> {
        return await this.followAction(token, userToUnfollowAlias, "unfollow", this.followsDAO.removeFollow);
    }

    private async loadMoreUserItems(
        token: string,
        userAlias: string,
        pageSize: number,
        lastItemAlias: string | undefined,
        daoMethod: (alias: string, pageSize: number, lastItemAlias: string | undefined) => Promise<[followeeAliases: string[], hasMorePages: boolean]>
    ) {
        return await this.checkForError(async() => {
            await this.checkToken(token);
            const [followAliases, hasMorePages] = await daoMethod.call(this.followsDAO, userAlias, pageSize, lastItemAlias);
            if (followAliases.length === 0) return [[], false];
            const followUsers = await this.userDAO.getPageOfUserData(followAliases);
            return [followUsers, hasMorePages];
        });
    }

    private async getCount(token: string, userAlias: string, daoMethod: (alias: string) => Promise<string[]>) {
        return await this.checkForError(async() => {
            await this.checkToken(token);
            const followers: string[] = await daoMethod.call(this.followsDAO, userAlias);
            return followers ? followers.length : 0;
        });
    }
    
    private async followAction(
        token: string,
        alias: string,
        action: string,
        daoMethod: (followerAlias: string, followeeAlias: string) => Promise<void>
    ): Promise<[followerCount: number, followeeCount: number]> {
        return await this.checkForError(async() => {
            await this.checkToken(token);
            if (!alias) throw new UserError("Invalid followee user alias");
            const user = await this.authDAO.getUser(token);
            if (!user) throw new UserError("Invalid follower user alias");
            if (user.alias === alias) throw new UserError(`User cannot ${action} self`);
            await daoMethod.call(this.followsDAO, user.alias, alias);
            return await this.getUpdatedCounts(token, alias);
        });
    }

    private async getUpdatedCounts(token: string, userAlias: string): Promise<[followerCount: number, followeeCount: number]> {
        const followerCount = await this.getFollowerCount(token, userAlias);
        const followeeCount = await this.getFolloweeCount(token, userAlias);
        return [followerCount, followeeCount];
    }
}