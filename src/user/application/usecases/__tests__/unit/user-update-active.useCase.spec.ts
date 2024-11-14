import { UserEntiry } from '@/user/domain/entities/user.entity'
import { UserDataBuilder } from '@/user/domain/testing/helper/user-data-builder'
import { UserInMemoryRepository } from '@/user/infra/database/in-memory/repositories/user-in-memory.repository'
import { NotFoundError } from '@/shared/domain/errors/not-found.error'
import { UserUpdateActiveUseCase } from '../../user-update-active.usecase'

describe('UserActiveUseCase unit tests', () => {
  let sut: UserUpdateActiveUseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new UserUpdateActiveUseCase(repository)
  })
  it('should throws error when entity not found', () => {
    expect(() => sut.execute('fakeId', true)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('Should active true', async () => {
    const spyUpdateActive = jest.spyOn(repository, 'update')
    const items = [new UserEntiry(UserDataBuilder({ active: true }))]
    repository.items = items
    await sut.execute(items[0]._id, true)
    expect(spyUpdateActive).toHaveBeenCalledTimes(1)
    expect(repository.items).toHaveLength(1)
  })

  it('Should active false', async () => {
    const spyUpdateActive = jest.spyOn(repository, 'update')
    const items = [new UserEntiry(UserDataBuilder({ active: false }))]
    repository.items = items
    await sut.execute(items[0]._id, false)
    expect(spyUpdateActive).toHaveBeenCalledTimes(1)
    expect(repository.items).toHaveLength(1)
  })
})
