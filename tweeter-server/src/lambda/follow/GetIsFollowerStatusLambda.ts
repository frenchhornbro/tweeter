import { IsFollowerRequest, IsFollowerResponse } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";
import { DynamoDBFactory } from "../../factory/DynamoDBFactory";

export const getIsFollowerStatusHandler = async(request: IsFollowerRequest): Promise<IsFollowerResponse> => {
    const followService = new FollowService(new DynamoDBFactory());
    const isFollower = await followService.getIsFollowerStatus(request.token, request.userAlias, request.selectedUserAlias);
    return {
        success: true,
        message: null,
        isFollower: isFollower
    }
};