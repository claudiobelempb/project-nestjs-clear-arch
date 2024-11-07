import { UserRequest } from '../../../request/user.request'
import { UserDeleteController } from '../../user-delete.controller'

describe('UserDeleteController unit tests', () => {
  let sut: UserDeleteController
  let id: string
  let props: UserRequest.User

  beforeEach(async () => {
    sut = new UserDeleteController()
    id = '7336216e-30a8-4887-861f-55b2797f60ff'
  })
  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should delete a user', async () => {
    let request = props
    const mockUserDeleteUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(request)),
    }
    //@ts-expect-error
    sut['userDeleteUseCase'] = mockUserDeleteUseCase as any

    await sut.handle(id)

    expect(mockUserDeleteUseCase.execute).toHaveBeenCalledWith(id)
  })
})
