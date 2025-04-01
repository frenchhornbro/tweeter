export class UserError extends Error {
    constructor(message: string) {
        super();
        this.message = `[Bad Request] ${message}`;
    }
}