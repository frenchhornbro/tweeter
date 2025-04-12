import { PagedItemRequest, PagedItemResponse, StatusDTO } from "tweeter-shared";
import { StatusService } from "../../../model/service/StatusService";
import { getItems } from "../../GetItems";
import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";

export const getStoryItemsHandler = async(request: PagedItemRequest<StatusDTO>): Promise<PagedItemResponse<StatusDTO>> => {
    const statusService = new StatusService(new DynamoDBFactory());
    return await getItems<StatusDTO, StatusService>(request, statusService, statusService.loadMoreStoryItems);
};