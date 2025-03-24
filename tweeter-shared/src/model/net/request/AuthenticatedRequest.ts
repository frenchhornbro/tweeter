import { TweeterRequest } from "./TweeterRequest";

export interface AuthenticatedRequest extends TweeterRequest {
    token: string;
}