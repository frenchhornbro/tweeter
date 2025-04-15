import React from "react";
import { ServerFacade } from "../../../src/model/network/ServerFacade";
import { PostStatusPresenter, PostStatusView } from "../../../src/presenters/postStatus/PostStatusPresenter";
import { anything, instance, mock, verify } from "@typestrong/ts-mockito";
import { AuthToken, User } from "tweeter-shared";
import "isomorphic-fetch";

describe("Post status", () => {
    const now = Date.now();
    let user: User;
    let authToken: AuthToken;
    const postText = `Server Facade Post Status Integration Test ${now}`;
    const serverFacade = new ServerFacade();
    const mockPostStatusView = mock<PostStatusView>();
    const mockPostStatusViewInstance = instance(mockPostStatusView);
    const postStatusPresenter = new PostStatusPresenter(mockPostStatusViewInstance);

    beforeAll(async() => {
        // Login the user through ServerFacade
        const alias = "@server-facade-integration-test-user";
        const password = "password";
        const loginReq = {
            alias,
            password
        };
        [user, authToken] = await serverFacade.login(loginReq);

        // Post status through PostStatusPresenter
        const event = mock<React.MouseEvent>();
        await postStatusPresenter.submitPost(event, postText, user, authToken);
    }, 15000);

    it('returns "Status posted!"', async() => {
        verify(mockPostStatusView.displayInfoMessage("Status posted!", anything())).once();
    });

    it("correctly adds the status to the user's story", async() => {
        const storyReq = {
            userAlias: user.alias,
            pageSize: 1,
            lastItem: null,
            token: authToken.token,
        };
        const [posts] = await serverFacade.loadMoreStoryItems(storyReq);
        const post = posts[0];
        expect(post.user).toStrictEqual(user);
        expect(post.post).toBe(postText);
        expect(post.timestamp).toBeGreaterThanOrEqual(now);
    }, 15000);
});