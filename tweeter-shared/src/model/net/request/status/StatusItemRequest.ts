import { StatusDTO } from "../../../dto/StatusDTO";
import { AuthenticatedRequest } from "../AuthenticatedRequest";

export interface StatusItemRequest extends AuthenticatedRequest {
    userAlias: string;
    pageSize: number;
    lastItem: StatusDTO | null;
}