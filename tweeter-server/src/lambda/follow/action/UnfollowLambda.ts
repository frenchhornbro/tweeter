import { FollowRequest, FollowResponse } from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";
import { superHandler } from "./FollowActionLambda";
import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";

export const handler = async(request: FollowRequest): Promise<FollowResponse> => {
    return await superHandler(request, new FollowService(new DynamoDBFactory()).unfollow);
};