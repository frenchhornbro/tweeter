import { FakeData, PagedUserItemRequest, User } from "tweeter-shared";
import { ServerFacade } from "../../../src/model/network/ServerFacade";
import "isomorphic-fetch"

const serverFacade = new ServerFacade();
let req: PagedUserItemRequest;
let items: User[];
let hasMore: boolean;

describe("GetFollowers", () => {
    beforeAll(async() => {
        req = {
            "token": "mytoken",
            "userAlias": "myAlias",
            "pageSize": 12345,
            "lastItem": null
        };
        [items, hasMore] = await serverFacade.getMoreFollowers(req);
    });

    it("returns Users as items", () => {
        expect(items.length).toBeGreaterThanOrEqual(1);
    });

    it("gets the correct FakeData over the network", () => {
        const [expItems, expHasMore] = FakeData.instance.getPageOfUsers(User.fromDTO(req.lastItem), req.pageSize, req.userAlias);
        expect(items).toStrictEqual(expItems);
        expect(hasMore).toBe(expHasMore);
    });
});