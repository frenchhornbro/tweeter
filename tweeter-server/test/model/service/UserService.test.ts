import { DynamoDBFactory } from "../../../src/factory/DynamoDBFactory";
import { UserService } from "../../../src/model/service/UserService";

const userService = new UserService(new DynamoDBFactory());

describe("register", () => {
    it("works", async() => {
        const [userDTO, token, timestamp] = await register();
    });
});

async function register() {
    const now = new Date().toString();
    return await userService.register(`firstNameTest${now}`, `lastNameTest${now}`, `aliasTest${now}`, `passwordTest${now}`, new Uint8Array([5,4,3,2,1]), "jpeg");
}