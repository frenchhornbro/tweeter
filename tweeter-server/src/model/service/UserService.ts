import { AuthToken, UserDTO } from "tweeter-shared";
import { Buffer } from "buffer";
import { UserDAO } from "../../dao/user/UserDAO";
import { Factory } from "../../factory/Factory";
import { ImageDAO } from "../../dao/image/ImageDAO";
import bcrypt from "bcryptjs";
import { Service } from "./Service";
import { UserError } from "../error/UserError";

export class UserService extends Service {
    private userDAO: UserDAO;
    private imageDAO: ImageDAO;

    constructor(factory: Factory) {
        super(factory);
        this.imageDAO = factory.getImageDAO();
        this.userDAO = factory.getUserDAO();
    }

    public async register (
        firstname: string,
        lastname: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array,
        imageFileExtension: string
    ): Promise<[UserDTO, string, number]> {
        return await this.checkForError(async() => {
            if (await this.userDAO.userExists(alias)) throw new UserError("Alias is already taken");
            const imageStringBase64: string = Buffer.from(userImageBytes).toString("base64");
            const imageURL = await this.imageDAO.putImage(alias, imageStringBase64, imageFileExtension); //Using the alias as the filename
            const passwordHash = await this.generateHash(password);
            await this.userDAO.addUser(firstname, lastname, alias, passwordHash, imageURL);
            const authToken = await this.addAuth(alias);
            return [{firstname, lastname, alias, imageURL}, authToken.token, authToken.timestamp];
        });
    }

    public async login(alias: string, password: string): Promise<[UserDTO, string, number]> {
        return await this.checkForError(async() => {
            if (!await this.userDAO.userExists(alias)) throw new UserError("User does not exist");
            const storedPasswordHash = await this.userDAO.getPasswordHash(alias);
            if (!await bcrypt.compare(password, storedPasswordHash)) throw new UserError("Password is incorrect");
            const userDTO = await this.userDAO.getUserDTO(alias);
            const authToken = await this.addAuth(alias);
            return [userDTO, authToken.token, authToken.timestamp];
        });
    }

    public async logout(token: string): Promise<void> {
        await this.checkForError(async() => {
            await this.authDAO.removeAuth(token);
        });
    };
    
    public async getUser(token: string, alias: string): Promise<UserDTO | null> {
        return await this.checkForError(async() => {
            await this.checkToken(token);
            const user = await this.userDAO.getUserDTO(alias);
            return user ? user : null;
        });
    };

    private async addAuth(alias: string): Promise<AuthToken> {
        const authToken = AuthToken.Generate();
        await this.authDAO.addAuth(alias, authToken);
        return authToken;
    }

    private async generateHash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }
}