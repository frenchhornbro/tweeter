# Tweeter-Web

> [!NOTE] [Required Setup](./SETUP.md)

## Running the Application
Run the project by running 'npm run start' from within the 'tweeter-web' folder. This will run Vite and should automatically open up http://localhost:5173 to access the application.

## Experience
I did not write the frontend code for this project, but I refactored it to remove code duplicaiton and follow MVP. I created the backend and implemented it in AWS using Lambda functions for the service, API Gateway for routing endpoints, DynamoDB for the database, and SQS for queueing functions for Lambda.

This project is focused on giving me experience with implementing software design principles. Some include:
- Single-responsibility principle
- Avoid code duplication
- Layered architecture (MVP) (in frontend)
- Abstract factory method (in backend)

## Future Improvements
This application is fully functional. However, it does need some adjustments to allow posting a status for a user with a large number of followers. This will be implemented by sending requests to a queue via SQS and processing those requests with a lambda function. This will make the perceived time of posting for the user just about a second, but the actual updating of all the followers' feeds will take up to a couple of minutes to finish processing.

## Rebuilding the Project
Rebuild either module of the project (tweeter-shared or tweeter-web) by running 'npm run build' after making any code or configuration changes in the module. The 'tweeter-web' module is dependent on 'tweeter-shared', so if you change 'tweeter-shared' you will also need to rebuild 'tweeter-web'. After rebuilding 'tweeter-shared' you will likely need to restart VS Code (see note above under 'Setting Up the Project').

## Deploying to the Server
If all steps in Required Setup have been completed, any alterations to tweeter-server can be deployed with `./fullLambdaUpload.sh`. If additional dependencies of tweeter-server have been added (including if tweeter-shared is updated), run `./zipDependencies.sh`, create a new version for the lambda layer, and update LAMBDALAYER_ARN in the .server file, then run `./fullLambdaUpload.sh`.