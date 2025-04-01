import { UserDTO } from "tweeter-shared";

export interface UserDAO {
    addUser: (firstName: string, lastName: string, alias: string, passwordHash: string, imageLink: string) => Promise<void>;
    userExists: (alias: string) => Promise<boolean>;
    getPasswordHash: (alias: string) => Promise<string>;
    getUserDTO: (alias: string) => Promise<UserDTO>;
    getPageOfUserData: (aliases: string[]) => Promise<UserDTO[]>;
}