import { StatusDTO } from "../../../dto/StatusDTO";
import { TweeterResponse } from "../TweeterResponse";

export interface StatusItemResponse extends TweeterResponse {
    items: StatusDTO[] | null;
    hasMore: boolean;
}