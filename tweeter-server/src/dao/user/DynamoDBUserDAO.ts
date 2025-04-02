import { BatchGetCommand, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBDAO } from "../DynamoDBDAO";
import { UserDAO } from "./UserDAO";
import { UserDTO } from "tweeter-shared";

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

    public async userExists(alias: string): Promise<boolean> {
        const params = {
            TableName: this.tablename,
            Key: {alias: alias}
        };
        const res = await this.client.send(new GetCommand(params));
        return res.Item !== undefined;
    }

    public async getPasswordHash(alias: string): Promise<string> {
        const params = {
            TableName: this.tablename,
            Key: {alias: alias}
        };
        const res = await this.client.send(new GetCommand(params));
        return res.Item?.password;
    }

    public async getUserDTO(alias: string): Promise<UserDTO> {
        const params = {
            TableName: this.tablename,
            Key: {alias: alias}
        };
        const res = await this.client.send(new GetCommand(params));
        return {
            firstname: res.Item?.firstName,
            lastname: res.Item?.lastName,
            alias: res.Item?.alias,
            imageURL: res.Item?.s3Link
        };
    }

    public async getPageOfUserData(aliases: string[]): Promise<UserDTO[]> {
        const keys = aliases.map<Record<string, {}>>((alias) => ({["alias"]: alias}));
        const params = {
            RequestItems: {
                [this.tablename]: {
                    Keys: keys
                }
            }
        };
        const res = await this.client.send(new BatchGetCommand(params));
        if (!res.Responses) return [];
        return res.Responses[this.tablename].map<UserDTO>(
            (item) => ({
                firstname: item["firstName"],
                lastname: item["lastName"],
                alias: item["alias"],
                imageURL: item["s3Link"]
            })
        );
    }
}