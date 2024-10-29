import { SearchParams } from '../../searchable-repository-contracts'

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
  })
})
