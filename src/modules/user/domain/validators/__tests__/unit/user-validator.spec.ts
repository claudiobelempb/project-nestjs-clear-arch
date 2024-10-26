import { UserDataBuilder } from '../../../testing/helper/user-data-builder'
import { UserRoles } from '../../user-roles'
import { UserValidator } from '../../user-validator'
import { UserValidatorFactory } from '../../user-validator-factory'

let sut: UserValidator
describe('UserValidator unit tests', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create()
  })

  it('Valid case for user validator class', () => {
    const props = UserDataBuilder({})
    const isValid = sut.validate(props)
    expect(isValid).toBeTruthy()
    expect(sut.validatedData).toStrictEqual(new UserRoles(props))
  })
  describe('fistName field', () => {
    it('Invalidation cases for firstName field', () => {
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
  })

  describe('LastName field', () => {
    it('Invalidation cases for lastName field', () => {
      let isValid = sut.validate(null)
      expect(isValid).toBeFalsy()
      expect(sut.errors['lastName']).toStrictEqual([
        'lastName should not be empty',
        'lastName must be a string',
        'lastName must be shorter than or equal to 32 characters',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        lastName: '',
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['lastName']).toStrictEqual([
        'lastName should not be empty',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        lastName: 2 as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['lastName']).toStrictEqual([
        'lastName must be a string',
        'lastName must be shorter than or equal to 32 characters',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        lastName: 'a'.repeat(33),
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['lastName']).toStrictEqual([
        'lastName must be shorter than or equal to 32 characters',
      ])
    })
  })

  describe('Email field', () => {
    it('Invalidation cases for email field', () => {
      let isValid = sut.validate(null)
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email should not be empty',
        'email must be a string',
        'email must be shorter than or equal to 100 characters',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        email: '',
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email should not be empty',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        email: 2 as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email must be a string',
        'email must be shorter than or equal to 100 characters',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        email: 'a'.repeat(101),
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email must be shorter than or equal to 100 characters',
      ])
    })
  })

  describe('Password field', () => {
    it('Invalidation cases for password field', () => {
      let isValid = sut.validate(null)
      expect(isValid).toBeFalsy()
      expect(sut.errors['password']).toStrictEqual([
        'password should not be empty',
        'password must be a string',
        'password must be shorter than or equal to 100 characters',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        password: '',
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['password']).toStrictEqual([
        'password should not be empty',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        password: 2 as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['password']).toStrictEqual([
        'password must be a string',
        'password must be shorter than or equal to 100 characters',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        password: 'a'.repeat(101),
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['password']).toStrictEqual([
        'password must be shorter than or equal to 100 characters',
      ])
    })
  })
})
