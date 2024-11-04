import { SearchResult } from '@/shared/domain/repositories/utils/search-result'
import { DefaultMapper } from '../default-mapper'

describe('DefaultMapper unit tests', () => {
  describe('PaginationMapper unit tests', () => {
    it('should convert a SearchResult in response', () => {
      const result = new SearchResult({
        items: ['fake'] as any,
        total: 1,
        currentPage: 1,
        perPage: 1,
        sort: '',
        sortDir: '',
        filter: 'fake',
      })
      const sut = DefaultMapper.PaginationMapper.toResponse(
        result.items,
        result,
      )
      expect(sut).toStrictEqual({
        items: ['fake'] as any,
        total: 1,
        currentPage: 1,
        lastPage: 1,
        perPage: 1,
      })
    })
  })
})
