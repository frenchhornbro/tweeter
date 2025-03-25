import { AuthToken, User } from "tweeter-shared";
import { Presenter, View } from "../Presenter";
import { NavigateFunction } from "react-router-dom";

export interface AuthenticationView extends View {
    navigate: NavigateFunction;
    updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void;
    setIsLoading: (isLoading: boolean) => void;
}

export abstract class AuthenticationPresenter<V extends AuthenticationView> extends Presenter<V> {
    private _rememberMe: boolean = false;

    public get rememberMe() {
        return this._rememberMe;
    }

    public set rememberMe(value) {
        this._rememberMe = value;
    }

    protected constructor(view: V) {
        super(view);
    }

    protected async doAuthenticationOperation(authRequest: () => Promise<[User, AuthToken]>, doNavigation: () => void, authDescription: string) {
        await this.doFailureReportingOperation(async () => {
            this.view.setIsLoading(true);
            const [user, authToken] = await authRequest();
            this.view.updateUserInfo(user, user, authToken, this.rememberMe);

            doNavigation();
        }, authDescription, () => {
            this.view.setIsLoading(false);
        });
    }
}