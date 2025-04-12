export interface QueueDAO {
    sendToQueue: (objectToSend: any, queueName: string) => Promise<void>;
}