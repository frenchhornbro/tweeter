import { PostStatusDTO, UserDTO } from "tweeter-shared";
import { Service } from "./Service";
import { Factory } from "../../factory/Factory";
import { FollowsDAO } from "../../dao/follows/FollowsDAO";
import { UserDAO } from "../../dao/user/UserDAO";
import { UserError } from "../error/UserError";

export class FollowService extends Service {
    private followsDAO: FollowsDAO;
    private userDAO: UserDAO;

    public constructor(factory: Factory) {
        super(factory);
        this.followsDAO = factory.getFollowsDAO();
        this.userDAO = factory.getUserDAO();
    }

    public async loadMoreFollowees(
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: UserDTO | null
    ): Promise<[UserDTO[], boolean]> {
        // This loads everyone I am following
        return await this.loadMoreUserItems(token, userAlias, pageSize, lastItem, this.followsDAO.getPageOfFollowees);
    }
    
    public async loadMoreFollowers(
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: UserDTO | null
    ): Promise<[UserDTO[], boolean]> {
        // This loads everyone following me
        return await this.loadMoreUserItems(token, userAlias, pageSize, lastItem, this.followsDAO.getPageOfFollowers);
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

    public async getGroupedFollowers(request: PostStatusDTO): Promise<string[][]> {
        return await this.checkForError(async() => {
            const userAlias: string = request.status.user.alias;
            const token: string = request.token;
            let lastItem: UserDTO | null = null;
            const allFollowerAliases: string[][] = [];
            let hasMoreFollowers = true;
            const MAX_BATCH_SIZE = 25;
            while (hasMoreFollowers) {
                const [followers, hasMore] = await this.loadMoreFollowers(token, userAlias, MAX_BATCH_SIZE, lastItem);
                const followerAliasList: string[] = []
                followers.forEach((user) => followerAliasList.push(user.alias));
                allFollowerAliases.push(followerAliasList);
                hasMoreFollowers = hasMore;
                lastItem = followers[followers.length-1];
            }
            return allFollowerAliases;
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
        lastItem: UserDTO | null,
        daoMethod: (alias: string, pageSize: number, lastItem: UserDTO | null) => Promise<[followeeAliases: string[], hasMorePages: boolean]>
    ) {
        return await this.checkForError(async() => {
            await this.checkToken(token);
            const [followAliases, hasMorePages] = await daoMethod.call(this.followsDAO, userAlias, pageSize, lastItem);
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