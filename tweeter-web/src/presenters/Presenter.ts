import { ServerFacade } from "../model/network/ServerFacade";

export interface View {
    displayErrorMessage: (message: string, bootstrapClasses?: string) => void;
}

export interface MessageView extends View {
    displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string) => void;
    clearLastInfoMessage: () => void;
}

export abstract class Presenter<V extends View> {
    private _view: V;
    private _serverFacade: ServerFacade;
    
    protected constructor(view: V) {
        this._view = view;
        this._serverFacade = new ServerFacade();
    }
    
    protected get view(): V {
        return this._view;
    }
    
    public get serverFacade(): ServerFacade {
        // This is public to allow for overwriting in testing
        return this._serverFacade;
    }

    protected async doFailureReportingOperation(operation: () => Promise<void>, operationDescription: string, finalOperation: () => void = () => {}): Promise<void> {
        try {
            await operation();
        }
        catch (error) {
            this._view.displayErrorMessage(`Failed to ${operationDescription} because of exception: ${(error as Error).message}`);
        }
        finally {
            finalOperation();
        }
    }
}