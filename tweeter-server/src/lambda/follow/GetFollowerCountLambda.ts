import { FollowerCountRequest, FollowerCountResponse } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";

export const handler = async(request: FollowerCountRequest): Promise<FollowerCountResponse> => {
    const followService = new FollowService();
    const count = await followService.getFollowerCount(request.token, request.userAlias);
    return {
        success: true,
        message: null,
        count: count
    }
};