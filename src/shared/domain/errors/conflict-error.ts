export class ConfictError extends Error {
  constructor(public message: string) {
    super(message)
    this.name = 'ConflictException'
  }
}
