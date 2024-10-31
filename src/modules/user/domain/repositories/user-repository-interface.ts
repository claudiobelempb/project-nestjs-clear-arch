import { RepositoryInteface } from '@/shared/domain/repositories/repository-contracts'
import { UserEntiry } from '../entities/user.entity'
import { SeachacleRepositoryInteface } from '@/shared/domain/repositories/searchable-repository-contracts'
import { SearchParams as DefaultSearchParams } from '@/shared/domain/repositories/utils/search-params'
import { SearchResult as DefaultSearchResult } from '@/shared/domain/repositories/utils/search-result'

export namespace UserRepository {
  export type Filter = string

  export class SearchParams extends DefaultSearchParams<Filter> {}
  export class SearchResult extends DefaultSearchResult<UserEntiry, Filter> {}
  export interface Repository
    extends SeachacleRepositoryInteface<
      UserEntiry,
      Filter,
      SearchParams,
      SearchResult
    > {
    findByEmail(email: string): Promise<UserEntiry>
    emailExists(email: string): Promise<void>
  }
}
