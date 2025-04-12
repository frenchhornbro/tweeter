import { PagedItemRequest, PagedItemResponse, StatusDTO, UserDTO } from "tweeter-shared";
import { StatusService } from "../model/service/StatusService";
import { FollowService } from "../model/service/FollowService";

export const getItems = async<T extends StatusDTO | UserDTO, U extends StatusService | FollowService>(request: PagedItemRequest<T>,
    service: U, serviceMethod: (
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: T | null
    ) => Promise<[T[], boolean]>): Promise<PagedItemResponse<T>> => {
    const [items, hasMore] = await serviceMethod.call(service, request.token, request.userAlias, request.pageSize, request.lastItem);
    return {
        success: true,
        message: null,
        items: items,
        hasMore: hasMore
    };
};