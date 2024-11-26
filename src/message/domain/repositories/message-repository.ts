import { SeachacleRepositoryInteface } from '@/shared/domain/repositories/searchable-repository-contracts'
import { SearchParams as DefaultSearchParams } from '@/shared/domain/repositories/utils/search-params'
import { SearchResult as DefaultSearchResult } from '@/shared/domain/repositories/utils/search-result'
import { MessageEntity } from '../entities/message.entity'

export namespace MessageRepository {
  export type Filter = string

  export class SearchParams extends DefaultSearchParams<Filter> {}
  export class SearchResult extends DefaultSearchResult<
    MessageEntity,
    Filter
  > {}
  export interface Repository
    extends SeachacleRepositoryInteface<
      MessageEntity,
      Filter,
      SearchParams,
      SearchResult
    > {}
}
