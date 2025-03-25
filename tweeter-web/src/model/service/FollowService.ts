import { FollowRequest, IsFollowerRequest, PagedItemRequest, User, UserDTO, UserItemCountRequest } from "tweeter-shared";
import { Service } from "./Service";

export class FollowService extends Service {
    public async getMoreFollowees(req: PagedItemRequest<UserDTO>): Promise<[User[], boolean]> {
        return await this.serverFacade.getMoreFollowees(req);
    }

    public async getMoreFollowers(req: PagedItemRequest<UserDTO>): Promise<[User[], boolean]> {
        return await this.serverFacade.getMoreFollowers(req);
    }
    
    public async follow(req: FollowRequest): Promise<[followerCount: number, followeeCount: number]> {
        return await this.serverFacade.follow(req);
    }
    
    public async unfollow(req: FollowRequest): Promise<[followerCount: number, followeeCount: number]> {
        return await this.serverFacade.unfollow(req);
    }
    
    public async getFollowerCount(req: UserItemCountRequest): Promise<number> {
        return await this.serverFacade.getFollowerCount(req);
    }

    public async getFolloweeCount(req: UserItemCountRequest): Promise<number> {
        return await this.serverFacade.getFolloweeCount(req);
    }
    
    public async getIsFollowerStatus(req: IsFollowerRequest): Promise<boolean> {
        return await this.serverFacade.getIsFollowerStatus(req);
    }
}