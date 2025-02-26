export interface View {
    displayErrorMessage: (message: string, bootstrapClasses?: string) => void;
}

export interface MessageView extends View {
    displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string) => void;
    clearLastInfoMessage: () => void;
}

export abstract class Presenter<V extends View> {
    private _view: V;
    
    protected constructor(view: V) {
        this._view = view;
    }

    protected get view(): V {
        return this._view;
    }

    protected async doFailureReportingOpertaion(operation: () => Promise<void>, operationDescription: string, finalOperation: () => void = () => {}): Promise<void> {
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