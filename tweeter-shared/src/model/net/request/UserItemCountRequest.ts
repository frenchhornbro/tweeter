import { TweeterRequest } from "./TweeterRequest";

export interface UserItemCountRequest extends TweeterRequest {
    readonly token: string,
    readonly userAlias: string
}