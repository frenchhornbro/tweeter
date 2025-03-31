import { AuthenticationResponse, RegisterRequest } from "tweeter-shared";
import { UserService } from "../../../model/service/UserService";
import { superHandler } from "./AuthenticateLambda";
import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";

export const handler = async(request: RegisterRequest): Promise<AuthenticationResponse> => {
    return await superHandler(new UserService(new DynamoDBFactory()).register, request.firstName, request.lastName, request.alias, request.password, request.userImageBytes, request.imageFileExtension);
};