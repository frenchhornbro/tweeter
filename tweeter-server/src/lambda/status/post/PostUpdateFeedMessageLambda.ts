import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";
import { SQSEvent } from "aws-lambda";
import { FollowService } from "../../../model/service/FollowService";
import { PostStatusRequest } from "tweeter-shared";

export const postUpdateFeedMessageHandler = async(event: SQSEvent) => {
    const followService = new FollowService(new DynamoDBFactory());

    for (let i = 0; i < event.Records.length; i++) {
        // Produce messages to be placed in the SQS Update Feed Queue
        const body = event.Records[i].body;
        const request = JSON.parse(body) as PostStatusRequest;
        await followService.sendFollowerInfoMessage(request.newStatus, request.token);
    }
};