import { PagedItemRequest, PagedItemResponse, UserDTO } from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";
import { superHandler } from "../../GetItemsLambda";
import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";

export const handler = async(request: PagedItemRequest<UserDTO>): Promise<PagedItemResponse<UserDTO>> => {
    const followService = new FollowService(new DynamoDBFactory());
    return await superHandler<UserDTO, FollowService>(request, followService, followService.loadMoreFollowers);
};