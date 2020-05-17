import AppError from '@shared/errors/AppError';
import FakeStorageRepository from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageRepository = new FakeStorageRepository();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageRepository,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'teste@teste.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from not existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageRepository = new FakeStorageRepository();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageRepository,
    );

    expect(
      updateUserAvatar.execute({
        user_id: 'non-exist-user',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when update a new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageRepository = new FakeStorageRepository();

    const deleteFile = jest.spyOn(fakeStorageRepository, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageRepository,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'teste@teste.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
