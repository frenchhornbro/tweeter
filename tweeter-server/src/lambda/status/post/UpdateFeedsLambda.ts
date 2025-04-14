import { SQSEvent } from "aws-lambda";
import { StatusService } from "../../../model/service/StatusService";
import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";
import { UpdateFeedRequest } from "tweeter-shared";

export const updateFeedsHandler = async(event: SQSEvent) => {
    const statusService = new StatusService(new DynamoDBFactory());

    for (let i = 0; i < event.Records.length; i++) {
        // Execute all messages in the SQS Update Feed Queue
        const body = event.Records[i].body;
        const request = JSON.parse(body) as UpdateFeedRequest;
        await statusService.updateFeeds(request.followerAliases, request.status);
    }
};