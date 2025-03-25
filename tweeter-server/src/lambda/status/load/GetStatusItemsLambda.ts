import { PagedItemRequest, PagedItemResponse, StatusDTO } from "tweeter-shared";
import { StatusService } from "../../../model/service/StatusService";

export const superHandler = async(request: PagedItemRequest<StatusDTO>, getStatusItemsMethod: (
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDTO | null
) => Promise<[StatusDTO[], boolean]>): Promise<PagedItemResponse<StatusDTO>> => {
    const [items, hasMore] = await getStatusItemsMethod.call(new StatusService(), request.token, request.userAlias, request.pageSize, request.lastItem);
    return {
        success: true,
        message: null,
        items: items,
        hasMore: hasMore
    };
};