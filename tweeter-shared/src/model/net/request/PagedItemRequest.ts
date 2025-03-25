import { StatusDTO } from "../../dto/StatusDTO";
import { UserDTO } from "../../dto/UserDTO";
import { AuthenticatedRequest } from "./AuthenticatedRequest";

export interface PagedItemRequest<T extends StatusDTO | UserDTO> extends AuthenticatedRequest {
    readonly userAlias: string;
    readonly pageSize: number;
    readonly lastItem: T | null;
}