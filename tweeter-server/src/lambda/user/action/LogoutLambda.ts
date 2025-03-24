import { AuthenticatedRequest, TweeterResponse } from "tweeter-shared";
import { UserService } from "../../../model/service/UserService";

export const handler = async(request: AuthenticatedRequest): Promise<TweeterResponse> => {
    const userService: UserService = new UserService();
    await userService.logout(request.token);
    return {
        success: true,
        message: null
    }
};