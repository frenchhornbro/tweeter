import { UserItemCountRequest, UserItemCountResponse } from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";

export const superHandler = async(request: UserItemCountRequest, serviceMethod: (token: string, userAlias: string) => Promise<number>): Promise<UserItemCountResponse> => {
    const count = await serviceMethod.call(new FollowService(), request.token, request.userAlias);
    return {
        success: true,
        message: null,
        count: count
    };
};