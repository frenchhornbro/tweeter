import { QueryCommand, QueryCommandInput } from "@aws-sdk/lib-dynamodb";
import { DynamoDBDAO } from "./DynamoDBDAO";
import { StatusDTO } from "tweeter-shared";

export class DyanmoDBPagedDAO extends DynamoDBDAO {
    protected async getPage<T extends StatusDTO | string>(params: QueryCommandInput, attribute: string): Promise<[T[], boolean]> {
        const res = await this.client.send(new QueryCommand(params));
        console.log(`Consumed capacity logs: ${JSON.stringify(res.ConsumedCapacity, null, 2)}`);
        const items: T[] = [];
        res.Items?.forEach((item) => items.push(item[attribute]));
        const hasMore = res.LastEvaluatedKey !== undefined;
        return [items, hasMore];
    }
}