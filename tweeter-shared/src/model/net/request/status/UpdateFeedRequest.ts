import { StatusDTO } from "../../../dto/StatusDTO";
import { TweeterRequest } from "../TweeterRequest";

export interface UpdateFeedRequest extends TweeterRequest {
    readonly followerAliases: string[];
    readonly status: StatusDTO;
}