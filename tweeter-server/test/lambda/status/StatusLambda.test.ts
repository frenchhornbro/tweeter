import { handler as feedHandler } from "../../../src/lambda/status/load/GetFeedItemsLambda";
import { handler as storyHandler } from "../../../src/lambda/status/load/GetStoryItemsLambda";
import { handler as postStatusHandler } from "../../../src/lambda/status/PostStatusLambda";

describe("GetFeedItemLambda", () => {
    it("handler function works", async() => {
        const request = {
            "token": "mytoken",
            "userAlias": "myAlias",
            "pageSize": 12345,
            "lastItem": null
        };
        const res = await feedHandler(request);
        expect(res.success).toBeTruthy();
        expect(res.message).toBeNull();
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
        expect(res.success).toBeTruthy();
        expect(res.message).toBeNull();
    });
});

describe("PostStatusLambda", () => {
    it("handler function works", async() => {
        const request = {
            "token": "mytoken",
            "newStatus": {
                "post": "myPost",
                "user": {
                    "firstname": "firstname",
                    "lastname": "lastname",
                    "alias": "alias",
                    "imageURL": "imageURL"
                },
                "timestamp": 12345
            }
        }
        const res = await postStatusHandler(request);
        expect(res.success).toBeTruthy();
        expect(res.message).toBeNull();
    })
});