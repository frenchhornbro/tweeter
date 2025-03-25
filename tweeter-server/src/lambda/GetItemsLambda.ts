import { PagedItemRequest, PagedItemResponse, StatusDTO, UserDTO } from "tweeter-shared";
import { StatusService } from "../model/service/StatusService";

export const superHandler = async<T extends StatusDTO | UserDTO>(request: PagedItemRequest<T>, serviceMethod: (
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: T | null
) => Promise<[T[], boolean]>): Promise<PagedItemResponse<T>> => {
    const [items, hasMore] = await serviceMethod.call(new StatusService(), request.token, request.userAlias, request.pageSize, request.lastItem);
    return {
        success: true,
        message: null,
        items: items,
        hasMore: hasMore
    };
};