import { AuthToken, UserDTO } from "tweeter-shared";

export interface AuthDAO {
    addAuth: (alias: string, authToken: AuthToken) => Promise<void>;
    getAuth: (token: string) => Promise<[string, number]>;
    updateAuth: (token: string) => Promise<void>;
    removeAuth: (token: string) => Promise<void>;
    getUser: (token: string) => Promise<UserDTO>;
}