import { AuthenticatedRequest } from "../AuthenticatedRequest";

export interface GetUserRequest extends AuthenticatedRequest {
    alias: string;
}