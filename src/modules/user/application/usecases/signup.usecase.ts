export namespace SignupUseCase {
  export type Input = {
    firstName: string
    lastName: string
    email: string
    password: string
  }

  export type Output = {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    active: boolean
    createdAt: Date
    updatedAt: Date
  }
  export class UseCase {
    constructor() {}
    async execute(input: Input): Promise<Output> {}
  }
}
