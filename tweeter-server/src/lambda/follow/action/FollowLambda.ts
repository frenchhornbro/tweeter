import { FollowRequest, FollowResponse } from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";
import { followAction } from "./FollowAction";
import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";

export const followHandler = async(request: FollowRequest): Promise<FollowResponse> => {
    return await followAction(request, new FollowService(new DynamoDBFactory()).follow);
};