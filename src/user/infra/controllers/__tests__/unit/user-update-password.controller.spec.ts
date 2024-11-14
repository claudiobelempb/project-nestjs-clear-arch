import { UserRequest } from '../../../request/user.request'
import { UserUpdatePasswordController } from '../../user-update-password.controller'

describe('UserUpdatePasswordController unit tests', () => {
  let sut: UserUpdatePasswordController
  let id: string
  let props: UserRequest.UpdatePassword

  beforeEach(async () => {
    sut = new UserUpdatePasswordController()
    id = '7336216e-30a8-4887-861f-55b2797f60ff'
    props = {
      password: 'b',
      oldPassword: 'a',
    }
  })
  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should update a users password', async () => {
    let request = props
    const mockUserUpdatePasswordUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(request)),
    }
    //@ts-expect-error
    sut['userUpadatePasswordUseCase'] = mockUserUpdatePasswordUseCase as any

    await sut.handle(id, request)

    expect(mockUserUpdatePasswordUseCase.execute).toHaveBeenCalledWith(
      id,
      request,
    )
  })
})
