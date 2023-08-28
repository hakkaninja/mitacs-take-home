# Instructions

1. Download and Install NodeJS: https://nodejs.org/en/download

- Be on at least Node 18

2. Download and Install Redis-stack-server: https://redis.io/docs/getting-started/install-stack/
   (If you're on windows, you will have to install Docker)

- The server won't work without this dependency.
- Make sure you have the redis server running (on mac the command to use is redis-stack-server)

3. To run the backend test server, navigate to the server folder `npm install` and then `npm start`. Each time you restart the server, `data.txt` will populate redis. This data is our starting data.

- If you delete all the data via the UI, you can always restart the server to repopulate.

4. To run the frontend react app, navigate to the webclient folder `npm install` and `npm start` and run the frontend on a different port.
5. To run tests on the frontend react app, navigate to the webclient folder and `npm test`

# Implementation

1. For the keyword search, I used a library called fuse.js that can take in a threshold and other parameters that allow you to tweak how precise you want the keyword search results to be. The lower this the threshold, the more precise the results. I decided to use a threshold that returned somewhat similar results as sometimes users can misspell their keywords.
2. I decided to return all institution data when the app first starts up for the user. This way I can avoid pagination and just focus on the CRUD operations. All subsequent filters are client side filters not server side.

# Further Improvements

There are some other code bits I would've liked to include if there was more time.

1. add error boundaries for the react code, something like https://www.npmjs.com/package/react-error-boundary and test for edge cases with errors.
2. add more frontend tests such as: closing modals, deleting records, filtering records etc.
3. try to combine the AddInstitutionModal and the UpdateInstitutionModal into one component so its more reuseable.
4. write backend tests, I focused on writing a few frontend tests to test the UI because that's what the assignment focused on.
5. more optimizing code
6. add pagination and server side search. I also added a redis index to optimize search on the backend
7. add styling
