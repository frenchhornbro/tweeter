import { AuthToken } from "tweeter-shared";
import { MessageView, Presenter } from "../Presenter";
import { UserService } from "../../model/service/UserService";

export interface AppNavbarView extends MessageView {
    clearUserInfo: () => void;
}

export class AppNavbarPresenter extends Presenter<AppNavbarView> {
    public userService = new UserService();

    public constructor(view: AppNavbarView) {
        super(view);
    }

    public async logOut(authToken: AuthToken) {
        this.view.displayInfoMessage("Logging Out...", 0);

        await this.doFailureReportingOperation(async () => {
            await this.userService.logout({
                token: authToken.token
            });
            this.view.clearLastInfoMessage();
            this.view.clearUserInfo();
        }, 'log user out');
    }
}