import { PagedItemRequest, PagedItemResponse, UserDTO } from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";
import { superHandler } from "../../GetItemsLambda";

export const handler = async(request: PagedItemRequest<UserDTO>): Promise<PagedItemResponse<UserDTO>> => {
    const followService = new FollowService();
    return await superHandler<UserDTO, FollowService>(request, followService, followService.loadMoreFollowees);
};