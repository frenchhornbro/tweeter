import { PostStatusRequest, TweeterResponse } from "tweeter-shared";
import { StatusService } from "../../../model/service/StatusService";
import { blankResponse } from "../../BlankResponse";
import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";

export const postStatusHandler = async(request: PostStatusRequest): Promise<TweeterResponse> => {
    const statusService: StatusService = new StatusService(new DynamoDBFactory());
    return await blankResponse(statusService, statusService.postStatus, request.token, request.newStatus);
};