import { UserItemCountRequest, UserItemCountResponse } from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";
import { getUserItemCountHandler } from "./GetUserItemCountLambda";
import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";

export const getFolloweeCountHandler = async(request: UserItemCountRequest): Promise<UserItemCountResponse> => {
    return await getUserItemCountHandler(request, new FollowService(new DynamoDBFactory()).getFolloweeCount);
};