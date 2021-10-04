# katam-test

Repository created for the test of Katam

Contains expressjs server to create and retrieve a user data in a mock database.

## Installation

git clone the repository , move to the root of the repo and run `docker-compose up`.

## Testing

To retrieve some user testing data 3 mock user data is already existing in the beginning.
Those test data could be retrieve by running the following api call:

- GET `https://localhost:8000/api/v1/users/{userId}` , replacing userId by 1, 2 or 3,
- GET `https://localhost:8000/api/v1/users/` , will return all the users data currently save in the local store,
- POST `https://localhost:8000/api/v1/users/` , will save the user data in the local store and return the user data with the assign random id,

Testing can be done via postman or directly via swagger on the url:

- `https://localhost:8000/api/v1/swagger`, there you can find the object datastructure for the user and the type of return expect on every api call.
