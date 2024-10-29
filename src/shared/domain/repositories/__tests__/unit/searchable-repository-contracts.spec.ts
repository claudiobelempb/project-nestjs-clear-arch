import { SearchParams } from '../../utils/search-params'
import { SearchResult } from '../../utils/search-result'

describe('Searchable Repository unit tests', () => {
  describe('SearchParams tests', () => {
    it('page prop', () => {
      const sut = new SearchParams()
      expect(sut.page).toBe(1)
      const params = [
        { page: null as any, expect: 1 },
        { page: undefined as any, expect: 1 },
        { page: '', expect: 1 },
        { page: 'test', expect: 1 },
        { page: 0, expect: 1 },
        { page: -1, expect: 1 },
        { page: 5.5, expect: 1 },
        { page: true, expect: 1 },
        { page: false, expect: 1 },
        { page: {}, expect: 1 },
        { page: 1, expect: 1 },
        { page: 2, expect: 2 },
      ]

      params.forEach(i => {
        expect(new SearchParams({ page: i.page }).page).toEqual(i.expect)
      })
    })

    it('perPage prop', () => {
      const sut = new SearchParams()
      expect(sut.perPage).toBe(15)
      const params = [
        { perPage: null as any, expect: 15 },
        { perPage: undefined as any, expect: 15 },
        { perPage: '', expect: 15 },
        { perPage: 'test', expect: 15 },
        { perPage: 0, expect: 15 },
        { perPage: -1, expect: 15 },
        { perPage: 5.5, expect: 15 },
        { perPage: true, expect: 15 },
        { perPage: false, expect: 15 },
        { perPage: {}, expect: 15 },
        { perPage: 1, expect: 1 },
        { perPage: 2, expect: 2 },
        { perPage: 25, expect: 25 },
      ]

      params.forEach(i => {
        expect(new SearchParams({ perPage: i.perPage }).perPage).toBe(i.expect)
      })
    })

    it('sort prop', () => {
      const sut = new SearchParams()
      expect(sut.sort).toBeNull()
      const params = [
        { sort: null as any, expect: null },
        { sort: undefined as any, expect: null },
        { sort: '', expect: null },
        { sort: 'test', expect: 'test' },
        { sort: 0, expect: '0' },
        { sort: -1, expect: '-1' },
        { sort: 5.5, expect: '5.5' },
        { sort: true, expect: 'true' },
        { sort: false, expect: 'false' },
        { sort: {}, expect: '[object Object]' },
        { sort: 1, expect: '1' },
        { sort: 2, expect: '2' },
        { sort: 25, expect: '25' },
      ]

      params.forEach(i => {
        expect(new SearchParams({ sort: i.sort }).sort).toBe(i.expect)
      })
    })

    it('sortDir prop', () => {
      let sut = new SearchParams()
      expect(sut.sortDir).toBeNull()

      sut = new SearchParams({ sort: null })
      expect(sut.sortDir).toBeNull()

      sut = new SearchParams({ sort: undefined })
      expect(sut.sortDir).toBeNull()

      sut = new SearchParams({ sort: '' })
      expect(sut.sortDir).toBeNull()

      const params = [
        { sortDir: null as any, expect: 'desc' },
        { sortDir: undefined as any, expect: 'desc' },
        { sortDir: '', expect: 'desc' },
        { sortDir: 'test', expect: 'desc' },
        { sortDir: 0, expect: 'desc' },
        { sortDir: 'asc', expect: 'asc' },
        { sortDir: 'desc', expect: 'desc' },
        { sortDir: 'ASC', expect: 'asc' },
        { sortDir: 'DESC', expect: 'desc' },
      ]

      params.forEach(i => {
        expect(
          new SearchParams({ sort: 'field', sortDir: i.sortDir }).sortDir,
        ).toBe(i.expect)
      })
    })

    it('filter prop', () => {
      const sut = new SearchParams()
      expect(sut.filter).toBeNull()
      const params = [
        { filter: 'test', expect: 'test' },
        { filter: '', expect: null },
        { filter: null as any, expect: null },
        { filter: 0, expect: '0' },
        { filter: -1, expect: '-1' },
        { filter: 5.5, expect: '5.5' },
        { filter: true, expect: 'true' },
        { filter: false, expect: 'false' },
        { filter: {}, expect: '[object Object]' },
        { filter: 1, expect: '1' },
        { filter: 2, expect: '2' },
        { filter: 25, expect: '25' },
        { filter: undefined as any, expect: null },
      ]

      params.forEach(i => {
        expect(new SearchParams({ filter: i.filter }).filter).toBe(i.expect)
      })
    })
  })

  describe('SearchResult tests', () => {
    it('contructor props', () => {
      let sut = new SearchResult({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
        sort: null,
        sortDir: null,
        filter: null,
      })
      expect(sut.toJson()).toStrictEqual({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
        lastPage: 2,
        sort: null,
        sortDir: null,
        filter: null,
      })

      sut = new SearchResult({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
        sort: 'name',
        sortDir: 'asc',
        filter: 'test',
      })
      expect(sut.toJson()).toStrictEqual({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
        lastPage: 2,
        sort: 'name',
        sortDir: 'asc',
        filter: 'test',
      })

      sut = new SearchResult({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 10,
        sort: 'name',
        sortDir: 'asc',
        filter: 'test',
      })
      expect(sut.lastPage).toBe(1)

      sut = new SearchResult({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 54,
        currentPage: 1,
        perPage: 10,
        sort: 'name',
        sortDir: 'asc',
        filter: 'test',
      })
      expect(sut.lastPage).toBe(6)
    })
  })
})
