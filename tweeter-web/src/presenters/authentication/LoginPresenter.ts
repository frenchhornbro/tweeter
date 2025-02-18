import { NavigateFunction } from "react-router-dom";
import { User, AuthToken } from "tweeter-shared";
import { AuthenticationPresenter } from "./AuthenticationPresenter";
import { View } from "../Presenter";

export interface LoginView extends View {
    navigate: NavigateFunction;
    updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void;
    setIsLoading: (isLoading: boolean) => void;
}

export class LoginPresenter extends AuthenticationPresenter<LoginView> {
    private originalUrl?: string;
    
    public constructor(view: LoginView, originalUrl?: string) {
        super(view);
        this.originalUrl = originalUrl;
    }

    public async doLogin(alias: string, password: string) {
        this.doFailureReportingOpertaion(async () => {
            this.view.setIsLoading(true);

            const [user, authToken] = await this.userService.login(alias, password);

            this.view.updateUserInfo(user, user, authToken, this.rememberMe);

            if (!!this.originalUrl) {
                this.view.navigate(this.originalUrl);
            } else {
                this.view.navigate("/");
        }
        }, 'log user in');
    }
}