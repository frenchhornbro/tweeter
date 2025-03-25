import { User, AuthToken } from "tweeter-shared";
import { Presenter, View } from "../Presenter";

export interface UserNavigationView extends View {
    setDisplayedUser: (user: User) => void;
}

export class UserNavigationPresenter extends Presenter<UserNavigationView> {
    public constructor(view: UserNavigationView) {
        super(view);
    }

    public async useNavigateToUser(
        event: React.MouseEvent,
        currentUser: User | null,
        authToken: AuthToken | null
    ): Promise<void> {
        event.preventDefault();
        await this.doFailureReportingOperation(async () => {
            const alias = this.extractAlias(event.target.toString());
            const user = await this.serverFacade.getUser({
                token: authToken === null ? "" : authToken.token,
                alias: alias
            });
            if (!!user) {
                if (currentUser!.equals(user)) {
                    this.view.setDisplayedUser(currentUser!);
                } else {
                    this.view.setDisplayedUser(user);
                }
            }
        }, 'get user');
    }

    private extractAlias (value: string): string {
        const index = value.indexOf("@");
        return value.substring(index);
    }
}