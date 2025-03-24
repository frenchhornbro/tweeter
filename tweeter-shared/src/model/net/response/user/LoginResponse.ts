import { UserDTO } from "../../../dto/UserDTO";
import { TweeterResponse } from "../TweeterResponse";

export interface LoginResponse extends TweeterResponse {
    user: UserDTO;
    token: string;
    timestamp: number;
}