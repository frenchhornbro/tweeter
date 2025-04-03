import { DynamoDBFactory } from "../src/factory/DynamoDBFactory";
import { FollowService } from "../src/model/service/FollowService";
import { UserService } from "../src/model/service/UserService";

async function addUsers() {
    const users = [
        {
            firstname: "Ryan",
            lastname: "Callahan",
            alias: "@ryan",
        },
        {
            firstname: "Ty",
            lastname: "Budvarson",
            alias: "@ty",
        },
        {
            firstname: "Luke",
            lastname: "Macfarlane",
            alias: "@luke",
        },
        {
            firstname: "Viliami",
            lastname: "Hafoka",
            alias: "@viliami",
        },
        {
            firstname: "Tanner",
            lastname: "Boyd",
            alias: "@tanner",
        },
        {
            firstname: "Josh",
            lastname: "Nicholls",
            alias: "@josh",
        },
        {
            firstname: "Adam",
            lastname: "Huskinson",
            alias: "@adam",
        },
        {
            firstname: "Nathan",
            lastname: "Wilson",
            alias: "@nathan",
        },
        {
            firstname: "Tate",
            lastname: "Hughes",
            alias: "@tate",
        },
        {
            firstname: "Ian",
            lastname: "Wiseman",
            alias: "@ian",
        },
        {
            firstname: "Kenneth",
            lastname: "Bushman",
            alias: "@kenneth",
        },
        {
            firstname: "Austin",
            lastname: "Bateman",
            alias: "@austin",
        },
        {
            firstname: "Joseph",
            lastname: "Storey",
            alias: "@joseph",
        },
        {
            firstname: "Cyrus",
            lastname: "Ogden",
            alias: "@cyrus",
        },
        {
            firstname: "Jaydan",
            lastname: "Johnson",
            alias: "@jaydan",
        },
        {
            firstname: "Duncan",
            lastname: "Cutler",
            alias: "@duncan",
        }
    ];
    try {
        const tokens: string[] = [];
        const userService = new UserService(new DynamoDBFactory())
        for (let i = 0; i < users.length; i++) {
            console.log(`(${i} of ${users.length}): Registering ${users[i].alias}`);
            const [,token] = await userService.register(
                users[i].firstname,
                users[i].lastname,
                users[i].alias,
                "password",
                new Uint8Array([]),
                "png"
            );
            tokens.push(token);
        }
        
        const followService = new FollowService(new DynamoDBFactory())
        for (let i = 0; i < users.length; i++) {
            console.log(`(${i} of ${users.length}): Generating followers for ${users[i].alias}`);
            for (let j = i+1; j < users.length; j++) {
                await followService.follow(tokens[j], users[i].alias);
            }
        }
    }
    catch (error) {
        console.log(`An error occurred: ${(error as Error).message}`);
    }
}

addUsers();