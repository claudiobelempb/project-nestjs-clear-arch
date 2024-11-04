import { DefaultMapper } from '@/shared/application/mappers/default-mapper'
import { SearchResult } from '@/shared/domain/repositories/utils/search-result'
import { UserFindAllUseCase } from '../../user-findall.usecase'
import { UserInMemoryRepository } from '@/modules/user/infra/database/in-memory/repositories/user-in-memory.repository'
import { UserRepository } from '@/modules/user/domain/repositories/user-repository'
import { UserEntiry } from '@/modules/user/domain/entities/user.entity'
import { UserDataBuilder } from '@/modules/user/domain/testing/helper/user-data-builder'

describe('UserFindAllUseCase unit tests', () => {
  let sut: UserFindAllUseCase.UseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new UserFindAllUseCase.UseCase(repository)
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
})
