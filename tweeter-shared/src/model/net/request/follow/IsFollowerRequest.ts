import { AuthenticatedRequest } from "../AuthenticatedRequest";

export interface IsFollowerRequest extends AuthenticatedRequest {
    readonly userAlias: string;
    readonly selectedUserAlias: string;
}