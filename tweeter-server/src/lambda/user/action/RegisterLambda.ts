import { AuthenticationResponse, RegisterRequest } from "tweeter-shared";
import { UserService } from "../../../model/service/UserService";

export const handler = async(request: RegisterRequest): Promise<AuthenticationResponse> => {
    const userService: UserService = new UserService();
    const [user, token, timestamp] = await userService.register(request.firstName, request.lastName, request.alias, request.password, request.userImageBytes, request.imageFileExtension);
    return {
        success: true,
        message: null,
        user: user,
        token: token,
        timestamp: timestamp
    }
};