import { AuthToken, FakeData, UserDTO } from "tweeter-shared";
import { Buffer } from "buffer";
import { UserDAO } from "../../dao/user/UserDAO";
import { Factory } from "../../factory/Factory";
import { AuthDAO } from "../../dao/auth/AuthDAO";
import { ImageDAO } from "../../dao/image/ImageDAO";
import bcrypt from "bcryptjs";
import { Service } from "./Service";
import { UserError } from "../error/UserError";

export class UserService extends Service {
    private userDAO: UserDAO;
    private authDAO: AuthDAO;
    private imageDAO: ImageDAO;

    constructor(factory: Factory) {
        super();
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
        return this.checkForError(async() => {
            if (await this.userDAO.userExists(alias)) throw new UserError("Alias is already taken");
            const imageStringBase64: string = Buffer.from(userImageBytes).toString("base64");
            const imageURL = await this.imageDAO.putImage(alias, imageStringBase64); //Using the alias as the filename
            const passwordHash = await this.generateHash(password);
            await this.userDAO.addUser(firstname, lastname, alias, passwordHash, imageURL);
            const authToken = await this.addAuth(alias);
            return [{firstname, lastname, alias, imageURL}, authToken.token, authToken.timestamp];
        });
    }

    public async login(alias: string, password: string): Promise<[UserDTO, string, number]> {
        return this.checkForError(async() => {
            if (!await this.userDAO.userExists(alias)) throw new UserError("User does not exist");
            const storedPasswordHash = await this.userDAO.getPasswordHash(alias);
            if (!await bcrypt.compare(password, storedPasswordHash)) throw new UserError("Password is incorrect");
            const userDTO = await this.userDAO.getUserDTO(alias);
            const authToken = await this.addAuth(alias);
            return [userDTO, authToken.token, authToken.timestamp];
        });
    }

    public async logout(token: string): Promise<void> {
        this.checkForError(async () => {
            await this.authDAO.removeAuth(token);
        });
    };
    
    public async getUser(token: string, alias: string): Promise<UserDTO | null> {
        // TODO: Replace with the result of calling server
        const user = FakeData.instance.findUserByAlias(alias);
        return user === null ? null : user.getDTO();
    };

    private async addAuth(alias: string): Promise<AuthToken> {
        const authToken = AuthToken.Generate();
        this.authDAO.addAuth(alias, authToken);
        return authToken;
    }

    private async generateHash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }
}