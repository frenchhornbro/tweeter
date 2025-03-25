import { AuthenticatedRequest, AuthenticationRequest, AuthToken, GetUserRequest, RegisterRequest, User } from "tweeter-shared";
import { Service } from "./Service";

export class UserService extends Service {
    public async register(req: RegisterRequest): Promise<[User, AuthToken]> {
        return await this.serverFacade.register(req);
    }
    
    public async login(req: AuthenticationRequest): Promise<[User, AuthToken]> {
        return await this.serverFacade.login(req);
    }

    public async logout(req: AuthenticatedRequest): Promise<void> {
        return await this.serverFacade.logout(req);
    }

    public async getUser(req: GetUserRequest): Promise<User | null> {
        return await this.serverFacade.getUser(req);
    }
}