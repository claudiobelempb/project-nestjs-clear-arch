import { UserInMemoryRepository } from '@/modules/user/infra/database/in-memory/repositories/user-in-memory.repository'
import { NotFoundError } from '@/shared/domain/errors/not-found.error'
import { UserDataBuilder } from '@/modules/user/domain/testing/helper/user-data-builder'
import { UserEntiry } from '@/modules/user/domain/entities/user.entity'
import { UserUpdatePasswordUseCase } from '../../user-update-password.usecase'
import { HashProvider } from '@/shared/application/providers/hash-provider'
import { BcryptjsHashProvider } from '@/modules/user/infra/providers/hash-provider/bcryptjs-hash.provider'
import { InvalidPasswordError } from '@/shared/application/errors/invalid-password.error'

describe('UserUpdatePasswordUseCase unit tests', () => {
  let sut: UserUpdatePasswordUseCase
  let repository: UserInMemoryRepository
  let hashProvider: HashProvider

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    hashProvider = new BcryptjsHashProvider()
    sut = new UserUpdatePasswordUseCase(repository, hashProvider)
  })
  it('should throws error when entity not found', () => {
    expect(() =>
      sut.execute('fakeId', {
        password: 'test password',
        oldPassword: 'test old password',
      }),
    ).rejects.toThrow(new NotFoundError('Entity not found'))
  })

  it('should throws error when old password not provider', () => {
    const entity = new UserEntiry(UserDataBuilder({}))
    repository.items = [entity]
    expect(() =>
      sut.execute(entity._id, {
        password: 'test password',
        oldPassword: '',
      }),
    ).rejects.toThrow(
      new InvalidPasswordError('Old password and new password is required'),
    )
  })

  it('should throws error when new password not provider', () => {
    const entity = new UserEntiry(UserDataBuilder({ password: '1234' }))
    repository.items = [entity]
    expect(() =>
      sut.execute(entity._id, {
        password: '',
        oldPassword: 'test old password',
      }),
    ).rejects.toThrow(
      new InvalidPasswordError('Old password and new password is required'),
    )
  })

  it('should throws error when new old password does not math', async () => {
    const hashPassword = await hashProvider.generateHash('1234')
    const entity = new UserEntiry(UserDataBuilder({ password: hashPassword }))
    repository.items = [entity]
    expect(() =>
      sut.execute(entity._id, {
        password: '4567',
        oldPassword: '123456',
      }),
    ).rejects.toThrow(new InvalidPasswordError('Old password does not math'))
  })

  it('should update a password', async () => {
    const hashPassword = await hashProvider.generateHash('1234')
    const spyUpdate = jest.spyOn(repository, 'update')
    const items = [new UserEntiry(UserDataBuilder({ password: hashPassword }))]
    repository.items = items

    const result = await sut.execute(items[0]._id, {
      password: '4567',
      oldPassword: '1234',
    })
    const checkNewPassword = await hashProvider.compareHash(
      '4567',
      result.password,
    )
    expect(spyUpdate).toHaveBeenCalledTimes(1)
    expect(checkNewPassword).toBeTruthy()
  })
})
