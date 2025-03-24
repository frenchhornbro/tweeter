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
}