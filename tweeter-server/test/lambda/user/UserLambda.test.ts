import { handler as registerHandler } from "../../../src/lambda/user/action/RegisterLambda";

describe("", () => {
    it("handler function works", async() => {
        const request = {
            firstName: "firstName",
            lastName: "lastName",
            alias: "alias",
            password: "password",
            userImageBytes: new Uint8Array(),
            imageFileExtension: "imageFileExt",
        };
        const res = await registerHandler(request);
        console.log(res);
    });
});