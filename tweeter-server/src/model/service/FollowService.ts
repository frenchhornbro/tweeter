import { FakeData, User, UserDTO } from "tweeter-shared";
import { Service } from "./Service";
import { Factory } from "../../factory/Factory";
import { FollowsDAO } from "../../dao/follows/FollowsDAO";
import { UserDAO } from "../../dao/user/UserDAO";

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

    public async getFollowerCount(
        token: string,
        userAlias: string
    ): Promise<number> {
        // TODO: Replace with the result of calling server

        return FakeData.instance.getFollowerCount(userAlias);
    }

    public async getFolloweeCount(
        token: string,
        userAlias: string
    ): Promise<number> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getFolloweeCount(userAlias);
    }

    public async getIsFollowerStatus(
        token: string,
        user: UserDTO,
        selectedUser: UserDTO
    ): Promise<boolean> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.isFollower();
    }

    public async follow(
        token: string,
        userToFollow: UserDTO
    ): Promise<[followerCount: number, followeeCount: number]> {
        // TODO: Call the server
        const followerCount = await this.getFollowerCount(token, userToFollow.alias);
        const followeeCount = await this.getFolloweeCount(token, userToFollow.alias);
        return [followerCount, followeeCount];
    }

    public async unfollow(
        token: string,
        userToUnfollow: UserDTO
    ): Promise<[followerCount: number, followeeCount: number]> {
        // TODO: Call the server
        const followerCount = await this.getFollowerCount(token, userToUnfollow.alias);
        const followeeCount = await this.getFolloweeCount(token, userToUnfollow.alias);
        return [followerCount, followeeCount];
    }

    private async getFakeData(lastItem: UserDTO | null, pageSize: number, userAlias: string): Promise<[UserDTO[], boolean]> {
        const [items, hasMore] = FakeData.instance.getPageOfUsers(User.fromDTO(lastItem), pageSize, userAlias);
        const dtos = items.map((user) => user.getDTO());
        return [dtos, hasMore];
    }
}