import { QueueDAO } from "./QueueDAO";
import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";

export class SQSDAO implements QueueDAO {
    private sqsClient: SQSClient;

    public constructor() {
        this.sqsClient = new SQSClient();
    }

    public async sendToQueue(objectToSend: any, queueName: string): Promise<void> {
        const params = {
            QueueUrl: `https://sqs.us-east-1.amazonaws.com/891377292039/${queueName}`,
            MessageBody: JSON.stringify(objectToSend)
        };
        await this.sqsClient.send(new SendMessageCommand(params));
    }
}