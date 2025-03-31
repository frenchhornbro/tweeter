import { AuthenticationRequest, AuthenticationResponse } from "tweeter-shared";
import { UserService } from "../../../model/service/UserService";
import { superHandler } from "./AuthenticateLambda";
import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";

export const handler = async(request: AuthenticationRequest): Promise<AuthenticationResponse> => {
    return await superHandler(new UserService(new DynamoDBFactory()).login, request.alias, request.password);
};