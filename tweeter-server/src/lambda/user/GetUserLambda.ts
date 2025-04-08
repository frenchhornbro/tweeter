import { GetUserRequest, GetUserResponse } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
import { DynamoDBFactory } from "../../factory/DynamoDBFactory";

export const getUserHandler = async(request: GetUserRequest): Promise<GetUserResponse> => {
    const userService: UserService = new UserService(new DynamoDBFactory());
    const user = await userService.getUser(request.token, request.alias);
    return {
        success: true,
        message: null,
        user: user
    }
};