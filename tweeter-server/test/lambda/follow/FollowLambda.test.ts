import { handler as followeesHandler } from "../../../src/lambda/follow/userItem/GetFolloweesLambda"
import { handler as followerCountHandler } from "../../../src/lambda/follow/count/GetFollowerCountLambda";
import { handler as followeeCountHandler } from "../../../src/lambda/follow/count/GetFolloweeCountLambda";
import { handler as isFollowerHandler } from "../../../src/lambda/follow/GetIsFollowerStatusLambda";
import { handler as followHandler } from "../../../src/lambda/follow/action/FollowLambda";
import { handler as unfollowHandler } from "../../../src/lambda/follow/action/UnfollowLambda";
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

        const res = await followeesHandler(followRequest);
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
        
        const res = await followerCountHandler(followCountRequest);
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
        
        const res = await followeeCountHandler(followCountRequest);
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
        const res = await isFollowerHandler(isFollowerRequest);
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