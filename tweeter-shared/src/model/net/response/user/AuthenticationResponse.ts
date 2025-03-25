import { UserDTO } from "../../../dto/UserDTO";
import { TweeterResponse } from "../TweeterResponse";

export interface AuthenticationResponse extends TweeterResponse {
    readonly user: UserDTO;
    readonly token: string;
    readonly timestamp: number;
}