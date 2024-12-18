import { UserInMemoryRepository } from '@/user/infra/database/in-memory/repositories/user-in-memory.repository'
import { UserFindByIdUseCase } from '../../user-findbyid.usecase'
import { NotFoundError } from '@/shared/domain/errors/not-found.error'
import { UserEntiry } from '@/user/domain/entities/user.entity'
import { UserDataBuilder } from '@/user/domain/testing/helper/user-data-builder'

describe('FindByIdUseCase unit tests', () => {
  let sut: UserFindByIdUseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new UserFindByIdUseCase(repository)
  })
  it('Should throws error when entity not found', async () => {
    await expect(() => sut.execute('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('Should be able to get user profile', async () => {
    const spyFindById = jest.spyOn(repository, 'findById')
    const items = [new UserEntiry(UserDataBuilder({}))]
    repository.items = items
    const result = await sut.execute(items[0].id)
    expect(spyFindById).toHaveBeenCalledTimes(1)
    expect(result).toMatchObject({
      id: items[0].id,
      firstName: items[0].firstName,
      lastName: items[0].lastName,
      email: items[0].email,
      password: items[0].password,
      active: items[0].active,
      createdAt: items[0].createdAt,
      updatedAt: items[0].updatedAt,
    })
  })
})
