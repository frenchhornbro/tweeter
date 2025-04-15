import { StatusDTO } from "../../../dto/StatusDTO";
import { TweeterRequest } from "../TweeterRequest";

export interface PostUpdateFeedMessageRequest extends TweeterRequest {
    readonly newStatus: StatusDTO;
}