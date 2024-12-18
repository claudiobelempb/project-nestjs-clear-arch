import { UserFindAllUseCase } from '../../user-findall.usecase'
import { UserInMemoryRepository } from '@/user/infra/database/in-memory/repositories/user-in-memory.repository'
import { UserRepository } from '@/user/domain/repositories/user-repository'
import { UserEntiry } from '@/user/domain/entities/user.entity'
import { UserDataBuilder } from '@/user/domain/testing/helper/user-data-builder'

describe('UserFindAllUseCase unit tests', () => {
  let sut: UserFindAllUseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new UserFindAllUseCase(repository)
  })
  it('toResponse method', () => {
    let result = new UserRepository.SearchResult({
      items: [],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    })
    let response = sut['toResponse'](result)
    expect(response).toStrictEqual({
      items: [],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    })

    const entity = new UserEntiry(UserDataBuilder({}))
    result = new UserRepository.SearchResult({
      items: [entity],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    })
    response = sut['toResponse'](result)
    expect(response).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    })
  })

  it('should return the users ordered by createdAt', async () => {
    const createdAt = new Date()
    const items = [
      new UserEntiry(UserDataBuilder({ createdAt })),
      new UserEntiry(
        UserDataBuilder({ createdAt: new Date(createdAt.getTime() + 1) }),
      ),
    ]
    repository.items = items
    const response = await sut.execute({})
    expect(response).toStrictEqual({
      items: [...items].reverse().map(item => item.toJSON()),
      total: 2,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
    })
  })

  it('should return the users uning pagination, sort and filter', async () => {
    const items = [
      new UserEntiry(UserDataBuilder({ firstName: 'a' })),
      new UserEntiry(UserDataBuilder({ firstName: 'AA' })),
      new UserEntiry(UserDataBuilder({ firstName: 'Aa' })),
      new UserEntiry(UserDataBuilder({ firstName: 'b' })),
      new UserEntiry(UserDataBuilder({ firstName: 'c' })),
    ]
    repository.items = items
    let response = await sut.execute({
      page: 1,
      perPage: 2,
      sort: 'firstName',
      sortDir: 'asc',
      filter: 'a',
    })
    expect(response).toStrictEqual({
      items: [items[1].toJSON(), items[2].toJSON()],
      total: 3,
      currentPage: 1,
      lastPage: 2,
      perPage: 2,
    })

    response = await sut.execute({
      page: 2,
      perPage: 2,
      sort: 'firstName',
      sortDir: 'asc',
      filter: 'a',
    })
    expect(response).toStrictEqual({
      items: [items[0].toJSON()],
      total: 3,
      currentPage: 2,
      lastPage: 2,
      perPage: 2,
    })

    response = await sut.execute({
      page: 1,
      perPage: 3,
      sort: 'firstName',
      sortDir: 'desc',
      filter: 'a',
    })
    expect(response).toStrictEqual({
      items: [items[0].toJSON(), items[2].toJSON(), items[1].toJSON()],
      total: 3,
      currentPage: 1,
      lastPage: 1,
      perPage: 3,
    })
  })
})
