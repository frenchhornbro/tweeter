import { AuthenticatedRequest } from "../AuthenticatedRequest";

export interface FollowRequest extends AuthenticatedRequest {
    readonly userToFollowAlias: string;
}