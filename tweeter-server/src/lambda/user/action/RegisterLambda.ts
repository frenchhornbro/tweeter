import { AuthenticationResponse, RegisterRequest } from "tweeter-shared";
import { UserService } from "../../../model/service/UserService";
import { superHandler } from "./AuthenticateLambda";

export const handler = async(request: RegisterRequest): Promise<AuthenticationResponse> => {
    return await superHandler(new UserService().register, request.firstName, request.lastName, request.alias, request.password, request.userImageBytes, request.imageFileExtension);
};