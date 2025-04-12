import { DynamoDBFactory } from "../../../factory/DynamoDBFactory";
import { SQSEvent } from "aws-lambda";
import { FollowService } from "../../../model/service/FollowService";
import { StatusDTO } from "tweeter-shared";
import { StatusService } from "../../../model/service/StatusService";

export const postUpdateFeedMessageHandler = async(event: SQSEvent) => {
    const followService = new FollowService(new DynamoDBFactory());
    const statusService = new StatusService(new DynamoDBFactory());
    for (let i = 0; i < event.Records.length; i++) {
        // Produce messages to be placed in the SQS Update Feed Queue
        const body = event.Records[i].body;
        const request = JSON.parse(body);
        const status: StatusDTO = request.status;
        const groupedFollowerAlises: string[][] = await followService.getGroupedFollowers(request);
        await statusService.updateFeed(groupedFollowerAlises, status);
    }
};