import { handler as followeesHandler } from "../../../src/lambda/follow/userItem/GetFolloweesLambda"
import { handler as followerCountHandler } from "../../../src/lambda/follow/count/GetFollowerCountLambda";
import { handler as followeeCountHandler } from "../../../src/lambda/follow/count/GetFolloweeCountLambda";

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