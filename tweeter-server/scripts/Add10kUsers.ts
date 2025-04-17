import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { BatchWriteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import bcrypt from "bcryptjs";
import { UserDTO } from "tweeter-shared";
import { BUCKET, REGION } from "../src/config";

const client = DynamoDBDocumentClient.from(new DynamoDBClient());
const USER_TO_FOLLOW_ALIAS = "@hyrum";
const PROFILE_PIC_NAME = "%40generic";

async function batchRegister(users: UserDTO[]) {
    try {
        const start = new Date().getTime();
        for (let i = 0; i < users.length; i += 25) {
            const putRequest: any[] = [];
            const userSlice = users.slice(i, i + 25);
            for (let j = 0; j < 25; j++) putRequest.push(await getRegisterPutRequest(userSlice[j]));
            const params = {
                RequestItems: {
                    "users": putRequest
                }
            };
            await client.send(new BatchWriteCommand(params));
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(`${i} users processed (${(new Date().getTime() - start)/1000} seconds)`);
        }
        console.log(`Finished, time: ${(new Date().getTime() - start)/1000}`);
    }
    catch (error) {
        console.log(`An error occurred: ${(error as Error).message}`);
    }
}

async function batchFollow(users: UserDTO[]) {
    try {
        const start = new Date().getTime();
        for (let i = 0; i < users.length; i += 25) {
            const putRequest: any[] = [];
            const userSlice = users.slice(i, i + 25);
            for (let j = 0; j < 25; j++) putRequest.push(await getFollowPutRequest(userSlice[j]));
            const params = {
                RequestItems: {
                    "follows": putRequest
                }
            };
            await client.send(new BatchWriteCommand(params));
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(`${i} followers added (${(new Date().getTime() - start)/1000} seconds)`);
        }
        console.log(`Finished, time: ${(new Date().getTime() - start)/1000}`);
    }
    catch (error) {
        console.log(`An error occurred: ${(error as Error).message}`);
    }
}

async function getRegisterPutRequest(user: UserDTO) {
    const salt = await bcrypt.genSalt(3);
    const passwordHash = await bcrypt.hash("password", salt);
    // All users will have the same profile picture. This image must be inserted manually into the bucket.
    const imageLink = `https://${BUCKET}.s3.${REGION}.amazonaws.com/image/${PROFILE_PIC_NAME}`;
    return {
        PutRequest: {
            Item: {
                alias: user.alias,
                firstName: user.firstname,
                lastName: user.lastname,
                password: passwordHash,
                s3Link: imageLink
            }
        }
    };
}

async function getFollowPutRequest(user: UserDTO) {
    return {
        PutRequest: {
            Item: {
                follower_handle: user.alias,
                followee_handle: USER_TO_FOLLOW_ALIAS
            }
        }
    };
}

console.log("Running script");
const users: UserDTO[] = [];
for (let i = 0; i <= 10000; i++) {
    users.push({
        alias: `@generic-user-${i}`,
        firstname: `Generic`,
        lastname: `User ${i}`,
        imageURL: "",
    });
}

if (process.argv.length != 3) {
    console.log("Usage: node Add10kUsers.js <follow | register>");
}
else {
    if (process.argv[2].toLowerCase() === "register") {
        console.log("Calling batchRegister()...")
        batchRegister(users);
    }
    else if (process.argv[2].toLowerCase() === "follow") {
        console.log("Calling batchFollow()...")
        batchFollow(users);
    }
}