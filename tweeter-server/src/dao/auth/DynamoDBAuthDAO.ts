import { AuthToken, UserDTO } from "tweeter-shared";
import { AuthDAO } from "./AuthDAO";
import { DynamoDBDAO } from "../DynamoDBDAO";
import { DeleteCommand, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

export class DynamoDBAuthDAO extends DynamoDBDAO implements AuthDAO {
    private readonly tablename = "auth";

    public async addAuth(alias: string, authToken: AuthToken): Promise<void> {
        const params = {
            TableName: this.tablename,
            Item: {
                token: authToken.token, // partition key
                timestamp: authToken.timestamp,
                alias: alias
            }
        };
        await this.client.send(new PutCommand(params));
    }

    public async removeAuth(token: string): Promise<void> {
        const params = {
            TableName: this.tablename,
            Key: {token: token}
        };
        await this.client.send(new DeleteCommand(params));
    }

    public async authExists(token: string): Promise<boolean> {
        const params = {
            TableName: this.tablename,
            Key: {token: token}
        };
        const res = await this.client.send(new GetCommand(params));
        return res.Item !== undefined;
    }

    public async getUser(token: string): Promise<UserDTO> {
        const params = {
            TableName: this.tablename,
            Key: {token: token}
        };
        const res = await this.client.send(new GetCommand(params));
        return {
            firstname: res.Item?.firstName,
            lastname: res.Item?.lastName,
            alias: res.Item?.alias,
            imageURL: res.Item?.s3Link
        };
    }
}