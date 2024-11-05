import { UserInMemoryRepository } from '@/modules/user/infra/database/in-memory/repositories/user-in-memory.repository'
import { NotFoundError } from '@/shared/domain/errors/not-found.error'
import { UserDataBuilder } from '@/modules/user/domain/testing/helper/user-data-builder'
import { UserEntiry } from '@/modules/user/domain/entities/user.entity'
import { UserUpdatePasswordUseCase } from '../../user-update-password.usecase'
import { HashProvider } from '@/shared/application/providers/hash-provider'
import { BcryptjsHashProvider } from '@/modules/user/infra/providers/hash-provider/bcryptjs-hash.provider'
import { InvalidPasswordError } from '@/shared/application/errors/invalid-password.error'
import { UserActiveUseCase } from '../../user-update-active.usecase'

describe('UserActiveUseCase unit tests', () => {
  let sut: UserActiveUseCase.UseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new UserActiveUseCase.UseCase(repository)
  })
  it('should throws error when entity not found', () => {
    expect(() =>
      sut.execute({
        id: 'fakeId',
        active: true,
      }),
    ).rejects.toThrow(new NotFoundError('Entity not found'))
  })

  it('Should active true', async () => {
    const spyUpdateActive = jest.spyOn(repository, 'update')
    const items = [new UserEntiry(UserDataBuilder({ active: true }))]
    repository.items = items
    await sut.execute({ id: items[0].id, active: true })
    expect(spyUpdateActive).toHaveBeenCalledTimes(1)
    expect(repository.items).toHaveLength(1)
  })

  it('Should active false', async () => {
    const spyUpdateActive = jest.spyOn(repository, 'update')
    const items = [new UserEntiry(UserDataBuilder({ active: false }))]
    repository.items = items
    await sut.execute({ id: items[0].id, active: false })
    expect(spyUpdateActive).toHaveBeenCalledTimes(1)
    expect(repository.items).toHaveLength(1)
  })
})
