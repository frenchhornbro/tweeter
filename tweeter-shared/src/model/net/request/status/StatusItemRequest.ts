import { StatusDTO } from "../../../dto/StatusDTO";
import { TweeterRequest } from "../TweeterRequest";

export interface StatusItemRequest extends TweeterRequest {
    token: string;
    userAlias: string;
    pageSize: number;
    lastItem: StatusDTO | null;
}