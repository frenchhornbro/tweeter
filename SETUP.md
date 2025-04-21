# Setup
This is currently implemented with AWS API Gateway, Labmda, SQS, and DynamoDB. The following setup is required after cloning the project before it will run (maybe will refactor more of this into a script):
- Run `npm install` in the project root folder
- Run `npm install`, then `npm build` in the following: tweeter-shared, tweeter-server, tweeter-web
- Deploy tweeter-server to AWS:
    - IAM
        - Create an IAM Role for the Lambda service with the following permissions policies:
            - AmazonDynamoDBFullAccess
            - AmazonS3FullAccess
            - AmazonSQSFullAccess
            - AWSLambda_FullAccess
            - CloudWatchLogsFullAccess
        - You must be signed in with an IAM user in AWS CLI
    - Lambda
        - Create the lambda layer:
            - In tweeter-server, run `zipDependencies.sh`
            - Create a lambda layer, choose nodejs.zip as the zip file, specify "Node.js 20.x" for Compatible runtimes
        - Deploy the lambdas:
            - Create tweeter-server/.server with the following:
                ```
                BUCKET='<S3 bucket name>'
                LAMBDA_ROLE='<IAM Lambda Role ARN>'
                EDIT_LAMBDALIST='
                    <lambdaName1> | lambda/follow/userItem/GetFolloweesLambda.getFolloweesHandler
                    <lambdaName2> | lambda/follow/userItem/GetFollowersLambda.getFollowersHandler
                    <lambdaName3> | lambda/follow/count/GetFollowerCountLambda.getFollowerCountHandler
                    <lambdaName4> | lambda/follow/count/GetFolloweeCountLambda.getFolloweeCountHandler
                    <lambdaName5> | lambda/follow/GetIsFollowerStatusLambda.getIsFollowerStatusHandler
                    <lambdaName6> | lambda/follow/action/FollowLambda.followHandler
                    <lambdaName7> | lambda/follow/action/UnfollowLambda.unfollowHandler
                    <lambdaName8> | lambda/status/load/GetFeedItemsLambda.getFeedItemsHandler
                    <lambdaName9> | lambda/status/load/GetStoryItemsLambda.getStoryItemsHandler
                    <lambdaName10> | lambda/status/post/PostStatusLambda.postStatusHandler
                    <lambdaName11> | lambda/status/post/PostUpdateFeedMessageLambda.postUpdateFeedMessageHandler
                    <lambdaName12> | lambda/status/post/UpdateFeedsLambda.updateFeedsHandler
                    <lambdaName13> | lambda/user/action/RegisterLambda.registerHandler
                    <lambdaName14> | lambda/user/action/LoginLambda.loginHandler
                    <lambdaName15> | lambda/user/action/LogoutLambda.logoutHandler
                    <lambdaName16> | lambda/user/GetUserLambda.getUserHandler
                '
                LAMBDALAYER_ARN='<Lambda Layer ARN>'
                ```
            - In tweeter-server, run `./fullLambdaUpload.sh` (this runs in bash)
    - API Gateway
        - Create a new REST API, click Import
        - Specify edge-optimized as the API endpoint type
        - Use tweeter-server/json/apigateway/CS-340-Tweeter-API-dev-swagger.json as the API definition
        - For each POST method:
            - Click Edit integration request and specify the appropriate lambda function to be called
            - Create integration responses for 400 and 500
            - 400 should have an HTTP status regex of ^\[Bad Request\].* and 500 should have ^\[Server Error\].* and both should have '*' (including single quotes) for the header mapping Access-Control-Allow-Origin
        - Deploy the API to the stage
    - DynamoDB
        - Files for the five tables are found in tweeter-server/json/dynamodb

        > ⚠️ **Warning:**
        > 
        > RCUs and WCUs must be configured in ProvisionedThroughput to avoid unnecessary expenses.
        > Current configurations allow a user with a large number of followers (~10,000) to make a post and have it be deployed to all feeds in ~60 seconds.
        > However, this can incur a significant cost. If this functionality is not needed, drop the feed table's WCUs and the follows_index's RCUs from 100 to 1-5.

        - Deploy each table with `aws dynamodb create-table --cli-input-json file://tweeter-server/json/dynamodb/<tablename>.json > /dev/null`
        - tweeter-server/scripts contains scripts that can populate the database with 17 users that follow each other or with 10,000 that follow one user. WCUs for the users and follows tables must be increased (up to 200) to avoid capacity errors.
    - SQS
        - Create a standard queue named Tweeter-Post-Status-Queue and update its lambda trigger to the PostUpdateFeedMessage lambda
        - Create a standard queue named Tweeter-Update-Feed_Queue and update its lambda trigger to the UpdateFeeds lambda
        - The use of SQS enables a user with a large number of followers to make a post and have it be delivered to the feed of every follower without the poster having to see how long it takes to do so
- Add tweeter-web/config.ts with the following:
    ```
    export const SERVER_URL = "<Invoke URL for AWS API Gateway stage>"
    ```
- Add tweeter-server/config.ts with the following:
    ```
    export const BUCKET = "<S3 bucket name>";
    export const REGION = "<S3 bucket region>";
    ```

[Back to README.md](./README.md)
