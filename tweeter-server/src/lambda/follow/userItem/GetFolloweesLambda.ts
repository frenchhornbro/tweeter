import { PagedItemRequest, PagedUserItemResponse, UserDTO } from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";
import { superHandler } from "./GetUserItemLambda";

export const handler = async(request: PagedItemRequest<UserDTO>): Promise<PagedUserItemResponse> => {
    return await superHandler(request, new FollowService().loadMoreFollowees);
};