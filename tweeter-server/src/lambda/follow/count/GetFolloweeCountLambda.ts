import { UserItemCountRequest, UserItemCountResponse } from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";
import { superHandler } from "./GetUserItemCountLambda";
import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";

export const handler = async(request: UserItemCountRequest): Promise<UserItemCountResponse> => {
    return await superHandler(request, new FollowService(new DynamoDBFactory()).getFolloweeCount);
};