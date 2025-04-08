import { PagedItemRequest, PagedItemResponse, UserDTO } from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";
import { getItemsHandler } from "../../GetItemsLambda";
import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";

export const getFollowersHandler = async(request: PagedItemRequest<UserDTO>): Promise<PagedItemResponse<UserDTO>> => {
    const followService = new FollowService(new DynamoDBFactory());
    return await getItemsHandler<UserDTO, FollowService>(request, followService, followService.loadMoreFollowers);
};