import { AuthenticationRequest, AuthenticationResponse } from "tweeter-shared";
import { UserService } from "../../../model/service/UserService";
import { authenticateHandler } from "./AuthenticateLambda";
import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";

export const loginHandler = async(request: AuthenticationRequest): Promise<AuthenticationResponse> => {
    return await authenticateHandler(new UserService(new DynamoDBFactory()).login, request.alias, request.password);
};