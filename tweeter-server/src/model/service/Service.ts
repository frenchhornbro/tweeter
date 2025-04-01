export abstract class Service {
    protected async checkForError(action: () => Promise<any>) {
        try {
            return await action();
        }
        catch(err) {
            const error = err as Error;
            if (error.message.startsWith("[Bad Request]")) throw error;
            else throw new Error(`[Server Error]: ${error.message}`)
        }
    }
}