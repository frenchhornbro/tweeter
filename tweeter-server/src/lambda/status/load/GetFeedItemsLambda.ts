import { PagedItemRequest, PagedItemResponse, StatusDTO } from "tweeter-shared";
import { StatusService } from "../../../model/service/StatusService";
import { superHandler } from "../../GetItemsLambda";

export const handler = async(request: PagedItemRequest<StatusDTO>): Promise<PagedItemResponse<StatusDTO>> => {
    const statusService = new StatusService();
    return await superHandler<StatusDTO, StatusService>(request, statusService, statusService.loadMoreFeedItems);
};