import { UserResponse } from '@/user/application/response/user-response'
import { UserFindAllController } from '../../user-findall.controller'

describe('UserFindAllController unit tests', () => {
  let sut: UserFindAllController
  let id: string
  let props: UserResponse.User

  beforeEach(async () => {
    sut = new UserFindAllController()
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

  it('should find all a user', async () => {
    const response: UserResponse.Pagination = {
      items: [props],
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
      total: 1,
    }
    const mockUserFindAlldUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(response)),
    }

    //@ts-expect-error
    sut['userFindAllUseCase'] = mockUserFindAlldUseCase as any
    const request = {
      page: 1,
      perPage: 1,
    }

    const result = await sut.handle(request)
    expect(response).toStrictEqual(result)
    expect(mockUserFindAlldUseCase.execute).toHaveBeenCalledWith(request)
  })
})
