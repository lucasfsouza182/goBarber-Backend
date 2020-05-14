import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUsersService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticate';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const usersReposiroty = new UsersRepository();
  const createdUser = new CreateUserService(usersReposiroty);

  const user = await createdUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService(usersReposiroty);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
