import { AuthDAO } from "../dao/auth/AuthDAO";
import { ImageDAO } from "../dao/image/ImageDAO";
import { UserDAO } from "../dao/user/UserDAO";

export interface Factory {
    getUserDAO: () => UserDAO;
    getAuthDAO: () => AuthDAO;
    getImageDAO: () => ImageDAO;
}