import { PagedUserItemRequest, PagedUserItemResponse, User } from "tweeter-shared";
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

    private async getMoreUserItems(req: PagedUserItemRequest, path: string, userItemType: string): Promise<[User[], boolean]> {
        const res = await this.clientCommunicator.doPost<PagedUserItemRequest, PagedUserItemResponse>(req, `/${path}/list`);
        const items: User[] | null = res.success && res.items ? res.items.map((dto) => User.fromDTO(dto) as User) : null;
        if (res.success) {
            if (items === null) throw new Error(`No ${userItemType} found`);
            else return [items, res.hasMore];
        }
        else {
            console.error(res);
            throw new Error(res.message === null ? undefined : res.message);
        }
    }
}