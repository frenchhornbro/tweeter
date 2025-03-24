import { UserDTO } from "../../../dto/UserDTO";
import { AuthenticatedRequest } from "../AuthenticatedRequest";

export interface IsFollowerRequest extends AuthenticatedRequest {
    readonly user: UserDTO;
    readonly selectedUser: UserDTO;
}