import { NavigateFunction } from "react-router-dom";
import { User, AuthToken } from "tweeter-shared";

export interface AuthenticationView {
    displayErrorMessage: (message: string) => void;
    navigate: NavigateFunction;
    updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void;
}

export abstract class AuthenticationPresenter {
    private _view: AuthenticationView;
    private _rememberMe: boolean = false;
    private _isLoading: boolean = false;
    private _alias: string;
    private _password: string;
    
    public get view(): AuthenticationView {
        return this._view;
    }

    public get rememberMe() {
        return this._rememberMe;
    }

    public set rememberMe(value) {
        this._rememberMe = value;
    }

    public get isLoading() {
        return this._isLoading;
    }

    public set isLoading(value) {
        this._isLoading = value;
    }

    public get alias(): string {
        return this._alias;
    }

    public set alias(value: string) {
        this._alias = value;
    }

    public get password(): string {
        return this._password;
    }

    public set password(value: string) {
        this._password = value;
    }

    protected constructor(view: AuthenticationView) {
        this._view = view;
        this._alias = "";
        this._password = "";
    }
}