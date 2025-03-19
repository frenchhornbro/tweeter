import { handler as followeesHandler } from "../../../src/lambda/follow/GetFolloweesLambda"

const followRequest = {
    "token": "mytoken",
    "userAlias": "myAlias",
    "pageSize": 12345,
    "lastItem": null
};

describe("GetFolloweesLambda", () => {
    it("handler function works", async() => {
        const result = await followeesHandler(followRequest);
        console.log(result);
    });
});