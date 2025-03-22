import { handler } from "../../../src/lambda/status/load/GetFeedItemLambda";

describe("GetFeedItemLambda", () => {
    it("handler function works", async() => {
        const request = {
            "token": "mytoken",
            "userAlias": "myAlias",
            "pageSize": 12345,
            "lastItem": null
        };
        const res = await handler(request);
        console.log(res);
    });
});