import { AuthToken, UserDTO } from "tweeter-shared";

export interface AuthDAO {
    addAuth: (alias: string, authToken: AuthToken) => Promise<void>;
    updateAuth: (token: string) => Promise<void>;
    removeAuth: (token: string) => Promise<void>;
    authExists: (token: string) => Promise<boolean>;
    getUser: (token: string) => Promise<UserDTO>;
}