import { handler as registerHandler } from "../../../src/lambda/user/action/RegisterLambda";
import { handler as loginHandler } from "../../../src/lambda/user/action/LoginLambda";
import { handler as logoutHandler } from "../../../src/lambda/user/action/LogoutLambda";
import { handler as getUserHandler } from "../../../src/lambda/user/GetUserLambda";

describe("RegisterLambda", () => {
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

describe("LoginLambda", () => {
    it("handler function works", async() => {
        const request = {
            "alias": "myalias",
            "password": "mypassword"
        };
        const res = await loginHandler(request);
        console.log(res);
    });
});

describe("LogoutLambda", () => {
    it("handler function works", async() => {
        const request = {
            "token": "myauthtoken"
        }
        const res = await logoutHandler(request);
        console.log(res);
    });
});

describe("GetUserLambda", () => {
    it("handler function works", async() => {
        const request = {
            "token": "mytoken",
            "alias": "@frank"
        }
        const res = await getUserHandler(request);
        console.log(res);
    });
});