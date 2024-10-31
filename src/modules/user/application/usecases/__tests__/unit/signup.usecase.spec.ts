import { UserInMemoryRepository } from '@/modules/user/infra/database/in-memory/repositories/user-in-memory.repository'
import { SignupUseCase } from '../../signup.usecase'
import { HashProvider } from './../../../../../../shared/application/providers/hash-provider'
import { BcryptjsHashProvider } from '@/modules/user/infra/providers/hash-provider/bcryptjs-hash.provider'
import { UserDataBuilder } from '@/modules/user/domain/testing/helper/user-data-builder'
import { ConfictError } from '@/shared/domain/errors/conflict-error'
import { BadRequestError } from '../../../errors/bad-request.error'

describe('UserInMemoryRepository unit tests', () => {
  let sut: SignupUseCase.UseCase
  let repository: UserInMemoryRepository
  let hashProvider: HashProvider

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    hashProvider = new BcryptjsHashProvider()
    sut = new SignupUseCase.UseCase(repository, hashProvider)
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
