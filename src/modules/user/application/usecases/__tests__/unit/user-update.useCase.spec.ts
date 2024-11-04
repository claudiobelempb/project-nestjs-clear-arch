import { UserInMemoryRepository } from '@/modules/user/infra/database/in-memory/repositories/user-in-memory.repository'
import { UserUpdateUseCase } from '../../user-update.usecase'
import { NotFoundError } from '@/shared/domain/errors/entity-not-found.error'
import { BadRequestError } from '@/shared/application/errors/bad-request.error'
import { UserDataBuilder } from '@/modules/user/domain/testing/helper/user-data-builder'
import { UserEntiry } from '@/modules/user/domain/entities/user.entity'

describe('UserUpdateUseCase unit tests', () => {
  let sut: UserUpdateUseCase.UseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new UserUpdateUseCase.UseCase(repository)
  })
  it('should throws error when entity not found', () => {
    expect(() =>
      sut.execute({
        id: 'fakeId',
        firstName: 'test firsName',
        lastName: 'test lastName',
      }),
    ).rejects.toThrow(new NotFoundError('Entity not found'))
  })

  it('should throws error when firstName or lastName not provider', () => {
    expect(() =>
      sut.execute({
        id: 'fakeId',
        firstName: '',
        lastName: '',
      }),
    ).rejects.toThrow(new BadRequestError('FirstName or LastName not provided'))
  })

  it('should update a user', async () => {
    const spyUpdate = jest.spyOn(repository, 'update')
    const items = [new UserEntiry(UserDataBuilder({}))]
    repository.items = items

    const result = await sut.execute({
      id: items[0]._id,
      firstName: 'new first name',
      lastName: 'new last name',
    })
    expect(spyUpdate).toHaveBeenCalledTimes(1)
    expect(result).toMatchObject({
      id: items[0]._id,
      firstName: 'new first name',
      lastName: 'new last name',
    })
  })
})
