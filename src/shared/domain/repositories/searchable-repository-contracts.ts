import { AppEntity } from '../entities/app-entity'
import { RepositoryInteface } from './repository-contracts'
import { SearchParams } from './utils/search-params'
import { SearchResult } from './utils/search-result'
export interface SeachacleRepositoryInteface<
  E extends AppEntity,
  Filter = string,
  SearchInput = SearchParams,
  SearchOutput = SearchResult<E, Filter>,
> extends RepositoryInteface<E> {
  sortableFields: string[]

  search(props: SearchInput): Promise<SearchOutput>
}
