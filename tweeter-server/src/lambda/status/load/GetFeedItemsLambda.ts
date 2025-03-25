import { PagedItemRequest, PagedItemResponse, StatusDTO } from "tweeter-shared";
import { StatusService } from "../../../model/service/StatusService";
import { superHandler } from "../../GetItemsLambda";

export const handler = async(request: PagedItemRequest<StatusDTO>): Promise<PagedItemResponse<StatusDTO>> => {
    return await superHandler<StatusDTO>(request, new StatusService().loadMoreFeedItems);
};