import { AuthToken, UserDTO } from "tweeter-shared";
import { AuthDAO } from "./AuthDAO";
import { DynamoDBDAO } from "../DynamoDBDAO";
import { DeleteCommand, GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

export class DynamoDBAuthDAO extends DynamoDBDAO implements AuthDAO {
    private readonly tablename = "auth";

    public async addAuth(alias: string, authToken: AuthToken): Promise<void> {
        const params = {
            TableName: this.tablename,
            Item: {
                token: authToken.token, // partition key
                expires: authToken.timestamp + 60*60*1000,
                alias: alias
            }
        };
        await this.client.send(new PutCommand(params));
    }

    public async updateAuth(token: string): Promise<void> {
        const params = {
            TableName: this.tablename,
            Key: {token: token},
            UpdateExpression: `SET expires = :now`,
            ExpressionAttributeValues: {
                ":now": Date.now() + 60*60*1000
            }
        };
        await this.client.send(new UpdateCommand(params));
    }

    public async removeAuth(token: string): Promise<void> {
        await this.client.send(new DeleteCommand(this.generateAuthParams(token)));
    }

    public async getAuth(token: string): Promise<[string, number]> {
        const res = await this.client.send(new GetCommand(this.generateAuthParams(token)));
        return [res.Item?.token, res.Item?.expires];
    }
    public async getUser(token: string): Promise<UserDTO> {
        const res = await this.client.send(new GetCommand(this.generateAuthParams(token)));
        return {
            firstname: res.Item?.firstName,
            lastname: res.Item?.lastName,
            alias: res.Item?.alias,
            imageURL: res.Item?.s3Link
        };
    }
    
    private generateAuthParams(token: string) {    
        return {
            TableName: this.tablename,
            Key: {token: token}
        };
    }
}