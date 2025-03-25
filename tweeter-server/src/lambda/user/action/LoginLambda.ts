import { AuthenticationRequest, AuthenticationResponse } from "tweeter-shared";
import { UserService } from "../../../model/service/UserService";
import { superHandler } from "./AuthenticateLambda";

export const handler = async(request: AuthenticationRequest): Promise<AuthenticationResponse> => {
    return await superHandler(new UserService().login, request.alias, request.password);
};