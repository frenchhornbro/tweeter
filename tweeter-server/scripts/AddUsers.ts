import { DynamoDBFactory } from "../src/factory/DynamoDBFactory";
import { FollowService } from "../src/model/service/FollowService";
import { StatusService } from "../src/model/service/StatusService";
import { UserService } from "../src/model/service/UserService";

const userService = new UserService(new DynamoDBFactory())
const followService = new FollowService(new DynamoDBFactory());
const statusService = new StatusService(new DynamoDBFactory());
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

async function addUsers() {
    try {
        const tokens: string[] = [];
        for (let i = 0; i < users.length; i++) {
            console.log(`(${i+1} of ${users.length}): Registering ${users[i].alias}`);
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
        
        for (let i = 0; i < users.length; i++) {
            console.log(`(${i+1} of ${users.length}): Generating followers for ${users[i].alias}`);
            for (let j = i+1; j < users.length; j++) {
                await followService.follow(tokens[j], users[i].alias);
            }
        }
    }
    catch (error) {
        console.log(`An error occurred: ${(error as Error).message}`);
    }
}

async function addMainUser() {
    try {
        const [, authToken] = await userService.register(
            "Hyrum",
            "Durfee",
            "@hyrum",
            "password",
            new Uint8Array([]),
            "jpeg"
        );

        for (let i = 0; i < users.length; i++) {
            console.log(`(${i+1} of ${users.length}): ${users[i].alias} following Hyrum`);
            const [ ,userAuthToken] = await userService.login(users[i].alias, "password");
            if (i > 0) followService.follow(userAuthToken, "@hyrum");
            if (i < users.length - 1) followService.follow(authToken, users[i].alias);
        }
    }
    catch (error) {
        console.log(`An error occurred: ${(error as Error).message}`);
    }
}

async function generateUserPosts() {
    try {
        const [, authToken] = await userService.login("@hyrum", "password");
        for (let i = 1; i <= 21; i++) {
            console.log(`Generating post #${i}`);
            await statusService.postStatus(authToken, {
                post: `Hi guys! This is post number ${i}`,
                user: {
                    firstname: "Hyrum",
                    lastname: "Durfee",
                    alias: "@hyrum",
                    imageURL: "https://hyrumdurfee-tweeter.s3.us-east-1.amazonaws.com/image/%40hyrum"
                },
                timestamp: Date.now()
            });
        }
    }
    catch (error) {
        console.log(`An error occurred: ${(error as Error).message}`);
    }
}

if (process.argv.length != 3) {
    console.log("Usage: node Add10kUsers.js <users | main | post>");
}
if (process.argv[2].toLowerCase() === "users") {
    console.log("Calling addUsers()...")
    addUsers();
}
else if (process.argv[2].toLowerCase() === "main") {
    console.log("Calling addMainUser()...")
    addMainUser();
}
else if (process.argv[2].toLowerCase() === "post") {
    console.log("Calling generateUserPosts()...")
    generateUserPosts();
}