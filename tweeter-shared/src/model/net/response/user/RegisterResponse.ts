import { UserDTO } from "../../../dto/UserDTO";
import { TweeterResponse } from "../TweeterResponse";

export interface RegisterResponse extends TweeterResponse {
    user: UserDTO;
    token: string;
}