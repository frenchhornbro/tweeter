import { FollowRequest, FollowResponse, UserDTO } from "tweeter-shared";
import { FollowService } from "../../../model/service/FollowService";
import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";

export const superHandler = async(request: FollowRequest, serviceMethod: (token: string, userToFollow: UserDTO) => Promise<[number, number]>): Promise<FollowResponse> => {
    const [followerCount, followeeCount] = await serviceMethod.call(new FollowService(new DynamoDBFactory()), request.token, request.userToFollow);
    return {
        success: true,
        message: null,
        followerCount: followerCount,
        followeeCount: followeeCount
    };
};