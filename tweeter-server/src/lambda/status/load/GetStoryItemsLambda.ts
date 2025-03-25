import { PagedItemRequest, StatusDTO, StatusItemResponse } from "tweeter-shared";
import { StatusService } from "../../../model/service/StatusService";
import { superHandler } from "./GetStatusItemsLambda";

export const handler = async(request: PagedItemRequest<StatusDTO>): Promise<StatusItemResponse> => {
    return superHandler(request, new StatusService().loadMoreStoryItems);
};