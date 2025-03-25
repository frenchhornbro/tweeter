import { ServerFacade } from "../network/ServerFacade";


export class Service {
    private _serverFacade: ServerFacade = new ServerFacade();

    public get serverFacade(): ServerFacade {
        return this._serverFacade;
    }
}