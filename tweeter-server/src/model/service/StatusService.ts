import { PostStatusRequest, StatusDTO } from "tweeter-shared";
import { Service } from "./Service";
import { Factory } from "../../factory/Factory";
import { StatusDAO } from "../../dao/status/StatusDAO";
import { UserError } from "../error/UserError";
import { QueueDAO } from "../../dao/queue/QueueDAO";

export class StatusService extends Service {
    private statusDAO: StatusDAO;
    private queueDAO: QueueDAO;

    public constructor(factory: Factory) {
        super(factory);
        this.statusDAO = factory.getStatusDAO();
        this.queueDAO = factory.getQueueDAO();
    }

    public async loadMoreFeedItems(token: string, userAlias: string, pageSize: number, lastItem: StatusDTO | null): Promise<[StatusDTO[], boolean]> {
        // This is the statuses posted by people I follow
        return await this.checkForError(async() => {
            await this.checkToken(token);
            return await this.statusDAO.getPageOfFeedItems(userAlias, pageSize, lastItem);
        });
    }
    
    public async loadMoreStoryItems(token: string, userAlias: string, pageSize: number, lastItem: StatusDTO | null ): Promise<[StatusDTO[], boolean]> {
        // This is the statuses I have posted
        return await this.checkForError(async() => {
            await this.checkToken(token);
            return await this.statusDAO.getPageOfStoryItems(userAlias, pageSize, lastItem);
        });
    }

    public async postStatus(token: string, newStatus: StatusDTO ): Promise<void> {
        // Post status to user's story and to all followers' feeds
        await this.checkForError(async() => {
            await this.checkToken(token);
            const user = await this.authDAO.getUser(token);
            if (user.alias !== newStatus.user.alias) throw new UserError("Auth token owner does not match status author");
            await this.statusDAO.postToStory(newStatus);
            const sendObject: PostStatusRequest = {
                token: token,
                newStatus: newStatus
            };
            await this.queueDAO.sendToQueue(sendObject, "Tweeter-Post-Status-Queue");
        });
    }

    public async updateFeeds(followerAliases: string[], status: StatusDTO): Promise<void> {
        await this.checkForError(async() => {
            await this.statusDAO.updateFeeds(followerAliases, status);
        });
    }
}