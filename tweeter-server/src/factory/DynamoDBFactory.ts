import { AuthDAO } from "../dao/auth/AuthDAO";
import { DynamoDBAuthDAO } from "../dao/auth/DynamoDBAuthDAO";
import { DynamoDBFollowsDAO } from "../dao/follows/DynamoDBFollowsDAO";
import { FollowsDAO } from "../dao/follows/FollowsDAO";
import { ImageDAO } from "../dao/image/ImageDAO";
import { S3ImageDAO } from "../dao/image/S3ImageDAO";
import { QueueDAO } from "../dao/queue/QueueDAO";
import { SQSDAO } from "../dao/queue/SQSDao";
import { DynamoDBStatusDAO } from "../dao/status/DynamoDBStatusDAO";
import { StatusDAO } from "../dao/status/StatusDAO";
import { DynamoDBUserDAO } from "../dao/user/DynamoDBUserDAO";
import { UserDAO } from "../dao/user/UserDAO";
import { Factory } from "./Factory";

export class DynamoDBFactory implements Factory {
    public getUserDAO(): UserDAO {
        return new DynamoDBUserDAO();
    }

    public getAuthDAO(): AuthDAO {
        return new DynamoDBAuthDAO();
    }

    public getImageDAO(): ImageDAO {
        return new S3ImageDAO();
    }

    public getFollowsDAO(): FollowsDAO {
        return new DynamoDBFollowsDAO();
    }

    public getStatusDAO(): StatusDAO {
        return new DynamoDBStatusDAO();
    }

    public getQueueDAO(): QueueDAO {
        return new SQSDAO();
    }
}