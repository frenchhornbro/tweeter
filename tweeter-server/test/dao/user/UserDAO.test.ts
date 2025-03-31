import { DynamoDBUserDAO } from "../../../src/dao/user/DynamoDBUserDAO";

describe("DynanmoDBUserDAO", () => {
    it("works", async() => {
        await uploadToTable();
    });
});

async function uploadToTable() {
    const userDAO = new DynamoDBUserDAO();
    const now = new Date().toString();
    await userDAO.addUser(`testFirstName${now}`, `testLastName${now}`, `testAlias${now}`, `testPasswordHash${now}`, `testImageLink${now}`);
}