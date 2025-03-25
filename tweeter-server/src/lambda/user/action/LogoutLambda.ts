import { AuthenticatedRequest, TweeterResponse } from "tweeter-shared";
import { UserService } from "../../../model/service/UserService";
import { superHandler } from "../../BlankResponseLambda";

export const handler = async(request: AuthenticatedRequest): Promise<TweeterResponse> => {
    const userService: UserService = new UserService();
    return await superHandler(userService, userService.logout, request.token);
};