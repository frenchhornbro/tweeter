import { PagedItemRequest, PagedItemResponse, StatusDTO } from "tweeter-shared";
import { StatusService } from "../../../model/service/StatusService";
import { superHandler } from "./GetStatusItemsLambda";

export const handler = async(request: PagedItemRequest<StatusDTO>): Promise<PagedItemResponse<StatusDTO>> => {
    return superHandler(request, new StatusService().loadMoreFeedItems);
};