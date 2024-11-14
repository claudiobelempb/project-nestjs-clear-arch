import { UserResponse } from '@/user/application/response/user-response'
import { UserRequest } from '../../../request/user.request'
import { UserSingnupController } from '../../user-signup.controller'

describe('UserSingnupController unit tests', () => {
  let sut: UserSingnupController
  let id: string
  let props: UserRequest.UserSignup

  beforeEach(async () => {
    sut = new UserSingnupController()
    id = '7336216e-30a8-4887-861f-55b2797f60ff'
    props = {
      firstName: 'a',
      lastName: 'a',
      email: 'a@a.com',
      password: 'a',
    }
  })
  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should create a user', async () => {
    let request = props
    const mockUserSignupUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(request)),
    }
    //@ts-expect-error
    sut['userSingupUseCase'] = mockUserSignupUseCase as any
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
    expect(mockUserSignupUseCase.execute).toHaveBeenCalledWith(request)
  })
})
