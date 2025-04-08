import { StatusDTO } from "tweeter-shared";

export interface QueueDAO {
    sendToPostStatusQueue: (status: StatusDTO) => Promise<void>;
}