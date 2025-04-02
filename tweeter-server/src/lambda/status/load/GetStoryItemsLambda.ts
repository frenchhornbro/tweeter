import { PagedItemRequest, PagedItemResponse, StatusDTO } from "tweeter-shared";
import { StatusService } from "../../../model/service/StatusService";
import { superHandler } from "../../GetItemsLambda";
import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";

export const handler = async(request: PagedItemRequest<StatusDTO>): Promise<PagedItemResponse<StatusDTO>> => {
    const statusService = new StatusService(new DynamoDBFactory());
    return await superHandler<StatusDTO, StatusService>(request, statusService, statusService.loadMoreStoryItems);
};