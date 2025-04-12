import { TweeterResponse } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { StatusService } from "../model/service/StatusService";

export const blankResponse = async(service: StatusService | UserService, serviceMethod: (...args: any) => Promise<void>, ...params: any): Promise<TweeterResponse> => {
    await serviceMethod.call(service, ...params);
    return {
        success: true,
        message: null
    }
};