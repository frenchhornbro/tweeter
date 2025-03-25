import { PostStatusRequest, TweeterResponse } from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";
import { superHandler } from "../BlankResponseLambda";

export const handler = async(request: PostStatusRequest): Promise<TweeterResponse> => {
    const statusService: StatusService = new StatusService();
    return await superHandler(statusService, statusService.postStatus, request.token, request.newStatus);
};