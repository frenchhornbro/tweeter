import { AuthenticatedRequest, TweeterResponse } from "tweeter-shared";
import { UserService } from "../../../model/service/UserService";
import { blankResponse } from "../../BlankResponse";
import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";

export const logoutHandler = async(request: AuthenticatedRequest): Promise<TweeterResponse> => {
    const userService: UserService = new UserService(new DynamoDBFactory());
    return await blankResponse(userService, userService.logout, request.token);
};