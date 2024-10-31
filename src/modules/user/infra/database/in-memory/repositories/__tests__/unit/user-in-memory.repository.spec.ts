import { UserEntiry } from '@/modules/user/domain/entities/user.entity'
import { UserInMemoryRepository } from '../../user-in-memory.repository'
import { UserDataBuilder } from '@/modules/user/domain/testing/helper/user-data-builder'
import { error } from 'console'
import { EntityNotFoundError } from '@/shared/domain/errors/entity-not-found.error'
import { ConfictError } from '@/shared/domain/errors/conflict-error'

describe('UserInMemoryRepository unit tests', () => {
  let sut: UserInMemoryRepository
  beforeEach(() => {
    sut = new UserInMemoryRepository()
  })

  it('Should throw error when not found - findByEmail method', async () => {
    await expect(sut.findByEmail('a@a.com')).rejects.toThrow(
      new EntityNotFoundError('Entity not found using a@a.com'),
    )
  })

  it('Should find a entity by email - findByEmail method', async () => {
    const entity = new UserEntiry(UserDataBuilder({}))
    await sut.insert(entity)
    const result = await sut.findByEmail(entity.email)
    expect(entity.toJSON()).toStrictEqual(result.toJSON())
  })

  it('Should throw error when confict - emailExists method', async () => {
    const entity = new UserEntiry(UserDataBuilder({}))
    await sut.insert(entity)
    await expect(sut.emailExists(entity.email)).rejects.toThrow(
      new ConfictError(`Email address already used ${entity.email}`),
    )
  })

  it('Should find a entity by email - emailExists method', async () => {
    expect.assertions(0)
    await sut.emailExists('a@a.com')
  })
})
