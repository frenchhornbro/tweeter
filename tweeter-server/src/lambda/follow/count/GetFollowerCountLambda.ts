import { UserItemCountRequest, UserItemCountResponse } from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";
import { superHandler } from "./GetUserItemCountLambda";

export const handler = async(request: UserItemCountRequest): Promise<UserItemCountResponse> => {
    return superHandler(request, new FollowService().getFollowerCount);
};