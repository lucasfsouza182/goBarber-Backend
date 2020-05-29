import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUsersService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createdUser = container.resolve(CreateUserService);

    const user = await createdUser.execute({
      name,
      email,
      password,
    });

    return response.json(classToClass(user));
  }
}
