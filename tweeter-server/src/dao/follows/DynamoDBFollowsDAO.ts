import { UserDTO } from "tweeter-shared";
import { FollowsDAO } from "./FollowsDAO";
import { DeleteCommand, GetCommand, PutCommand, QueryCommand, QueryCommandInput } from "@aws-sdk/lib-dynamodb";
import { DyanmoDBPagedDAO } from "../DynamoDBPagedDAO";

export class DynamoDBFollowsDAO extends DyanmoDBPagedDAO implements FollowsDAO {
    private tablename = "follows";
    private indexname = "follows_index";

    public async getPageOfFollowees(alias: string, pageSize: number, lastItem: UserDTO | null): Promise<[followeeAliases: string[], hasMorePages: boolean]> {
        const params = {
            TableName: this.tablename,
            IndexName: this.indexname,
            KeyConditionExpression: "followee_handle = :alias",
            ExpressionAttributeValues: {":alias": alias},
            Limit: pageSize,
            ExclusiveStartKey: lastItem ? this.generateFollowKey(alias, lastItem.alias) : undefined
        };
        return await this.getPage(params, "follower_handle");
    }

    public async getPageOfFollowers(alias: string, pageSize: number, lastItem: UserDTO | null): Promise<[followerAliases: string[], hasMorePages: boolean]> {
        const params = {
            TableName: this.tablename,
            KeyConditionExpression: "follower_handle = :alias",
            ExpressionAttributeValues: {":alias": alias},
            Limit: pageSize,
            ExclusiveStartKey: lastItem ? this.generateFollowKey(lastItem.alias, alias) : undefined
        };
        return await this.getPage(params, "followee_handle");
    }

    public async getFollowees(alias: string): Promise<string[]> {
        const params = {
            TableName: this.tablename,
            IndexName: this.indexname,
            KeyConditionExpression: "followee_handle = :alias",
            ExpressionAttributeValues: {":alias": alias}
        };
        return (await this.getPage<string>(params, "follower_handle"))[0];
    }
    
    public async getFollowers(alias: string): Promise<string[]> {
        const params = {
            TableName: this.tablename,
            KeyConditionExpression: "follower_handle = :alias",
            ExpressionAttributeValues: {":alias": alias},
        };
        return (await this.getPage<string>(params, "followee_handle"))[0];
    }

    public async getIsFollowerStatus(alias: string, selectedUserAlias: string): Promise<boolean> {
        const params = {
            TableName: this.tablename,
            Key: this.generateFollowKey(alias, selectedUserAlias)
        };
        const res = await this.client.send(new GetCommand(params));
        return res.Item !== undefined;
    }

    public async addFollow(followerAlias: string, followeeAlias: string): Promise<void> {
        const params = {
            TableName: this.tablename,
            Item: this.generateFollowKey(followerAlias, followeeAlias)
        };
        await this.client.send(new PutCommand(params));
    }

    public async removeFollow(followerAlias: string, followeeAlias: string): Promise<void> {
        const params = {
            TableName: this.tablename,
            Key: this.generateFollowKey(followerAlias, followeeAlias)
        };
        await this.client.send(new DeleteCommand(params));
    }

    private generateFollowKey(followerAlias: string, followeeAlias: string) {
        return {
            follower_handle: followerAlias,
            followee_handle: followeeAlias
        }
    }
}