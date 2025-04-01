export class ServerError extends Error {
    constructor(message: string) {
        super();
        this.message = `[ServerError] ${message}`;
    }
}