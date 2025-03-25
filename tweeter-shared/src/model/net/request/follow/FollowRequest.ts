import { UserDTO } from "../../../dto/UserDTO";
import { AuthenticatedRequest } from "../AuthenticatedRequest";

export interface FollowRequest extends AuthenticatedRequest {
    readonly userToFollow: UserDTO;
}