import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { BatchWriteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import bcrypt from "bcryptjs";
import { UserDTO } from "tweeter-shared";

const client = DynamoDBDocumentClient.from(new DynamoDBClient());

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
    const imageLink = "https://hyrumdurfee-tweeter.s3.us-east-1.amazonaws.com/image/%40generic";
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
                followee_handle: "@hyrum"
            }
        }
    };
}

console.log("Running script");
const users: UserDTO[] = [];
for (let i = 7951; i <= 10000; i++) {
    users.push({
        alias: `@generic-user-${i}`,
        firstname: `Generic`,
        lastname: `User ${i}`,
        imageURL: "",
    });
}
// batchRegister(users);
batchFollow(users);