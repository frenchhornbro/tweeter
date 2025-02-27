import { anything, capture, instance, mock, spy, verify, when } from "@typestrong/ts-mockito";
import { PostStatusPresenter, PostStatusView } from "../../../src/presenters/postStatus/PostStatusPresenter";
import { StatusService } from "../../../src/model/service/StatusService";
import { AuthToken, User } from "tweeter-shared";
import React from "react";

describe('PostStatusPresenter', () => {
    let mockPostStatusView: PostStatusView;
    let postStatusPresenter: PostStatusPresenter;
    let mockStatusService: StatusService;
    const event = {preventDefault: () => {}} as React.MouseEvent;
    const post: string = "This is my test post";
    const currentUser: User = new User('first', 'last', 'alias', 'imageURL');
    const authToken: AuthToken = new AuthToken('myAuthToken', Date.now());

    beforeEach(() => {
        mockPostStatusView = mock<PostStatusView>();
        const mockPostStatusViewInstance = instance(mockPostStatusView);
        const postStatusPresenterSpy = spy(new PostStatusPresenter(mockPostStatusViewInstance));
        postStatusPresenter = instance(postStatusPresenterSpy);
        mockStatusService = mock<StatusService>();
        const mockStatusServiceInstance = instance(mockStatusService);

        when(postStatusPresenterSpy.statusService).thenReturn(mockStatusServiceInstance);
    });

    it('tells the view to display a posting status message', async () => {
        await postStatusPresenter.submitPost(event, post, currentUser, authToken);
        verify(mockPostStatusView.displayInfoMessage("Posting status...", 0)).once();
    });

    it('call postStatus on the post status service with the correct string and auth token', async () => {
        await postStatusPresenter.submitPost(event, post, currentUser, authToken);
        const [capturedAuthToken, capturedStatus] = capture(mockStatusService.postStatus).last();
        expect(capturedAuthToken).toBe(authToken);
        expect(capturedStatus.post).toBe(post);
    });

    it('tells the view to clear the last info message, clear the post, and display a status posted message ' +
        'when postStatus is successful', async () => {
        await postStatusPresenter.submitPost(event, post, currentUser, authToken);
        verify(mockPostStatusView.clearLastInfoMessage()).once();
        verify(mockPostStatusView.setPost("")).once();
        verify(mockPostStatusView.displayInfoMessage("Status posted!", 2000)).once();
    });

    it('tells the view to display an error message and clear the last info message and does not tell it to '+
        'clear the post or display a status posted message when postStatus fails', async () => {
        const error = new Error('test error');
        when(mockStatusService.postStatus(anything(), anything())).thenThrow(error);
        await postStatusPresenter.submitPost(event, post, currentUser, authToken);
        verify(mockPostStatusView.displayErrorMessage("Failed to post the status because of exception: test error")).once();
        verify(mockPostStatusView.clearLastInfoMessage()).once();
        verify(mockPostStatusView.setPost("")).never();
        verify(mockPostStatusView.displayInfoMessage("Status posted!", 2000)).never();
    });
});