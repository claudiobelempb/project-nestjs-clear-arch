import { UserInMemoryRepository } from '@/user/infra/database/in-memory/repositories/user-in-memory.repository'
import { NotFoundError } from '@/shared/domain/errors/not-found.error'
import { UserEntiry } from '@/user/domain/entities/user.entity'
import { UserDataBuilder } from '@/user/domain/testing/helper/user-data-builder'
import { UserDeleteUseCase } from '../../user-delete.usecase'

describe('UserDeleteUseCase unit tests', () => {
  let sut: UserDeleteUseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new UserDeleteUseCase(repository)
  })
  it('Should throws error when entity not found', async () => {
    await expect(() => sut.execute('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('Should delete a user', async () => {
    const spyDelete = jest.spyOn(repository, 'delete')
    const items = [new UserEntiry(UserDataBuilder({}))]
    repository.items = items
    expect(repository.items).toHaveLength(1)
    await sut.execute(items[0]._id)
    expect(spyDelete).toHaveBeenCalledTimes(1)
    expect(repository.items).toHaveLength(0)
  })
})
