import { AuthenticationResponse, UserDTO } from "tweeter-shared";
import { UserService } from "../../../model/service/UserService";

export const superHandler = async(authenticationMethod: (...args: any) => Promise<[UserDTO, string, number]>, ...params: any): Promise<AuthenticationResponse> => {
    const [user, token, timestamp] = await authenticationMethod.call(new UserService(), ...params);
    return {
        success: true,
        message: null,
        user: user,
        token: token,
        timestamp: timestamp
    }
};