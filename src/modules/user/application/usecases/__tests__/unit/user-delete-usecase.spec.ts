import { UserInMemoryRepository } from '@/modules/user/infra/database/in-memory/repositories/user-in-memory.repository'
import { NotFoundError } from '@/shared/domain/errors/not-found.error'
import { UserEntiry } from '@/modules/user/domain/entities/user.entity'
import { UserDataBuilder } from '@/modules/user/domain/testing/helper/user-data-builder'
import { UserDeleteUseCase } from '../../user-delete.usecase'

describe('UserDeleteUseCase unit tests', () => {
  let sut: UserDeleteUseCase.UseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new UserDeleteUseCase.UseCase(repository)
  })
  it('Should throws error when entity not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('Should delete a user', async () => {
    const spyDelete = jest.spyOn(repository, 'delete')
    const items = [new UserEntiry(UserDataBuilder({}))]
    repository.items = items
    expect(repository.items).toHaveLength(1)
    await sut.execute({ id: items[0].id })
    expect(spyDelete).toHaveBeenCalledTimes(1)
    expect(repository.items).toHaveLength(0)
  })
})
