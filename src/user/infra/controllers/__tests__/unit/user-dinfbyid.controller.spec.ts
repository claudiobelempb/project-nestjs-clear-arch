import { UserResponse } from '@/user/application/response/user-response'
import { UserFindByIdController } from '../../user-findbyid.controller'

describe('UserFindByIdController unit tests', () => {
  let sut: UserFindByIdController
  let id: string
  let props: UserResponse.User

  beforeEach(async () => {
    sut = new UserFindByIdController()
    id = '7336216e-30a8-4887-861f-55b2797f60ff'
    props = {
      id,
      firstName: 'a',
      lastName: 'a',
      email: 'a@a.com',
      password: 'a',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })
  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should find by id a user', async () => {
    let request = props
    const mockUserFindByIdUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(request)),
    }
    //@ts-expect-error
    sut['userFindByIdUseCase'] = mockUserFindByIdUseCase as any

    const result = await sut.handle(id)
    expect(props).toStrictEqual(result)
    expect(mockUserFindByIdUseCase.execute).toHaveBeenCalledWith(id)
  })
})
