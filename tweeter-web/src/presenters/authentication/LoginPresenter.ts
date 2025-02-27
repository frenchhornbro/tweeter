import { AuthenticationPresenter, AuthenticationView } from "./AuthenticationPresenter";

export class LoginPresenter extends AuthenticationPresenter<AuthenticationView> {
    private originalUrl?: string;
    
    public constructor(view: AuthenticationView, originalUrl?: string) {
        super(view);
        this.originalUrl = originalUrl;
    }

    public async doLogin(alias: string, password: string, originalUrl?: string) {
        await this.doAuthenticationOperation(() => this.userService.login(alias, password), () => {
            if (!!originalUrl) {
                this.view.navigate(originalUrl);
            } else {
                this.view.navigate("/");
            }
        }, 'log user in');
    }
}