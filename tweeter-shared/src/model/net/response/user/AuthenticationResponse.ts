import { UserDTO } from "../../../dto/UserDTO";
import { TweeterResponse } from "../TweeterResponse";

export interface AuthenticationResponse extends TweeterResponse {
    user: UserDTO;
    token: string;
    timestamp: number;
}