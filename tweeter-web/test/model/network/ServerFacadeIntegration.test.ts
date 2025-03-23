import { FakeData, UserItemCountRequest, PagedUserItemRequest, User, StatusItemRequest, Status } from "tweeter-shared";
import { ServerFacade } from "../../../src/model/network/ServerFacade";
import "isomorphic-fetch"

const serverFacade = new ServerFacade();

describe("GetFollowers", () => {
    let req: PagedUserItemRequest = {
        token: "mytoken",
        userAlias: "myAlias",
        pageSize: 12345,
        lastItem: null
    };
    let items: User[];
    let hasMore: boolean;
    beforeAll(async() => {
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

describe("GetFollowerCount", () => {
    let req: UserItemCountRequest = {
        token: "mytoken",
        userAlias: "myAlias"
    };
    let count: number;
    beforeAll(async() => {
        count = await serverFacade.getFollowerCount(req);
    });

    it("gets the correct count over the network", () => {
        expect(count).toBeLessThanOrEqual(10);
        expect(count).toBeGreaterThanOrEqual(1);
    });
});

describe("LoadMoreStoryItems", () => {
    const req: StatusItemRequest = {
        token: "mytoken",
        userAlias: "myAlias",
        pageSize: 12345,
        lastItem: null
    };
    let items: Status[];
    let hasMore: boolean;
    beforeAll(async() => {
        [items, hasMore] = await serverFacade.loadMoreStoryItems(req);
    });

    it("returns Statuses as items", () => {
        expect(items.length).toBeGreaterThanOrEqual(1);
    });

    it("gets the correct FakeData over the network", () => {
        const [expItems, expHasMore] = FakeData.instance.getPageOfStatuses(Status.fromDTO(req.lastItem), req.pageSize);
        expect(items).toStrictEqual(expItems);
        expect(hasMore).toBe(expHasMore);
    });
});