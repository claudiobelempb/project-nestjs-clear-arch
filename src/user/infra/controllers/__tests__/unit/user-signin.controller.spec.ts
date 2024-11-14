import { UserResponse } from '@/user/application/response/user-response'
import { UserRequest } from '../../../request/user.request'
import { UserSigninController } from '../../user-signin.controller'

describe('UserSigninController unit tests', () => {
  let sut: UserSigninController
  let id: string
  let props: UserRequest.UserSignin

  beforeEach(async () => {
    sut = new UserSigninController()
    id = '7336216e-30a8-4887-861f-55b2797f60ff'
    props = {
      email: 'a@a.com',
      password: 'a',
    }
  })
  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should authenticate a user', async () => {
    let request = props
    const mockUserSigninUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(request)),
    }
    //@ts-expect-error
    sut['userSigninUseCase'] = mockUserSigninUseCase as any
    let response: UserResponse.User = {
      id,
      firstName: 'a',
      lastName: 'a',
      email: 'a@a.com',
      password: 'a',
      active: true,
      createdAt: new Date(),
    }
    const result = await sut.handle(request)

    expect(response).toMatchObject(result)
    expect(mockUserSigninUseCase.execute).toHaveBeenCalledWith(request)
  })
})
