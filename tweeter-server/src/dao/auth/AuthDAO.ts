import { AuthToken } from "tweeter-shared";

export interface AuthDAO {
    addAuth: (alias: string, authToken: AuthToken) => Promise<void>;
}