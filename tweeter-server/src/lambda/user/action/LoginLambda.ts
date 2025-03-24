import { LoginRequest, LoginResponse } from "tweeter-shared";
import { UserService } from "../../../model/service/UserService";

export const handler = async(request: LoginRequest): Promise<LoginResponse> => {
    const userService: UserService = new UserService();
    const [user, token, timestamp] = await userService.login(request.alias, request.password);
    return {
        success: true,
        message: null,
        user: user,
        token: token,
        timestamp: timestamp
    }
};