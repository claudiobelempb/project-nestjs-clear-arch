export type FieldErrors = {
  [field: string]: string[]
}

export interface ValidatorFieldsInterface<T> {
  errors: FieldErrors
  validatedData: T
  validate(data: unknown): boolean
}
