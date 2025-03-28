import { FakeData, UserDTO } from "tweeter-shared";
import { Buffer } from "buffer";

export class UserService {    
    public async register (
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array,
        imageFileExtension: string
    ): Promise<[UserDTO, string, number]> {
        // Not needed now, but will be needed when you make the request to the server in milestone 3
        const imageStringBase64: string = Buffer.from(userImageBytes).toString("base64");

        // TODO: Replace with the result of calling the server
        const user = FakeData.instance.firstUser;
        if (user === null) throw new Error("Invalid registration");
        return [user.getDTO(), FakeData.instance.authToken.token, FakeData.instance.authToken.timestamp];
    }

    public async login(alias: string, password: string): Promise<[UserDTO, string, number]> {
        // TODO: Replace with the result of calling the server
        const user = FakeData.instance.firstUser;
        if (user === null) throw new Error("Invalid alias or password");
        return [user.getDTO(), FakeData.instance.authToken.token, FakeData.instance.authToken.timestamp];
    }

    public async logout(token: string): Promise<void> {
        // TODO: Implement logout
        return;
    };
    
    public async getUser(token: string, alias: string): Promise<UserDTO | null> {
        // TODO: Replace with the result of calling server
        const user = FakeData.instance.findUserByAlias(alias);
        return user === null ? null : user.getDTO();
    };
}