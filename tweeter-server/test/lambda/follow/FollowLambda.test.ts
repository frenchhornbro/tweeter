import { handler as followeesHandler } from "../../../src/lambda/follow/userItem/GetFolloweesLambda"
import { handler as followerCountHandler } from "../../../src/lambda/follow/count/GetFollowerCountLambda";
import { handler as followeeCountHandler } from "../../../src/lambda/follow/count/GetFolloweeCountLambda";
import { handler as isFollowerHandler } from "../../../src/lambda/follow/GetIsFollowerStatusLambda";
import { handler as followHandler } from "../../../src/lambda/follow/FollowLambda";
import { handler as unfollowHandler } from "../../../src/lambda/follow/action/UnfollowLambda";

describe("GetFolloweesLambda", () => {
    it("handler function works", async() => {
        const followRequest = {
            "token": "mytoken",
            "userAlias": "myAlias",
            "pageSize": 12345,
            "lastItem": null
        };

        const result = await followeesHandler(followRequest);
        console.log(result);
    });
});

describe("GetFollowerCountLambda", () => {
    it("handler function works", async() => {
        const followCountRequest = {
            token: "mytoken",
            userAlias: "myAlias"
        };
        
        const result = await followerCountHandler(followCountRequest);
        console.log(result);
    });
});

describe("GetFolloweeCountLambda", () => {
    it("handler function works", async() => {
        const followCountRequest = {
            token: "mytoken",
            userAlias: "myAlias"
        };
        
        const result = await followeeCountHandler(followCountRequest);
        console.log(result);
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
        const result = await isFollowerHandler(isFollowerCountRequest);
        console.log(result);
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
        const result = await followHandler(followRequest);
        console.log(result);
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
        const result = await unfollowHandler(unfollowRequest);
        console.log(result);
    });
});