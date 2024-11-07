import { UserUpdateActiveController } from '../../user-update-active.controller'

describe('UserUpdateActiveController unit tests', () => {
  let sut: UserUpdateActiveController
  let id: string
  let props: boolean

  beforeEach(async () => {
    sut = new UserUpdateActiveController()
    ;(id = '7336216e-30a8-4887-861f-55b2797f60ff'), (props = true)
  })
  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should active a user', async () => {
    let request = props
    const mockUserUpdateActionUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(request)),
    }
    //@ts-expect-error
    sut['userUpdateActiveUseCase'] = mockUserUpdateActionUseCase as any

    const result = await sut.handle(id, props)
    expect(props).toStrictEqual(result)
    expect(mockUserUpdateActionUseCase.execute).toHaveBeenCalledWith(id, props)
  })
})
