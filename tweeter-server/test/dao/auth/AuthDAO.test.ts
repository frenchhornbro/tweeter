import { AuthToken } from "tweeter-shared";
import { DynamoDBAuthDAO } from "../../../src/dao/auth/DynamoDBAuthDAO";

describe("DynanmoDBAuthDAO", () => {
    it("works", async() => {
        await uploadToTable();
    });
});

async function uploadToTable() {
    const authDAO = new DynamoDBAuthDAO();
    const now = new Date().toString();
    await authDAO.addAuth(`testAlias${now}`, new AuthToken(`testToken${now}`, new Date().getTime()));
}