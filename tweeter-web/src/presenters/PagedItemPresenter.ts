import { AuthToken } from "tweeter-shared";
import { Presenter, View } from "./Presenter";

export const PAGE_SIZE = 10;

export interface PagedItemView<T> extends View {
    addItems: (newItems: T[]) => void;
}

export abstract class PagedItemPresenter<T> extends Presenter<PagedItemView<T>> {
    private _hasMoreItems: boolean = true;
    private _lastItem: T | null = null;
    
    public constructor(view: PagedItemView<T>) {
        super(view);
    }

    public get hasMoreItems(): boolean {
        return this._hasMoreItems;
    }

    protected set hasMoreItems(value: boolean) {
        this._hasMoreItems = value;
    }
    
    protected get lastItem(): T | null {
        return this._lastItem;
    }
    
    protected set lastItem(value: T | null) {
        this._lastItem = value;
    }
    
    protected abstract getItemDescription(): string;

    protected abstract getMoreItems(authToken: AuthToken, userAlias: string): Promise<[T[], boolean]>;
    
    public async loadMoreItems(authToken: AuthToken, userAlias: string) {
        await this.doFailureReportingOperation(async () => {
            if (this.hasMoreItems) {
                const [newItems, hasMore] = await this.getMoreItems(
                    authToken,
                    userAlias
                );
                
                this.hasMoreItems = hasMore;
                this.lastItem = newItems[newItems.length - 1];
                this.view.addItems(newItems);
            }
        }, this.getItemDescription());
    }

    public reset() {
        this.lastItem = null;
        this.hasMoreItems = true;
    }
}