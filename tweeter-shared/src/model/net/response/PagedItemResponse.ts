import { StatusDTO } from "../../dto/StatusDTO";
import { UserDTO } from "../../dto/UserDTO";
import { TweeterResponse } from "./TweeterResponse";

export interface PagedItemResponse<T extends UserDTO | StatusDTO> extends TweeterResponse {
    readonly items: T[] | null;
    readonly hasMore: boolean;   
}