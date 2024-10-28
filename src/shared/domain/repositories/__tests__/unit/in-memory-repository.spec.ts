import { AppEntity } from '@/shared/domain/entities/app-entity'
import { InMemoryRepository } from '../../in-memory.repository'
type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends AppEntity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository unit tests', () => {
  let sut: StubInMemoryRepository
  beforeEach(() => {
    sut = new StubInMemoryRepository()
  })

  it('Should insert a new entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    expect(entity.toJSON()).toStrictEqual(sut.itens[0].toJSON())
  })
})
