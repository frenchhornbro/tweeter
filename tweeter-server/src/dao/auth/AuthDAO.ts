import { AuthToken } from "tweeter-shared";

export interface AuthDAO {
    addAuth: (alias: string, authToken: AuthToken) => Promise<void>;
    removeAuth: (token: string) => Promise<void>;
    authExists: (token: string) => Promise<boolean>;
}