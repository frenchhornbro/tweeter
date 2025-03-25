import { StatusDTO } from "../../../dto/StatusDTO";
import { AuthenticatedRequest } from "../AuthenticatedRequest";

export interface PostStatusRequest extends AuthenticatedRequest {
    readonly newStatus: StatusDTO;
}