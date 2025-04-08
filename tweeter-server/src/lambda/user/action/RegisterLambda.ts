import { AuthenticationResponse, RegisterRequest } from "tweeter-shared";
import { UserService } from "../../../model/service/UserService";
import { authenticateHandler } from "./AuthenticateLambda";
import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";

export const registerHandler = async(request: RegisterRequest): Promise<AuthenticationResponse> => {
    return await authenticateHandler(new UserService(new DynamoDBFactory()).register, request.firstName, request.lastName, request.alias, request.password, request.userImageBytes, request.imageFileExtension);
};