import { FakeData, UserItemCountRequest, User, Status, RegisterRequest, AuthToken, PagedItemRequest, UserDTO, StatusDTO } from "tweeter-shared";
import { ServerFacade } from "../../../src/model/network/ServerFacade";
import { Buffer } from "buffer";
import "isomorphic-fetch";

const serverFacade = new ServerFacade();

describe("GetFollowers", () => {
    let req: PagedItemRequest<UserDTO> = {
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
        console.log(items);
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
    const req: PagedItemRequest<StatusDTO> = {
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
    
    it("returns the correct starting point", async() => {
        const differentStartReq: PagedItemRequest<StatusDTO> = {
            token: "mytoken",
            userAlias: "myAlias",
            pageSize: 12345,
            lastItem: {
                "post": "Post 1 14\n        My friend @helen likes this website: http://byu.edu. Do you? \n        Or do you prefer this one: http://cs.byu.edu?",
                "user": {
                    "firstname": "Henry",
                    "lastname": "Henderson",
                    "alias": "@henry",
                    "imageURL": "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/donald_duck.png"
                },
                "timestamp": 1080000000000
            }
        }
        const [differentStartItems] = await serverFacade.loadMoreStoryItems(differentStartReq);
        const [expItems] = FakeData.instance.getPageOfStatuses(Status.fromDTO(differentStartReq.lastItem), req.pageSize);
        expect(differentStartItems).toStrictEqual(expItems);
    });
});

describe("Register", () => {
    const req: RegisterRequest = {
        firstName: "firstNameTest",
        lastName: "lastNameTest",
        alias: "aliasTest",
        password: "passwordTest",
        userImageBytes: Buffer.from([1, 2, 3, 4, 5]),
        imageFileExtension: "imgFileExtTest"
    };
    let user: User;
    let authToken: AuthToken;
    beforeAll(async() => {
        [user, authToken] = await serverFacade.register(req);
    });

    it("returns the correct FakeData user", () => {
        expect(user).toStrictEqual(FakeData.instance.firstUser);
    });

    it("returns a defined auth token", () => {
        expect(authToken).toBeDefined();
        expect(authToken).not.toBeNull();
    });
});