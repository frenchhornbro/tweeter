import { AuthenticatedRequest, TweeterResponse } from "tweeter-shared";
import { UserService } from "../../../model/service/UserService";
import { superHandler } from "../../BlankResponseLambda";
import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";

export const handler = async(request: AuthenticatedRequest): Promise<TweeterResponse> => {
    const userService: UserService = new UserService(new DynamoDBFactory());
    return await superHandler(userService, userService.logout, request.token);
};