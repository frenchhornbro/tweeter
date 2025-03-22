import { FakeData, User, UserDTO } from "tweeter-shared";

export class FollowService {
    public async loadMoreFollowees(
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: UserDTO | null
    ): Promise<[UserDTO[], boolean]> {
        // TODO: Replace with the result of calling server
        return await this.getFakeData(lastItem, pageSize, userAlias);
    }
    
    public async loadMoreFollowers(
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: UserDTO | null
    ): Promise<[UserDTO[], boolean]> {
        // TODO: Replace with the result of calling server
        return await this.getFakeData(lastItem, pageSize, userAlias);
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
        const followerCount = await this.getFollowerCount(token, userToFollow.alias);
        const followeeCount = await this.getFolloweeCount(token, userToFollow.alias);
        return [followerCount, followeeCount];
    }

    private async getFakeData(lastItem: UserDTO | null, pageSize: number, userAlias: string): Promise<[UserDTO[], boolean]> {
        const [items, hasMore] = FakeData.instance.getPageOfUsers(User.fromDTO(lastItem), pageSize, userAlias);
        const dtos = items.map((user) => user.getDTO());
        return [dtos, hasMore];
    }
}