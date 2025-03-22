import { UserDTO } from "../../../dto/UserDTO";
import { TweeterRequest } from "../TweeterRequest";

export interface FollowRequest extends TweeterRequest {
    token: string,
    userToFollow: UserDTO
}