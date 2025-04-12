import { PagedItemRequest, PagedItemResponse, UserDTO } from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";
import { getItems } from "../../GetItems";
import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";

export const getFollowersHandler = async(request: PagedItemRequest<UserDTO>): Promise<PagedItemResponse<UserDTO>> => {
    const followService = new FollowService(new DynamoDBFactory());
    return await getItems<UserDTO, FollowService>(request, followService, followService.loadMoreFollowers);
};