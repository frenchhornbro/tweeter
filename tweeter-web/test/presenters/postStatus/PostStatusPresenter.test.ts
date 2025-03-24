import { anything, capture, instance, mock, spy, verify, when } from "@typestrong/ts-mockito";
import { PostStatusPresenter, PostStatusView } from "../../../src/presenters/postStatus/PostStatusPresenter";
import { AuthToken, User } from "tweeter-shared";
import { ServerFacade } from "../../../src/model/network/ServerFacade";
import React from "react";
import "isomorphic-fetch";

describe('PostStatusPresenter', () => {
    let mockPostStatusView: PostStatusView;
    let postStatusPresenter: PostStatusPresenter;
    let mockServerFacade: ServerFacade;
    const event = {preventDefault: () => {}} as React.MouseEvent;
    const post: string = "This is my test post";
    const currentUser: User = new User('first', 'last', 'alias', 'imageURL');
    const authToken: AuthToken = new AuthToken('myAuthToken', Date.now());

    beforeEach(() => {
        mockPostStatusView = mock<PostStatusView>();
        const mockPostStatusViewInstance = instance(mockPostStatusView);
        const postStatusPresenterSpy = spy(new PostStatusPresenter(mockPostStatusViewInstance));
        postStatusPresenter = instance(postStatusPresenterSpy);

        mockServerFacade = mock<ServerFacade>();
        const mockServerFacadeInstance = instance(mockServerFacade);
        
        when(postStatusPresenterSpy.serverFacade).thenReturn(mockServerFacadeInstance);
    });

    it('tells the view to display a posting status message', async () => {
        await postStatusPresenter.submitPost(event, post, currentUser, authToken);
        verify(mockPostStatusView.displayInfoMessage("Posting status...", 0)).once();
    });

    it('call postStatus on the post status service with the correct string and auth token', async () => {
        await postStatusPresenter.submitPost(event, post, currentUser, authToken);
        const [params] = capture(mockServerFacade.postStatus).last();
        expect(params.token).toBe(authToken.token);
        expect(params.newStatus.post).toBe(post);
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
        when(mockServerFacade.postStatus(anything())).thenReject(error);
        await postStatusPresenter.submitPost(event, post, currentUser, authToken);
        verify(mockPostStatusView.displayErrorMessage("Failed to post the status because of exception: test error")).once();
        verify(mockPostStatusView.clearLastInfoMessage()).once();
        verify(mockPostStatusView.setPost("")).never();
        verify(mockPostStatusView.displayInfoMessage("Status posted!", 2000)).never();
    });
});