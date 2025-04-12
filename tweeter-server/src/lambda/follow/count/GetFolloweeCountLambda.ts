import { UserItemCountRequest, UserItemCountResponse } from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";
import { getUserItemCount } from "./GetUserItemCount";
import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";

export const getFolloweeCountHandler = async(request: UserItemCountRequest): Promise<UserItemCountResponse> => {
    return await getUserItemCount(request, new FollowService(new DynamoDBFactory()).getFolloweeCount);
};