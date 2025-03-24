import { UserDTO } from "../../../dto/UserDTO";
import { AuthenticatedRequest } from "../AuthenticatedRequest";

export interface PagedUserItemRequest extends AuthenticatedRequest {
    readonly userAlias: string;
    readonly pageSize: number;
    readonly lastItem: UserDTO | null;
};