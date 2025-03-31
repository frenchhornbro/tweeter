import { AuthDAO } from "../dao/auth/AuthDAO";
import { DynamoDBAuthDAO } from "../dao/auth/DynamoDBAuthDAO";
import { ImageDAO } from "../dao/image/ImageDAO";
import { S3ImageDAO } from "../dao/image/S3ImageDAO";
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
}