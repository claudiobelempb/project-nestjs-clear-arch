export namespace DefaultResponse {
  export type SortDirection = 'asc' | 'desc'

  export type PaginationResponse<Item = any> = {
    items: Item[]
    total?: number
    currentPage?: number
    lastPage?: number
    perPage?: number
  }

  export type SearchResponse<Filter = string> = {
    page?: number
    perPage?: number
    sort?: string | null
    sortDir?: SortDirection | null
    filter?: Filter | null
  }
}
