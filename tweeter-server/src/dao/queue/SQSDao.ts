import { StatusDTO } from "tweeter-shared";
import { QueueDAO } from "./QueueDAO";
import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";

export class SQSDAO implements QueueDAO {
    private sqsClient: SQSClient;

    public constructor() {
        this.sqsClient = new SQSClient();
    }

    public async sendToPostStatusQueue(status: StatusDTO): Promise<void> {
        const params = {
            QueueUrl: "https://sqs.us-east-1.amazonaws.com/891377292039/Tweeter-Post-Status-Queue",
            MessageBody: JSON.stringify(status),
            DelaySeconds: 10
        };
        await this.sqsClient.send(new SendMessageCommand(params));
    }
}