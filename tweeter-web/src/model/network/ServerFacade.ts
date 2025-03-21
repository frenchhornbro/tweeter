import { UserItemCountRequest, UserItemCountResponse, PagedUserItemRequest, PagedUserItemResponse, TweeterResponse, User, IsFollowerRequest, IsFollowerResponse, FollowRequest, FollowResponse } from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";
import { SERVER_URL } from "../../../config";

export class ServerFacade {;
    private clientCommunicator = new ClientCommunicator(SERVER_URL);

    public async getMoreFollowees(req: PagedUserItemRequest): Promise<[User[], boolean]> {
        return await this.getMoreUserItems(req, 'followee', 'followees');
    }

    public async getMoreFollowers(req: PagedUserItemRequest): Promise<[User[], boolean]> {
        return await this.getMoreUserItems(req, 'follower', 'followers');
    }

    public async getFollowerCount(req: UserItemCountRequest): Promise<number> {
        const res = await this.clientCommunicator.doPost<UserItemCountRequest, UserItemCountResponse>(req, '/follower/count');
        return this.checkForError(res, () => res.count);
    }

    public async getFolloweeCount(req: UserItemCountRequest): Promise<number> {
        const res = await this.clientCommunicator.doPost<UserItemCountRequest, UserItemCountResponse>(req, '/followee/count');
        return this.checkForError(res, () => res.count);
    }

    public async getIsFollowerStatus(req: IsFollowerRequest): Promise<boolean> {
        const res = await this.clientCommunicator.doPost<IsFollowerRequest, IsFollowerResponse>(req, '/is-follower');
        return this.checkForError(res, () => res.isFollower);
    }

    public async follow(req: FollowRequest): Promise<[followerCount: number, followeeCount: number]> {
        return await this.followAction(req, true);
    }

    public async unfollow(req: FollowRequest): Promise<[followerCount: number, followeeCount: number]> {
        return await this.followAction(req, false);
    }

    private async followAction(req: FollowRequest, isFollow: boolean): Promise<[followerCount: number, followeeCount: number]> {
        const path = isFollow ? 'follow' : 'unfollow';
        const res = await this.clientCommunicator.doPost<FollowRequest, FollowResponse>(req, `/action/${path}`);
        return this.checkForError(res, () => [res.followerCount, res.followeeCount]);
    }

    private async getMoreUserItems(req: PagedUserItemRequest, path: string, userItemType: string): Promise<[User[], boolean]> {
        const res = await this.clientCommunicator.doPost<PagedUserItemRequest, PagedUserItemResponse>(req, `/${path}/list`);
        const items: User[] | null = res.success && res.items ? res.items.map((dto) => User.fromDTO(dto) as User) : null;
        return this.checkForError(res, () => {
            if (items === null) throw new Error(`No ${userItemType} found`);
            else return [items, res.hasMore];
        });
    }

    private checkForError(res: TweeterResponse, onSuccess: () => any) {
        if (res.success) {
            return onSuccess();
        }
        else {
            console.error(res);
            throw new Error(res.message === null ? undefined : res.message);
        }
    }
}