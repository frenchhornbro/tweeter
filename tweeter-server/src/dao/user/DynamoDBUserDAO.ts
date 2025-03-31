import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBDAO } from "../DynamoDBDAO";
import { UserDAO } from "./UserDAO";

export class DynamoDBUserDAO extends DynamoDBDAO implements UserDAO {
    private readonly tablename = "users";

    public async addUser(firstName: string, lastName: string, alias: string, passwordHash: string, imageLink: string) {
        const params = {
            TableName: this.tablename,
            Item: {
                alias: alias, // Partition key
                firstName: firstName,
                lastName: lastName,
                password: passwordHash,
                s3Link: imageLink
            }
        };
        await this.client.send(new PutCommand(params));
    }
}