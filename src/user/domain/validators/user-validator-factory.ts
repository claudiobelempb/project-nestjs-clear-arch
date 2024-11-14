import { UserValidator } from './user-validator'

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator()
  }
}

//Model to use => useUserValidatorFactory.create()
