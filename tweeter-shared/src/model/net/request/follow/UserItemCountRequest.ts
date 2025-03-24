import { AuthenticatedRequest } from "../AuthenticatedRequest";

export interface UserItemCountRequest extends AuthenticatedRequest {
    readonly userAlias: string;
}