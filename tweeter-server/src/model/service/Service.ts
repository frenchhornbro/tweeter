import { AuthDAO } from "../../dao/auth/AuthDAO";
import { Factory } from "../../factory/Factory";
import { ServerError } from "../error/ServerError";
import { UserError } from "../error/UserError";

export abstract class Service {
    private _authDAO: AuthDAO;
    
    protected constructor(factory: Factory) {
        this._authDAO = factory.getAuthDAO();
    }

    protected get authDAO(): AuthDAO {
        return this._authDAO;
    }

    protected async checkForError(action: () => Promise<any>) {
        try {
            return await action();
        }
        catch(error) {
            if (error instanceof UserError) throw error;
            throw new ServerError((error as Error).message)
        }
    }

    protected async checkToken(token: string) {
        if (!await this.authDAO.authExists(token)) throw new UserError("Invalid token");
    }
}