import { AppEntity } from '@/shared/domain/entities/default-entity'
import { InMemoryRepository } from '../../in-memory.repository'
import { EntityNotFoundError } from '@/shared/domain/errors/not-found.error'
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
    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })

  it('Should throw error when entity not found', async () => {
    await expect(sut.findById('fakeId')).rejects.toThrow(
      new EntityNotFoundError('Entity not found'),
    )
  })

  it('Should find a entity by id', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    const result = await sut.findById(entity._id)
    expect(entity.toJSON()).toStrictEqual(result.toJSON())
  })

  it('Should return findall entities', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    const result = await sut.findAll()
    expect([entity]).toStrictEqual(result)
  })

  it('Should throw error on update when entity not found', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await expect(sut.update(entity)).rejects.toThrow(
      new EntityNotFoundError('Entity not found'),
    )
  })

  it('Should update an entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    const entityUpdate = new StubEntity(
      { name: 'update name', price: 10 },
      entity._id,
    )
    await sut.update(entityUpdate)
    expect(entityUpdate.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })

  it('Should throw error on delete when entity not found', async () => {
    await expect(sut.delete('fakerId')).rejects.toThrow(
      new EntityNotFoundError('Entity not found'),
    )
  })

  it('Should delete an entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    await sut.delete(entity._id)
    expect(sut.items).toHaveLength(0)
  })
})
