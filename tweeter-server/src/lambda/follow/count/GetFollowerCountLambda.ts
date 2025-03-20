import { UserItemCountRequest, UserItemCountResponse } from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";

export const handler = async(request: UserItemCountRequest): Promise<UserItemCountResponse> => {
    const followService = new FollowService();
    const count = await followService.getFollowerCount(request.token, request.userAlias);
    return {
        success: true,
        message: null,
        count: count
    }
};