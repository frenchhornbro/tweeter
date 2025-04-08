import { UserDTO } from "tweeter-shared";
import { getFeedItemsHandler } from "../../../src/lambda/status/load/GetFeedItemsLambda";
import { getStoryItemsHandler } from "../../../src/lambda/status/load/GetStoryItemsLambda";
import { postStatusHandler } from "../../../src/lambda/status/PostStatusLambda";``
import { getNewUser } from "../getNewUser";

let alias: string;
let user: UserDTO;
let token: string;
beforeAll(async() => {
    [alias, user, token] = await getNewUser();
});

describe("GetFeedItemLambda", () => {
    it("handler function works", async() => {
        const request = {
            "token": token,
            "userAlias": alias,
            "pageSize": 3,
            "lastItem": null
        };
        const res = await getFeedItemsHandler(request);
        expect(res.success).toBeTruthy();
        expect(res.message).toBeNull();
    });
});

describe("GetStoryItemLambda", () => {
    it("handler function works", async() => {
        const request = {
            "token": token,
            "userAlias": alias,
            "pageSize": 3,
            "lastItem": null
        };
        const res = await getStoryItemsHandler(request);
        expect(res.success).toBeTruthy();
        expect(res.message).toBeNull();
    });
});

describe("PostStatusLambda", () => {
    it("handler function works", async() => {
        const request = {
            "token": token,
            "newStatus": {
                "post": "myPost",
                "user": user,
                "timestamp": 12345
            }
        }
        const res = await postStatusHandler(request);
        expect(res.success).toBeTruthy();
        expect(res.message).toBeNull();
    })
});