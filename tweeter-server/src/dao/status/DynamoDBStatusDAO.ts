import { StatusDTO } from "tweeter-shared";
import { StatusDAO } from "./StatusDAO";
import { DynamoDBDAO } from "../DynamoDBDAO";
import { BatchGetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

export class DynamoDBStatusDAO extends DynamoDBDAO implements StatusDAO {
    private statusTableName = "status";
    private feedTableName = "feed";

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
        const res = await this.client.send(new QueryCommand(params));
        const statuses: StatusDTO[] = [];
        res.Items?.forEach((item) => statuses.push(item.status));
        const hasMore = res.LastEvaluatedKey !== undefined;
        return [statuses, hasMore];
    }

    public async getPageOfStatusData(statusIDs: number[]): Promise<StatusDTO[]> {
        const keys = statusIDs.map<Record<number, {}>>((statusID) => ({["statusID"]: statusID}));
        const params = {
            RequestItems: {
                [this.statusTableName]: {
                    Keys: keys
                }
            }
        };
        const res = await this.client.send(new BatchGetCommand(params));
        if (!res.Responses) return [];
        return res.Responses[this.statusTableName].map<StatusDTO>(
            (item) => ({
                post: item["post"],
                user: item["user"],
                timestamp: item["timestamp"]
            })
        );
    }
}