import { UserService } from "../../model/service/UserService";
import { AuthenticationPresenter, AuthenticationView } from "./AuthenticationPresenter";

export class RegisterPresenter extends AuthenticationPresenter {
    private userService: UserService;

    public constructor(view: AuthenticationView) {
        super(view);
        this.userService = new UserService();
    }

    public async doRegister(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        imageBytes: Uint8Array,
        imageFileExtension: string
    ) {
        try {
            this.isLoading = true;
        
            const [user, authToken] = await this.userService.register(
                firstName,
                lastName,
                alias,
                password,
                imageBytes,
                imageFileExtension
            );
        
            this.view.updateUserInfo(user, user, authToken, this.rememberMe);
            this.view.navigate("/");
        } catch (error) {
            this.view.displayErrorMessage(`Failed to register user because of exception: ${error}`);
        } finally {
            this.isLoading = false;
        }
    };
}