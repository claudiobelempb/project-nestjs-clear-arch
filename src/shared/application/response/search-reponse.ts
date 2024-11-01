export type SortDirectionResponse = 'asc' | 'desc'

export type SearchResponse<Filter = string> = {
  page?: number
  perPage?: number
  sort?: string | null
  sortDir?: SortDirectionResponse | null
  filter?: Filter | null
}
