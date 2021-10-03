import { UserCreationParams, UsersService } from './usersService';
import { User } from './users';
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Route,
  SuccessResponse,
} from 'tsoa';

@Route('users')
export class UsersController extends Controller {
  @Get()
  public async getAllUser(): Promise<User[]> {
    return new UsersService().findAllUser();
  }

  @Get('{userId}')
  public async getUser(@Path() userId: number): Promise<User> {
    return new UsersService().findUser(userId);
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams,
  ): Promise<User> {
    this.setStatus(201); // set return status 201
    return new UsersService().createUser(requestBody);
  }
}
