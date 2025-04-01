import { ServerError } from "../error/ServerError";
import { UserError } from "../error/UserError";

export abstract class Service {
    protected async checkForError(action: () => Promise<any>) {
        try {
            return await action();
        }
        catch(error) {
            if (error instanceof UserError) throw error;
            throw new ServerError((error as Error).message)
        }
    }
}