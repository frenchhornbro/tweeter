import { FollowRequest, FollowResponse, UserDTO } from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";

export const superHandler = async(request: FollowRequest, followAction: (token: string, userToFollow: UserDTO) => Promise<[number, number]>): Promise<FollowResponse> => {
    const [followerCount, followeeCount] = await followAction.call(new FollowService(), request.token, request.userToFollow);
    return {
        success: true,
        message: null,
        followerCount: followerCount,
        followeeCount: followeeCount
    };
};