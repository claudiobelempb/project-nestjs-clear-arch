import { FieldErrors } from '../../domain/validators/validator-fields.interface'

export class ValidationError extends Error {}

export class InvalidCredentialsError extends Error {
  constructor(public error: string) {
    super()
    this.name = 'InvalidCredentialsError'
  }
}
