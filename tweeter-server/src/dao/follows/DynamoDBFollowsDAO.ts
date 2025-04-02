import { UserDTO } from "tweeter-shared";
import { DynamoDBDAO } from "../DynamoDBDAO";
import { FollowsDAO } from "./FollowsDAO";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export class DynamoDBFollowsDAO extends DynamoDBDAO implements FollowsDAO {
    private tablename = "follows";
    private indexname = "follows_index";

    public async getPageOfFollowees(alias: string, pageSize: number, lastItem: UserDTO | null): Promise<[followeeAliases: string[], hasMorePages: boolean]> {
        const params = {
            TableName: this.tablename,
            IndexName: this.indexname,
            KeyConditionExpression: "followee_handle = :alias",
            ExpressionAttributeValues: {":alias": alias},
            Limit: pageSize,
            ExclusiveStartKey: lastItem ? {
                follower_handle: alias,
                followee_handle: lastItem.alias
            } : undefined
        };
        const res = await this.client.send(new QueryCommand(params));
        const aliases: string[] = [];
        res.Items?.forEach((item) => aliases.push(item.follower_handle));
        const hasMore = res.LastEvaluatedKey !== undefined;
        return [aliases, hasMore];
    }

    public async getPageOfFollowers(alias: string, pageSize: number, lastItem: UserDTO | null): Promise<[followerAliases: string[], hasMorePages: boolean]> {
        const params = {
            TableName: this.tablename,
            KeyConditionExpression: "follower_handle = :alias",
            ExpressionAttributeValues: {":alias": alias},
            Limit: pageSize,
            ExclusiveStartKey: lastItem ? {
                follower_handle: lastItem.alias,
                followee_handle: alias
            } : undefined
        };
        const res = await this.client.send(new QueryCommand(params));
        const aliases: string[] = [];
        res.Items?.forEach((item) => aliases.push(item.followee_handle));
        const hasMore = res.LastEvaluatedKey !== undefined;
        return [aliases, hasMore];
    }
    
    public async getFollowers(alias: string): Promise<string[]> {
        const params = {
            TableName: this.tablename,
            KeyConditionExpression: "follower_handle = :alias",
            ExpressionAttributeValues: {":alias": alias},
        };
        const res = await this.client.send(new QueryCommand(params));
        const aliases: string[] = [];
        res.Items?.forEach((item) => aliases.push(item.followee_handle));
        return aliases;
    }
}