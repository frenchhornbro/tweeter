import React from 'react';
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import PostStatus from "../../../src/components/postStatus/PostStatus";
import userEvent from '@testing-library/user-event';
import useUserInfo from "../../../src/components/userInfo/UserInfoHook";
import { AuthToken, User } from 'tweeter-shared';
import { capture, instance, mock } from '@typestrong/ts-mockito';
import { PostStatusPresenter } from '../../../src/presenters/postStatus/PostStatusPresenter';

jest.mock("../../../src/components/userInfo/UserInfoHook", () => ({
    ...jest.requireActual("../../../src/components/userInfo/UserInfoHook"),
    __esModule: true,
    default: jest.fn(),
}));

describe('PostStatus component', () => {
    const testUser = new User('firstname', 'lastname', 'alias', 'imageurl');
    const testAuthToken = new AuthToken('authTokenString', Date.now());

    beforeAll(() => {
        (useUserInfo as jest.Mock).mockReturnValue({
            currentUser: testUser,
            authToken: testAuthToken,
        });
    });

    it('starts with post status and clear buttons disabled', () => {
        const {postStatusButton, clearButton} = renderPostStatusAndGetElement();
        expect(postStatusButton).toBeDisabled();
        expect(clearButton).toBeDisabled();
    });

    it('enables both buttons when the text field has text', async () => {
        const {textField, postStatusButton, clearButton, user} = renderPostStatusAndGetElement();
        await user.type(textField, "testing");
        expect(postStatusButton).toBeEnabled();
        expect(clearButton).toBeEnabled();
    });

    it('disables both buttons when the text field is cleared', async () => {
        const {textField, postStatusButton, clearButton, user} = renderPostStatusAndGetElement();
        await user.type(textField, "testing");
        expect(postStatusButton).toBeEnabled();
        expect(clearButton).toBeEnabled();
        await user.clear(textField);
        expect(postStatusButton).toBeDisabled();
        expect(clearButton).toBeDisabled();
    });

    it('calls postStatus with correct parameters when the post status button is pressed', async () => {
        const mockPresenter = mock<PostStatusPresenter>();
        const mockPresenterInstance = instance(mockPresenter);

        const {textField, postStatusButton, user} = renderPostStatusAndGetElement(mockPresenterInstance);
        await user.type(textField, "testing");
        await user.click(postStatusButton);

        const [, post, currentUser, authToken] = capture(mockPresenter.submitPost).last();
        expect(post).toBe("testing");
        expect(currentUser).toBe(testUser);
        expect(authToken).toBe(testAuthToken);
    });
});

const renderPostStatus = (mockPresenterInstance?: PostStatusPresenter) => {
    return render(
        <MemoryRouter>
            <PostStatus presenter={mockPresenterInstance}/>
        </MemoryRouter>
    );
};

const renderPostStatusAndGetElement = (mockPresenterInstance?: PostStatusPresenter) => {
    const user = userEvent.setup();
    renderPostStatus(mockPresenterInstance);
    const textField = screen.getByLabelText("postStatusTextbox");
    const postStatusButton = screen.getByRole("button", {name: /Post Status/i});
    const clearButton = screen.getByRole("button", {name: /Clear/i});

    return {textField, postStatusButton, clearButton, user};
};