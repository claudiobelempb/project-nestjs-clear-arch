import { UserDataBuilder } from '../../../testing/helper/user-data-builder'
import { UserRoles } from '../../user-roles'
import { UserValidator } from '../../user-validator'
import { UserValidatorFactory } from '../../user-validator-factory'

let sut: UserValidator
describe('UserValidator unit tests', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create()
  })
  describe('fistName field', () => {
    it('Invalidation cases for name field', () => {
      let isValid = sut.validate(null)
      expect(isValid).toBeFalsy()
      expect(sut.errors['firstName']).toStrictEqual([
        'firstName should not be empty',
        'firstName must be a string',
        'firstName must be shorter than or equal to 32 characters',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        firstName: '',
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['firstName']).toStrictEqual([
        'firstName should not be empty',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        firstName: 2 as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['firstName']).toStrictEqual([
        'firstName must be a string',
        'firstName must be shorter than or equal to 32 characters',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        firstName: 'a'.repeat(33),
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['firstName']).toStrictEqual([
        'firstName must be shorter than or equal to 32 characters',
      ])
    })

    it('Valid case for firstNmae field', () => {
      const props = UserDataBuilder({})
      const isValid = sut.validate(props)
      expect(isValid).toBeTruthy()
      expect(sut.validatedData).toStrictEqual(new UserRoles(props))
    })
  })
})
