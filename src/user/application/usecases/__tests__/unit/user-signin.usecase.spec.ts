import { UserInMemoryRepository } from '@/user/infra/database/in-memory/repositories/user-in-memory.repository'
import { HashProvider } from '@/shared/application/providers/hash-provider'
import { BcryptjsHashProvider } from '@/user/infra/providers/hash-provider/bcryptjs-hash.provider'
import { UserDataBuilder } from '@/user/domain/testing/helper/user-data-builder'
import { BadRequestError } from '@/shared/application/errors/bad-request.error'
import { UserSigninUseCase } from '../../user-signin.usecase'
import { UserEntiry } from '@/user/domain/entities/user.entity'
import { NotFoundError } from '@/shared/domain/errors/not-found.error'
import { InvalidCredentialsError } from '@/shared/application/errors/invalid-credentials-error'

describe('UserSigninUseCase unit tests', () => {
  let sut: UserSigninUseCase
  let repository: UserInMemoryRepository
  let hashProvider: HashProvider

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    hashProvider = new BcryptjsHashProvider()
    sut = new UserSigninUseCase(repository, hashProvider)
  })
  it('Should authenticate a user', async () => {
    const spyFindByEmail = jest.spyOn(repository, 'findByEmail')
    const hashPassword = await hashProvider.generateHash('1234')
    const entity = new UserEntiry(
      UserDataBuilder({ email: 'a@a.com', password: hashPassword }),
    )
    repository.items = [entity]

    const result = await sut.execute({
      email: entity.email,
      password: '1234',
    })

    expect(spyFindByEmail).toHaveBeenCalledTimes(1)
    expect(result).toStrictEqual(entity.toJSON())
  })

  it('Should throws error when email not prividerd', async () => {
    const props = { email: null, password: '1234' }
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })

  it('Should throws error when password not prividerd', async () => {
    const props = { email: 'a@a.com', password: null }
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })

  it('Should not be able to authenticate with wrong email', async () => {
    const props = { email: 'a@a.com', password: '1234' }
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(NotFoundError)
  })

  it('Should not be able to authenticate with wrong password', async () => {
    const hashPassword = await hashProvider.generateHash('1234')
    const entity = new UserEntiry(
      UserDataBuilder({ email: 'a@a.com', password: hashPassword }),
    )
    repository.items = [entity]
    const props = { email: 'a@a.com', password: 'fake' }

    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    )
  })
})
