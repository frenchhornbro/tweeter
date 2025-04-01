import { handler as followeesHandler } from "../../../src/lambda/follow/userItem/GetFolloweesLambda"
import { handler as followerCountHandler } from "../../../src/lambda/follow/count/GetFollowerCountLambda";
import { handler as followeeCountHandler } from "../../../src/lambda/follow/count/GetFolloweeCountLambda";
import { handler as isFollowerHandler } from "../../../src/lambda/follow/GetIsFollowerStatusLambda";
import { handler as followHandler } from "../../../src/lambda/follow/action/FollowLambda";
import { handler as unfollowHandler } from "../../../src/lambda/follow/action/UnfollowLambda";

describe("GetFolloweesLambda", () => {
    it("handler function works", async() => {
        const followRequest = {
            "token": "8b836627-a50f-4a1e-a4a5-e8117cf3f68c",
            "userAlias": "@bob",
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
            token: "mytoken",
            userAlias: "myAlias"
        };
        
        const res = await followerCountHandler(followCountRequest);
        expect(res.success).toBeTruthy();
        expect(res.message).toBeNull();
    });
});

describe("GetFolloweeCountLambda", () => {
    it("handler function works", async() => {
        const followCountRequest = {
            token: "mytoken",
            userAlias: "myAlias"
        };
        
        const res = await followeeCountHandler(followCountRequest);
        expect(res.success).toBeTruthy();
        expect(res.message).toBeNull();
    });
});

describe("GetIsFollowerStatusLambda", () => {
    it("handler function works", async() => {
        const isFollowerCountRequest = {
            token: "mytoken",
            user: {
                firstname: "firstname1",
                lastname: "lastname1",
                alias: "alias1",
                imageURL: "imageURL1"
            },
            selectedUser: {
                firstname: "firstname2",
                lastname: "lastname2",
                alias: "alias2",
                imageURL: "imageURL2"
            }
        }
        const res = await isFollowerHandler(isFollowerCountRequest);
        expect(res.success).toBeTruthy();
        expect(res.message).toBeNull();
    });
});

describe("FollowLambda", () => {
    it("handler function works", async() => {
        const followRequest = {
            token: "mytoken",
            userToFollow: {
                firstname: "firstname",
                lastname: "lastname",
                alias: "alias",
                imageURL: "imageURL"
            },
        };
        const res = await followHandler(followRequest);
        expect(res.success).toBeTruthy();
        expect(res.message).toBeNull();
    });
});

describe("UnfollowLambda", () => {
    it("handler function works", async() => {
        const unfollowRequest = {
            token: "mytoken",
            userToFollow: {
                firstname: "firstname",
                lastname: "lastname",
                alias: "alias",
                imageURL: "imageURL"
            },
        };
        const res = await unfollowHandler(unfollowRequest);
        expect(res.success).toBeTruthy();
        expect(res.message).toBeNull();
    });
});