import {
    UserItemCountRequest, UserItemCountResponse, TweeterResponse, User, IsFollowerRequest, IsFollowerResponse, FollowRequest, FollowResponse, Status,
    PostStatusRequest, RegisterRequest, AuthToken, AuthenticatedRequest, GetUserRequest, GetUserResponse, AuthenticationResponse, AuthenticationRequest,
    PagedItemRequest, UserDTO, StatusDTO, PagedItemResponse
} from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";
import { SERVER_URL } from "../../../config";

export class ServerFacade {
    private clientCommunicator = new ClientCommunicator(SERVER_URL);

    public async getMoreFollowees(req: PagedItemRequest<UserDTO>): Promise<[User[], boolean]> {
        return await this.getMoreUserItems(req, 'followee', 'followees');
    }

    public async getMoreFollowers(req: PagedItemRequest<UserDTO>): Promise<[User[], boolean]> {
        return await this.getMoreUserItems(req, 'follower', 'followers');
    }

    public async loadMoreFeedItems(req: PagedItemRequest<StatusDTO>): Promise<[Status[], boolean]> {
        return await this.getMoreStatusItems(req, 'feed', 'feed');
    }
    
    public async loadMoreStoryItems(req: PagedItemRequest<StatusDTO>): Promise<[Status[], boolean]> {
        return await this.getMoreStatusItems(req, 'story', 'story');
    }

    public async follow(req: FollowRequest): Promise<[followerCount: number, followeeCount: number]> {
        return await this.followAction(req, 'follow');
    }

    public async unfollow(req: FollowRequest): Promise<[followerCount: number, followeeCount: number]> {
        return await this.followAction(req, 'unfollow');
    }
    
    public async register(req: RegisterRequest): Promise<[User, AuthToken]> {
        return await this.authenticate(req, 'register');
    }
    
    public async login(req: AuthenticationRequest): Promise<[User, AuthToken]> {
        return await this.authenticate(req, 'login');
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

    public async postStatus(req: PostStatusRequest): Promise<void> {
        const res = await this.clientCommunicator.doPost<PostStatusRequest, TweeterResponse>(req, '/post-status');
        this.checkForError(res, () => {});
    }

    public async logout(req: AuthenticatedRequest): Promise<void> {
        const res = await this.clientCommunicator.doPost<AuthenticatedRequest, TweeterResponse>(req, '/action/logout');
        return this.checkForError(res, () => {});
    }
    
    public async getUser(req: GetUserRequest): Promise<User | null> {
        const res = await this.clientCommunicator.doPost<GetUserRequest, GetUserResponse>(req, '/get-user');
        const user: User | null = User.fromDTO(res.user) as User;
        return this.checkForError(res, () => user);
    }

    private async followAction(req: FollowRequest, path: string): Promise<[followerCount: number, followeeCount: number]> {
        const res = await this.clientCommunicator.doPost<FollowRequest, FollowResponse>(req, `/action/${path}`);
        return this.checkForError(res, () => [res.followerCount, res.followeeCount]);
    }

    private async getMoreUserItems(req: PagedItemRequest<UserDTO>, path: string, userItemType: string): Promise<[User[], boolean]> {
        const res = await this.clientCommunicator.doPost<PagedItemRequest<UserDTO>, PagedItemResponse<UserDTO>>(req, `/${path}/list`);
        return this.getMoreItems(res, User.fromDTO, userItemType);
    }

    private async getMoreStatusItems(req: PagedItemRequest<StatusDTO>, path: string, statusItemType: string): Promise<[Status[], boolean]> {
        const res = await this.clientCommunicator.doPost<PagedItemRequest<StatusDTO>, PagedItemResponse<StatusDTO>>(req, `/load/${path}`);
        return this.getMoreItems(res, Status.fromDTO, statusItemType);
    }
    
    private async getMoreItems<T extends StatusDTO | UserDTO, U extends Status | User>(res: PagedItemResponse<T>, fromDTO: (dto: T | null) => U | null, itemType: string) {
        const items: U[] | null = res.success && res.items ? res.items.map((dto) => fromDTO(dto) as U) : null;
        return this.checkForError(res, () => {
            if (items === null) throw new Error(`No ${itemType} items found`);
            else return [items, res.hasMore];
        });
    }

    private async authenticate(req: AuthenticationRequest, path: string): Promise<[User, AuthToken]> {
        const res = await this.clientCommunicator.doPost<AuthenticationRequest, AuthenticationResponse>(req, `/action/${path}`);
        const user: User = User.fromDTO(res.user) as User;
        const authToken: AuthToken = new AuthToken(res.token, res.timestamp);
        return this.checkForError(res, () => {
            return [user, authToken];
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