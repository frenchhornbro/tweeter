import { PostStatusRequest, TweeterResponse } from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";
import { superHandler } from "../BlankResponseLambda";
import { DynamoDBFactory } from "../../factory/DynamoDBFactory";

export const handler = async(request: PostStatusRequest): Promise<TweeterResponse> => {
    const statusService: StatusService = new StatusService(new DynamoDBFactory());
    return await superHandler(statusService, statusService.postStatus, request.token, request.newStatus);
};