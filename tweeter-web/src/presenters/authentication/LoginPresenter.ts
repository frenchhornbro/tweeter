import { NavigateFunction } from "react-router-dom";
import { User, AuthToken } from "tweeter-shared";
import { AuthenticationPresenter } from "./AuthenticationPresenter";

export interface LoginView {
    displayErrorMessage: (message: string) => void;
    navigate: NavigateFunction;
    updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void;
    setIsLoading: (isLoading: boolean) => void;
}

export class LoginPresenter extends AuthenticationPresenter {
    private view: LoginView;
    private originalUrl?: string;
    
    public constructor(view: LoginView, originalUrl?: string) {
        super();
        this.view = view;
        this.originalUrl = originalUrl;
    }

    public async doLogin(alias: string, password: string) {
        try {
            this.view.setIsLoading(true);

            const [user, authToken] = await this.userService.login(alias, password);

            this.view.updateUserInfo(user, user, authToken, this.rememberMe);

            if (!!this.originalUrl) {
                this.view.navigate(this.originalUrl);
            } else {
                this.view.navigate("/");
        }
        } catch (error) {
            this.view.displayErrorMessage(`Failed to log user in because of exception: ${error}`);
        } finally {
            this.view.setIsLoading(false);
        }
    }
}