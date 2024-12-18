import { DefaultEntity } from '../entities/default-entity'
import { RepositoryInteface } from './repository-contracts'
import { SearchParams } from './utils/search-params'
import { SearchResult } from './utils/search-result'
export interface SeachacleRepositoryInteface<
  E extends DefaultEntity,
  Filter = string,
  SearchInput = SearchParams<Filter>,
  SearchOutput = SearchResult<E, Filter>,
> extends RepositoryInteface<E> {
  sortableFields: string[]

  search(props: SearchInput): Promise<SearchOutput>
}
