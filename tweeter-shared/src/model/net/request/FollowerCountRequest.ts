import { UserDTO } from "../../dto/UserDTO";
import { TweeterRequest } from "./TweeterRequest";

export interface FollowerCountRequest extends TweeterRequest {
    readonly token: string,
    readonly user: UserDTO
}