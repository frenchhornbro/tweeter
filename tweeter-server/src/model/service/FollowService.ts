import { UserDTO } from "tweeter-shared";
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
        return this.checkForError(async() => {
            await this.checkToken(token);
            const [followeeAliases, hasMorePages] = await this.followsDAO.getPageOfFollowees(userAlias, pageSize, lastItem);
            if (followeeAliases.length === 0) return [[], false];
            const followeeUsers = await this.userDAO.getPageOfUserData(followeeAliases);
            return [followeeUsers, hasMorePages];
        });
    }
    
    public async loadMoreFollowers(
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: UserDTO | null
    ): Promise<[UserDTO[], boolean]> {
        // This loads everyone following me
        return this.checkForError(async() => {
            await this.checkToken(token);
            const [followerAliases, hasMorePages] = await this.followsDAO.getPageOfFollowers(userAlias, pageSize, lastItem);
            if (followerAliases.length === 0) return [[], false];
            const followerUsers = await this.userDAO.getPageOfUserData(followerAliases);
            return [followerUsers, hasMorePages];
        });
    }

    public async getFolloweeCount(
        token: string,
        userAlias: string
    ): Promise<number> {
        return this.checkForError(async() => {
            await this.checkToken(token);
            const followees: string[] = await this.followsDAO.getFollowees(userAlias);
            return followees ? followees.length : 0;
        });
    }

    public async getFollowerCount(
        token: string,
        userAlias: string
    ): Promise<number> {
        return this.checkForError(async() => {
            await this.checkToken(token);
            const followers: string[] = await this.followsDAO.getFollowers(userAlias);
            return followers ? followers.length : 0;
        });
    }

    public async getIsFollowerStatus(
        token: string,
        userAlias: string,
        selectedUserAlias: string
    ): Promise<boolean> {
        return this.checkForError(async() => {
            await this.checkToken(token);
            if (!userAlias) throw new UserError("Invalid user alias");
            if (!selectedUserAlias) throw new UserError("Invalid selected user alias");
            return await this.followsDAO.getIsFollowerStatus(userAlias, selectedUserAlias);
        });
    }

    public async follow(
        token: string,
        userToFollowAlias: string
    ): Promise<[followerCount: number, followeeCount: number]> {
        return this.checkForError(async() => {
            await this.checkToken(token);
            if (!userToFollowAlias) throw new UserError("Invalid followee user alias");
            const user = await this.authDAO.getUser(token);
            if (!user) throw new UserError("Invalid follower user alias");
            if (user.alias === userToFollowAlias) throw new UserError("User cannot follow self");
            await this.followsDAO.addFollow(user.alias, userToFollowAlias);
            return await this.getUpdatedCounts(token, userToFollowAlias);
        });
    }
    
    public async unfollow(
        token: string,
        userToUnfollowAlias: string
    ): Promise<[followerCount: number, followeeCount: number]> {
        return this.checkForError(async() => {
            await this.checkToken(token);
            if (!userToUnfollowAlias) throw new UserError("Invalid followee user alias");
            const user = await this.authDAO.getUser(token);
            if (!user) throw new UserError("Invalid follower user alias");
            await this.followsDAO.removeFollow(user.alias, userToUnfollowAlias);
            return await this.getUpdatedCounts(token, userToUnfollowAlias);
        });
    }

    private async getUpdatedCounts(token: string, userAlias: string): Promise<[followerCount: number, followeeCount: number]> {
        const followerCount = await this.getFollowerCount(token, userAlias);
        const followeeCount = await this.getFolloweeCount(token, userAlias);
        return [followerCount, followeeCount];
    }
}