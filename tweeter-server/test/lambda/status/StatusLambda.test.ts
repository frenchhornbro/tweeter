import { handler as feedHandler } from "../../../src/lambda/status/load/GetFeedItemsLambda";
import { handler as storyHandler } from "../../../src/lambda/status/load/GetStoryItemsLambda";

describe("GetFeedItemLambda", () => {
    it("handler function works", async() => {
        const request = {
            "token": "mytoken",
            "userAlias": "myAlias",
            "pageSize": 12345,
            "lastItem": null
        };
        const res = await feedHandler(request);
        console.log(res);
    });
});

describe("GetStoryItemLambda", () => {
    it("handler function works", async() => {
        const request = {
            "token": "mytoken",
            "userAlias": "myAlias",
            "pageSize": 12345,
            "lastItem": null
        };
        const res = await storyHandler(request);
        console.log(res);
    });
});