import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";
import { MessageView, Presenter } from "../Presenter";

export interface PostStatusView extends MessageView {
    setIsLoading: (isLoading: boolean) => void;
    setPost: (post: string) => void;
}

export class PostStatusPresenter extends Presenter<PostStatusView> {
    private _statusService: StatusService;
    
    public constructor(view: PostStatusView) {
        super(view);
        this._statusService = new StatusService();
    }

    public get statusService(): StatusService {
        return this._statusService;
    }

    public async submitPost(event: React.MouseEvent, post: string, currentUser: User, authToken: AuthToken) {
        event.preventDefault();

        await this.doFailureReportingOperation(async () => {
            this.view.setIsLoading(true);
            this.view.displayInfoMessage("Posting status...", 0);

            const status = new Status(post, currentUser!, Date.now());
            console.log("about to call postStatus");
            await this.serverFacade.postStatus({
                token: authToken.token,
                newStatus: status.getDTO()
            });
            console.log("called postStatus without any errors");

            this.view.setPost("");
            this.view.displayInfoMessage("Status posted!", 2000);
        }, 'post the status', () => {
            this.view.clearLastInfoMessage();
            this.view.setIsLoading(false);
        });
    };
}