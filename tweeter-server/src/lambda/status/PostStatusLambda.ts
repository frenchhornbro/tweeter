import { PostStatusRequest, TweeterResponse } from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";
import { blankResponseHandler } from "../BlankResponseLambda";
import { DynamoDBFactory } from "../../factory/DynamoDBFactory";

export const postStatusHandler = async(request: PostStatusRequest): Promise<TweeterResponse> => {
    const statusService: StatusService = new StatusService(new DynamoDBFactory());
    return await blankResponseHandler(statusService, statusService.postStatus, request.token, request.newStatus);
};