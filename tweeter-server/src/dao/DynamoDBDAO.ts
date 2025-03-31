import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export abstract class DynamoDBDAO {
    private readonly _client: DynamoDBClient;
    
    public constructor() {
        this._client = DynamoDBDocumentClient.from(new DynamoDBClient());
    }

    protected get client(): DynamoDBClient {
        return this._client;
    }
}