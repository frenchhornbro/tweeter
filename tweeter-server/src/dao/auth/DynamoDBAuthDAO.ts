import { AuthToken } from "tweeter-shared";
import { AuthDAO } from "./AuthDAO";
import { DynamoDBDAO } from "../DynamoDBDAO";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

export class DynamoDBAuthDAO extends DynamoDBDAO implements AuthDAO {
    private readonly tablename = "auth";

    public async addAuth(alias:string, authToken: AuthToken) {
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
}