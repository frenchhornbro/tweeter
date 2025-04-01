import { handler as registerHandler } from "../../../src/lambda/user/action/RegisterLambda";
import { handler as loginHandler } from "../../../src/lambda/user/action/LoginLambda";
import { handler as logoutHandler } from "../../../src/lambda/user/action/LogoutLambda";
import { handler as getUserHandler } from "../../../src/lambda/user/GetUserLambda";

describe("RegisterLambda", () => {
    it("handler function works", async() => {
        const request = {
            firstName: "firstName",
            lastName: "lastName",
            alias: `alias ${new Date().toString()}`,
            password: "password",
            userImageBytes: new Uint8Array(),
            imageFileExtension: "imageFileExt",
        };
        const res = await registerHandler(request);
        expect(res.success).toBeTruthy();
        expect(res.message).toBeNull();
    });
});

describe("LoginLambda", () => {
    it("handler function works", async() => {
        const request = {
            "alias": "alias",
            "password": "password"
        };
        const res = await loginHandler(request);
        expect(res.success).toBeTruthy();
        expect(res.message).toBeNull();
    });
});

describe("LogoutLambda", () => {
    it("handler function works", async() => {
        const request = {
            "token": "myauthtoken"
        }
        const res = await logoutHandler(request);
        expect(res.success).toBeTruthy();
        expect(res.message).toBeNull();
    });
});

describe("GetUserLambda", () => {
    it("handler function works", async() => {
        const request = {
            "token": "8b836627-a50f-4a1e-a4a5-e8117cf3f68c",
            "alias": "@frank"
        }
        const res = await getUserHandler(request);
        expect(res.success).toBeTruthy();
        expect(res.message).toBeNull();
    });
});