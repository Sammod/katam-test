"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
// src/users/usersService.ts
const users_1 = require("./users");
const error_1 = require("../../utils/error");
const idGenerator = () => Math.floor(Math.random() * 10000);
class UsersService {
    /**
     * Method to retrieves all user data
     * @returns The all users data
     */
    findAllUser() {
        try {
            return users_1.mockUsers;
        }
        catch (error) {
            throw (0, error_1.throwCustomDomainError)(error.statusCode);
        }
    }
    /**
     * Method to find and retrieve a user data
     * @param id The User id
     * @returns The user data corresponding to the id provided
     */
    findUser(id) {
        try {
            const user = users_1.mockUsers.find((user) => user.id === id);
            if (!user) {
                throw new error_1.ResourceNotFoundError(`The user with person nummer ${id} could not be found`);
            }
            return user;
        }
        catch (error) {
            throw (0, error_1.throwCustomDomainError)(error.statusCode);
        }
    }
    /**
     * Method to add a User to the database
     * @param userCreationParams The User data to be saved
     * @param res The res object provided in post query
     * @returns Confirmation on user addition to the database or adequate error if not
     */
    createUser(userCreationParams) {
        try {
            const userData = Object.assign({ id: idGenerator() }, userCreationParams);
            // Asigen the user in fake_db with id as a index
            users_1.mockUsers.push(userData);
            // Convert response to json before sending it.
            return userData;
        }
        catch (error) {
            throw (0, error_1.throwCustomDomainError)(error.statusCode);
        }
    }
}
exports.UsersService = UsersService;
