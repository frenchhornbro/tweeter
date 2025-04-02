export class ServerError extends Error {
    constructor(message: string) {
        super();
        this.message = `[Server Error] ${message}`;
    }
}