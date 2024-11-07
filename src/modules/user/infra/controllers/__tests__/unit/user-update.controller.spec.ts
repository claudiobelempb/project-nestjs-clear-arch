import { UserResponse } from '@/modules/user/application/response/user-response'
import { UserRequest } from '../../../request/user.request'
import { UserUpdateController } from '../../user-update.constroller'

describe('UserUpdateController unit tests', () => {
  let sut: UserUpdateController
  let id: string
  let props: UserRequest.UserUpdate

  beforeEach(async () => {
    sut = new UserUpdateController()
    id = '7336216e-30a8-4887-861f-55b2797f60ff'
    props = {
      firstName: 'a',
      lastName: 'b',
    }
  })
  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should update a user', async () => {
    let request = props
    const mockUserUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(request)),
    }
    //@ts-expect-error
    sut['userUpdateUseCase'] = mockUserUpdateUseCase as any
    let response: UserResponse.User = {
      id,
      firstName: 'a',
      lastName: 'b',
      email: 'a@a.com',
      password: 'a',
      active: true,
      createdAt: new Date(),
    }
    const result = await sut.handle(id, request)

    expect(response).toMatchObject(result)
    expect(mockUserUpdateUseCase.execute).toHaveBeenCalledWith(id, request)
  })
})
