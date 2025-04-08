import { PagedItemRequest, PagedItemResponse, StatusDTO } from "tweeter-shared";
import { StatusService } from "../../../model/service/StatusService";
import { getItemsHandler } from "../../GetItemsLambda";
import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";

export const getStoryItemsHandler = async(request: PagedItemRequest<StatusDTO>): Promise<PagedItemResponse<StatusDTO>> => {
    const statusService = new StatusService(new DynamoDBFactory());
    return await getItemsHandler<StatusDTO, StatusService>(request, statusService, statusService.loadMoreStoryItems);
};