import { UserInMemoryRepository } from '@/user/infra/database/in-memory/repositories/user-in-memory.repository'
import { UserSignupUseCase } from '../../user-signup.usecase'
import { HashProvider } from '@/shared/application/providers/hash-provider'
import { BcryptjsHashProvider } from '@/user/infra/providers/hash-provider/bcryptjs-hash.provider'
import { UserDataBuilder } from '@/user/domain/testing/helper/user-data-builder'
import { ConfictError } from '@/shared/domain/errors/conflict-error'
import { BadRequestError } from '@/shared/application/errors/bad-request.error'

describe('SignupUseCase unit tests', () => {
  let sut: UserSignupUseCase
  let repository: UserInMemoryRepository
  let hashProvider: HashProvider

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    hashProvider = new BcryptjsHashProvider()
    sut = new UserSignupUseCase(repository, hashProvider)
  })
  it('Should create a user', async () => {
    const spyInsert = jest.spyOn(repository, 'insert')
    const props = UserDataBuilder({})
    const result = await sut.execute(props)
    expect(result.id).toBeDefined()
    expect(result.createdAt).toBeInstanceOf(Date)
    expect(spyInsert).toHaveBeenCalledTimes(1)
  })

  it('Should not be able ro register with same email twice', async () => {
    const props = UserDataBuilder({ email: 'a@a.com' })
    await sut.execute(props)
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(ConfictError)
  })

  it('Should throws error when firstName not prividerd', async () => {
    const props = Object.assign(UserDataBuilder({}), { firstName: null })
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })

  it('Should throws error when lastName not prividerd', async () => {
    const props = Object.assign(UserDataBuilder({}), { lastName: null })
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })

  it('Should throws error when email not prividerd', async () => {
    const props = Object.assign(UserDataBuilder({}), { email: null })
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })

  it('Should throws error when password not prividerd', async () => {
    const props = Object.assign(UserDataBuilder({}), { password: null })
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })
})
