import { FollowRequest, FollowResponse } from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";
import { followActionHandler } from "./FollowActionLambda";
import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";

export const unfollowHandler = async(request: FollowRequest): Promise<FollowResponse> => {
    return await followActionHandler(request, new FollowService(new DynamoDBFactory()).unfollow);
};