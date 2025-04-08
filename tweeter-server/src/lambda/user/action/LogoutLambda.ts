import { AuthenticatedRequest, TweeterResponse } from "tweeter-shared";
import { UserService } from "../../../model/service/UserService";
import { blankResponseHandler } from "../../BlankResponseLambda";
import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";

export const logoutHandler = async(request: AuthenticatedRequest): Promise<TweeterResponse> => {
    const userService: UserService = new UserService(new DynamoDBFactory());
    return await blankResponseHandler(userService, userService.logout, request.token);
};