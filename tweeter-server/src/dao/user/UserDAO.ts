export interface UserDAO {
    addUser: (firstName: string, lastName: string, alias: string, passwordHash: string, imageLink: string) => Promise<void>;
}