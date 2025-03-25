import { TweeterResponse } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { StatusService } from "../model/service/StatusService";

export const superHandler = async(service: StatusService | UserService, method: (...args: any) => Promise<void>, ...params: any): Promise<TweeterResponse> => {
    method.call(service, ...params);
    return {
        success: true,
        message: null
    }
};