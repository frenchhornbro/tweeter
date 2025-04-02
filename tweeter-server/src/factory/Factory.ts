import { AuthDAO } from "../dao/auth/AuthDAO";
import { FollowsDAO } from "../dao/follows/FollowsDAO";
import { ImageDAO } from "../dao/image/ImageDAO";
import { StatusDAO } from "../dao/status/StatusDAO";
import { UserDAO } from "../dao/user/UserDAO";

export interface Factory {
    getUserDAO: () => UserDAO;
    getAuthDAO: () => AuthDAO;
    getImageDAO: () => ImageDAO;
    getFollowsDAO: () => FollowsDAO;
    getStatusDAO: () => StatusDAO;
}