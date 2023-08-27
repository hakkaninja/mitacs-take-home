# Instructions

1. Download and Install NodeJS: https://nodejs.org/en/download

- Be on at least Node 18

2. Download and Install Redis-stack-server: https://redis.io/docs/getting-started/install-stack/
   (If you're on windows, you will have to install Docker)

- The server won't work without this dependency.
- Make sure you have the redis server running (on mac the command to use is redis-stack-server)

3. To run the backend test server, navigate to the server folder `npm install` and then `npm start`
4. To run the frontend react app, navigate to the webclient folder `npm install` and `npm start` and run the frontend on a different port
5. To run tests on the frontend react app, navigate to the webclient folder and `npm test`

# Further Improvements

There are some other code bits I would've liked to include if there was more time.

1. add error boundaries for the react code something like https://www.npmjs.com/package/react-error-boundary and test for it.
2. diving deeper into testing react-query hooks with react-testing-library
3. try to combine the AddInstitutionModal and the UpdateInstitutionModal into one component so its more reuseable.
