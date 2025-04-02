import { UserDTO } from "tweeter-shared";
import { DynamoDBFactory } from "../../src/factory/DynamoDBFactory";
import { UserService } from "../../src/model/service/UserService";

export async function getNewUser(): Promise<[string, UserDTO, string]> {
    const userService = new UserService(new DynamoDBFactory());
    const now = new Date().toISOString();
    const alias = `alias${now}`;
    const [user, token,] = await userService.register(`firstname${now}`, `lastname${now}`, alias, `password`, new Uint8Array([]), "png");
    return [alias, user, token]
}