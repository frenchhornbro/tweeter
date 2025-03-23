import { StatusDTO } from "../../../dto/StatusDTO";
import { TweeterRequest } from "../TweeterRequest";

export interface PostStatusRequest extends TweeterRequest {
    token: string,
    newStatus: StatusDTO
}