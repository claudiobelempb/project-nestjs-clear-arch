import { UserEntiry } from '@/modules/user/domain/entities/user.entity'
import { UserDataBuilder } from '@/modules/user/domain/testing/helper/user-data-builder'
import { UserMapper } from '../../user-response.mapper'

describe('UserResponseMapper unit tests', () => {
  it('should convert a user in response', () => {
    const entity = new UserEntiry(UserDataBuilder({}))
    const spyToJson = jest.spyOn(entity, 'toJSON')
    const sut = UserMapper.Response.toResponse(entity)

    expect(spyToJson).toHaveBeenCalled()
    expect(sut).toStrictEqual(entity.toJSON())
  })
})
