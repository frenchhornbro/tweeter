import { getFolloweesHandler } from "../../../src/lambda/follow/userItem/GetFolloweesLambda"
import { getFollowerCountHandler } from "../../../src/lambda/follow/count/GetFollowerCountLambda";
import { getFolloweeCountHandler } from "../../../src/lambda/follow/count/GetFolloweeCountLambda";
import { getIsFollowerStatusHandler } from "../../../src/lambda/follow/GetIsFollowerStatusLambda";
import { followHandler } from "../../../src/lambda/follow/action/FollowLambda";
import { unfollowHandler } from "../../../src/lambda/follow/action/UnfollowLambda";
import { UserDTO } from "tweeter-shared";
import { getNewUser } from "../getNewUser";

let alias: string;
let user: UserDTO;
let token: string;
beforeAll(async() => {
    [alias, user, token] = await getNewUser();
});

describe("GetFolloweesLambda", () => {
    it("handler function works", async() => {
        const followRequest = {
            "token": token,
            "userAlias": alias,
            "pageSize": 3,
            "lastItem": null
        };

        const res = await getFolloweesHandler(followRequest);
        expect(res.success).toBeTruthy();
        expect(res.message).toBeNull();
    });
});

describe("GetFollowerCountLambda", () => {
    it("handler function works", async() => {
        const followCountRequest = {
            token: token,
            userAlias: alias
        };
        
        const res = await getFollowerCountHandler(followCountRequest);
        expect(res.success).toBeTruthy();
        expect(res.message).toBeNull();
        expect(res.count).toBe(0);
    });
});

describe("GetFolloweeCountLambda", () => {
    it("handler function works", async() => {
        const followCountRequest = {
            token: token,
            userAlias: alias
        };
        
        const res = await getFolloweeCountHandler(followCountRequest);
        expect(res.success).toBeTruthy();
        expect(res.message).toBeNull();
    });
});

describe("GetIsFollowerStatusLambda", () => {
    it("handler function works", async() => {
        const isFollowerRequest = {
            token: token,
            userAlias: alias,
            selectedUserAlias: "@bob"
        };
        const res = await getIsFollowerStatusHandler(isFollowerRequest);
        expect(res.success).toBeTruthy();
        expect(res.message).toBeNull();
    });
});

describe("FollowLambda", () => {
    it("handler function works", async() => {
        const followRequest = {
            token: token,
            userToFollowAlias: "@bob",
        };
        const res = await followHandler(followRequest);
        expect(res.success).toBeTruthy();
        expect(res.message).toBeNull();
    });
});

describe("UnfollowLambda", () => {
    it("handler function works", async() => {
        const unfollowRequest = {
            token: token,
            userToFollowAlias: "@bob",
        };
        const res = await unfollowHandler(unfollowRequest);
        expect(res.success).toBeTruthy();
        expect(res.message).toBeNull();
    });
});