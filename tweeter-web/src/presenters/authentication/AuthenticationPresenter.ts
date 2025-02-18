import { UserService } from "../../model/service/UserService";
import { Presenter, View } from "../Presenter";

export abstract class AuthenticationPresenter<V extends View> extends Presenter<V> {
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

    protected constructor(view: V) {
        super(view);
        this._userService = new UserService();
    }
}