import { PagedItemRequest, PagedItemResponse, UserDTO } from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";

export const superHandler = async(request: PagedItemRequest<UserDTO>, serviceMethod: (
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDTO | null
) => Promise<[UserDTO[], boolean]>): Promise<PagedItemResponse<UserDTO>> => {
    const [items, hasMore] = await serviceMethod.call(new FollowService(), request.token, request.userAlias, request.pageSize, request.lastItem);
    return {
        success: true,
        message: null,
        items: items,
        hasMore: hasMore
    };
};