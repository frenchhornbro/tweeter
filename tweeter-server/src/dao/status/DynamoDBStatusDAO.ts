import { StatusDTO } from "tweeter-shared";
import { StatusDAO } from "./StatusDAO";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { DyanmoDBPagedDAO } from "../DynamoDBPagedDAO";

export class DynamoDBStatusDAO extends DyanmoDBPagedDAO implements StatusDAO {
    private feedTableName = "feed";
    private storyTableName = "story";

    public async getPageOfFeedItems(alias: string, pageSize: number, lastItem: StatusDTO | null): Promise<[StatusDTO[], boolean]> {
        const params = {
            TableName: this.feedTableName,
            KeyConditionExpression: "alias = :alias",
            ExpressionAttributeValues: {":alias": alias},
            ScanIndexForward: false,
            Limit: pageSize,
            ExclusiveStartKey: lastItem ? this.generateStartKey(alias, lastItem.timestamp) : undefined
        };
        return await this.getPage<StatusDTO>(params, "status");
    }
    
    public async getPageOfStoryItems(alias: string, pageSize: number, lastItem: StatusDTO | null): Promise<[StatusDTO[], boolean]> {
        const params = {
            TableName: this.storyTableName,
            KeyConditionExpression: "alias = :alias",
            ExpressionAttributeValues: {":alias": alias},
            ScanIndexForward: false,
            Limit: pageSize,
            ExclusiveStartKey: lastItem ? this.generateStartKey(alias, lastItem.timestamp) : undefined
        };
        return await this.getPage<StatusDTO>(params, "status");
    }

    public async postToStory(status: StatusDTO): Promise<void> {
        const params = {
            TableName: this.storyTableName,
            Item: this.generateStatusKey(status.user.alias, status)
        };
        await this.client.send(new PutCommand(params));
    }

    private generateStartKey(alias: string, timestamp: number) {
        return {
            alias: alias,
            timestamp: timestamp
        };
    }

    private generateStatusKey(alias: string, status: StatusDTO) {
        return {
            alias: alias,
            timestamp: status.timestamp,
            status: status
        };
    }
}