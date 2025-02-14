import { UserService } from "../../model/service/UserService";

export abstract class AuthenticationPresenter {
    private _userService: UserService;
    private _rememberMe: boolean = false;
    
    public get userService(): UserService {
        return this._userService;
    }

    public get rememberMe() {
        return this._rememberMe;
    }

    public set rememberMe(value) {
        this._rememberMe = value;
    }

    protected constructor() {
        this._userService = new UserService();
    }
}