import { AuthToken, FakeData, UserDTO } from "tweeter-shared";
import { Buffer } from "buffer";
import { UserDAO } from "../../dao/user/UserDAO";
import { Factory } from "../../factory/Factory";
import { AuthDAO } from "../../dao/auth/AuthDAO";
import { ImageDAO } from "../../dao/image/ImageDAO";
import bcrypt from "bcryptjs";

export class UserService {
    private userDAO: UserDAO;
    private authDAO: AuthDAO;
    private imageDAO: ImageDAO;

    constructor(factory: Factory) {
        this.imageDAO = factory.getImageDAO();
        this.userDAO = factory.getUserDAO();
        this.authDAO = factory.getAuthDAO();
    }

    public async register (
        firstname: string,
        lastname: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array,
        imageFileExtension: string
    ): Promise<[UserDTO, string, number]> {
        // TODO: Figure out what to do with the image file exension (should that be used for ContentType?)
        const imageStringBase64: string = Buffer.from(userImageBytes).toString("base64");
        const imageURL = await this.imageDAO.putImage(alias, imageStringBase64); //Using the alias as the filename
        const passwordHash = await this.generateHash(password);
        await this.userDAO.addUser(firstname, lastname, alias, passwordHash, imageURL);
        const authToken = AuthToken.Generate();
        this.authDAO.addAuth(alias, authToken);
        return [{firstname, lastname, alias, imageURL}, authToken.token, authToken.timestamp];
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

    private async generateHash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }
}