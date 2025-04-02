import { StatusDTO } from "tweeter-shared";
import { StatusDAO } from "./StatusDAO";
import { DynamoDBDAO } from "../DynamoDBDAO";
import { QueryCommand, QueryCommandInput } from "@aws-sdk/lib-dynamodb";

export class DynamoDBStatusDAO extends DynamoDBDAO implements StatusDAO {
    private feedTableName = "feed";
    private storyTableName = "story";

    public async getPageOfFeedItems(alias: string, pageSize: number, lastItem: StatusDTO | null): Promise<[StatusDTO[], boolean]> {
        const params = {
            TableName: this.feedTableName,
            KeyConditionExpression: "alias = :alias",
            ExpressionAttributeValues: {":alias": alias},
            Limit: pageSize,
            ExclusiveStartKey: lastItem ? {
                alias: alias,
                timestamp: lastItem.timestamp
            } : undefined
        };
        return await this.getQueryResponse(params);
    }
    
    public async getPageOfStoryItems(alias: string, pageSize: number, lastItem: StatusDTO | null): Promise<[StatusDTO[], boolean]> {
        const params = {
            TableName: this.storyTableName,
            KeyConditionExpression: "alias=  :alias",
            ExpressionAttributeValues: {":alias": alias},
            Limit: pageSize,
            ExclusiveStartKey: lastItem ? {
                alias: alias,
                timestamp: lastItem.timestamp
            } : undefined
        };
        return await this.getQueryResponse(params);
    }
    
    private async getQueryResponse(params: QueryCommandInput): Promise<[StatusDTO[], boolean]> {
        const res = await this.client.send(new QueryCommand(params));
        const statuses: StatusDTO[] = [];
        res.Items?.forEach((item) => statuses.push(item.status));
        const hasMore = res.LastEvaluatedKey !== undefined;
        return [statuses, hasMore];
    }
}