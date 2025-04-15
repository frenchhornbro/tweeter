import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";
import { SQSEvent } from "aws-lambda";
import { FollowService } from "../../../model/service/FollowService";
import { PostUpdateFeedMessageRequest } from "tweeter-shared";

export const postUpdateFeedMessageHandler = async(event: SQSEvent) => {
    const followService = new FollowService(new DynamoDBFactory());

    for (let i = 0; i < event.Records.length; i++) {
        // Produce messages to be placed in the SQS Update Feed Queue
        const body = event.Records[i].body;
        const request = JSON.parse(body) as PostUpdateFeedMessageRequest;
        console.log("Calling PostUpdateFeedMessage lambda function");
        await followService.sendFollowerInfoMessage(request.newStatus);
    }
};