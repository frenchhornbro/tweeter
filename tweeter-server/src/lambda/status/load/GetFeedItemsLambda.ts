import { StatusItemRequest, StatusItemResponse } from "tweeter-shared";
import { StatusService } from "../../../model/service/StatusService";
import { superHandler } from "./GetStatusItemsLambda";

export const handler = async(request: StatusItemRequest): Promise<StatusItemResponse> => {
    return superHandler(request, new StatusService().loadMoreFeedItems);
};