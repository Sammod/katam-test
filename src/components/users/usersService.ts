// src/users/usersService.ts
import { User, mockUsers } from './users';
import {
  ResourceNotFoundError,
  throwCustomDomainError,
} from '../../utils/error';

// A post request should not contain an id.
export type UserCreationParams = Pick<
  User,
  'email' | 'firstName' | 'lastName' | 'organisation'
>;

const idGenerator = () => Math.floor(Math.random() * 10000);

export class UsersService {
  /**
   * Method to retrieves all user data
   * @returns The all users data
   */

  public findAllUser(): User[] {
    try {
      return mockUsers;
    } catch (error: any) {
      throw throwCustomDomainError(error.statusCode);
    }
  }

  /**
   * Method to find and retrieve a user data
   * @param id The User id
   * @returns The user data corresponding to the id provided
   */

  public findUser(id: number): User {
    try {
      const user = mockUsers.find((user: User) => user.id === id);
      if (!user) {
        throw new ResourceNotFoundError(
          `The user with person nummer ${id} could not be found`,
        );
      }
      return user;
    } catch (error: any) {
      throw throwCustomDomainError(error.statusCode);
    }
  }

  /**
   * Method to add a User to the database
   * @param userCreationParams The User data to be saved
   * @param res The res object provided in post query
   * @returns Confirmation on user addition to the database or adequate error if not
   */

  public createUser(userCreationParams: UserCreationParams): User {
    try {
      const userData: User = {
        id: idGenerator(),
        ...userCreationParams,
      };
      // Asigen the user in fake_db with id as a index
      mockUsers.push(userData);

      // Convert response to json before sending it.
      return userData;
    } catch (error: any) {
      throw throwCustomDomainError(error.statusCode);
    }
  }
}
