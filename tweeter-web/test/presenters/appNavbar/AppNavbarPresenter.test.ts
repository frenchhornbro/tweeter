import { AuthToken } from "tweeter-shared";
import { AppNavbarPresenter, AppNavbarView } from "../../../src/presenters/appNavbar/AppNavbarPresenter";
import { anything, instance, mock, spy, verify, when } from "@typestrong/ts-mockito";
import { UserService } from "../../../src/model/service/UserService";

describe('AppNavbarPresenter', () => {
    let mockAppNavbarView: AppNavbarView;
    let appNavbarPresenter: AppNavbarPresenter;
    let mockUserService: UserService;
    const authToken = new AuthToken("abc123", Date.now());

    beforeEach(() => {
        mockAppNavbarView = mock<AppNavbarView>()
        const mockAppNavbarViewInstance = instance(mockAppNavbarView);
        const appNavbarPresenterSpy = spy(new AppNavbarPresenter(mockAppNavbarViewInstance));
        appNavbarPresenter = instance(appNavbarPresenterSpy);
        mockUserService = mock<UserService>();
        const mockUserServiceInstance = instance(mockUserService);

        when(appNavbarPresenterSpy.userService).thenReturn(mockUserServiceInstance);
    });

    it('tells the view to display a logging out message', async () => {
        await appNavbarPresenter.logOut(authToken);
        verify(mockAppNavbarView.displayInfoMessage("Logging Out...", 0)).once();
    });

    it('calls logout on the user service with the correct auth token', async () => {
        await appNavbarPresenter.logOut(authToken);
        verify(mockUserService.logout(anything())).once();
    })

    it('tells the view to clear the last info message and clear the user info when logout is successful', async () => {
        await appNavbarPresenter.logOut(authToken);
        verify(mockAppNavbarView.clearLastInfoMessage()).once();
        verify(mockAppNavbarView.clearUserInfo()).once();
    });

    it('displays an error message and does not clear the last info message or clear user info when logout fails', async () => {
        const error = new Error('An error occurred');
        when(mockUserService.logout(anything())).thenThrow(error);
        await appNavbarPresenter.logOut(authToken);

        verify(mockAppNavbarView.displayErrorMessage('Failed to log user out because of exception: An error occurred')).once();
        verify(mockAppNavbarView.clearLastInfoMessage()).never();
        verify(mockAppNavbarView.clearUserInfo()).never();
    });
});