import { TweeterResponse } from "./TweeterResponse";

export interface FollowerCountResponse extends TweeterResponse {
    count: number
}