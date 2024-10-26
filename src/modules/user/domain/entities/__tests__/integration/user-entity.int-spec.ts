import { EntityValidationError } from '@/shared/domain/errors/validation-error'
import { UserDataBuilder } from '../../../testing/helper/user-data-builder'
import { UserEntiry, UserProps } from '../../user.entity'

describe('UserEntiry integration tests', () => {
  describe('Contructor method', () => {
    it('Should throw an error when creating a user with invalid firstName', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        firstName: null,
      }

      expect(() => new UserEntiry(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        firstName: '',
      }
      expect(() => new UserEntiry(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        firstName: 45 as any,
      }
      expect(() => new UserEntiry(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        firstName: 'a'.repeat(33),
      }
      expect(() => new UserEntiry(props)).toThrow(EntityValidationError)
    })
  })
})
