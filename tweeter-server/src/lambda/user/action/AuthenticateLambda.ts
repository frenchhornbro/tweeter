import { AuthenticationResponse, UserDTO } from "tweeter-shared";
import { UserService } from "../../../model/service/UserService";
import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";

export const authenticateHandler = async(serviceMethod: (...args: any) => Promise<[UserDTO, string, number]>, ...params: any): Promise<AuthenticationResponse> => {
    const [user, token, timestamp] = await serviceMethod.call(new UserService(new DynamoDBFactory()), ...params);
    return {
        success: true,
        message: null,
        user: user,
        token: token,
        timestamp: timestamp
    }
};